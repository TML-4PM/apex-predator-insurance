
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { PostComment } from '@/types/chat';
import { useToast } from '@/hooks/use-toast';

export const useEnhancedComments = (postId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: comments = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['post-comments', postId],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('post_comments')
        .select(`
          *,
          user_profile:profiles!user_id(username, avatar_url, full_name),
          comment_likes(user_id)
        `)
        .eq('post_id', postId)
        .is('parent_comment_id', null)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Fetch replies for each comment
      const commentsWithReplies = await Promise.all(
        (data || []).map(async (comment) => {
          const { data: replies, error: repliesError } = await supabase
            .from('post_comments')
            .select(`
              *,
              user_profile:profiles!user_id(username, avatar_url, full_name),
              comment_likes(user_id)
            `)
            .eq('parent_comment_id', comment.id)
            .order('created_at', { ascending: true });

          if (repliesError) throw repliesError;

          return {
            ...comment,
            user_profile: comment.user_profile || { username: 'Unknown User', avatar_url: null, full_name: null },
            is_liked: user ? comment.comment_likes.some((like: any) => like.user_id === user.id) : false,
            replies: (replies || []).map((reply: any) => ({
              ...reply,
              user_profile: reply.user_profile || { username: 'Unknown User', avatar_url: null, full_name: null },
              is_liked: user ? reply.comment_likes.some((like: any) => like.user_id === user.id) : false,
            })),
          };
        })
      );

      return commentsWithReplies;
    },
  });

  const createCommentMutation = useMutation({
    mutationFn: async ({ content, parentCommentId }: { content: string; parentCommentId?: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('post_comments')
        .insert({
          post_id: postId,
          user_id: user.id,
          content,
          parent_comment_id: parentCommentId,
        });

      if (error) throw error;

      // Update post comments count
      if (!parentCommentId) {
        await supabase
          .from('community_posts')
          .update({ comments_count: comments.length + 1 })
          .eq('id', postId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post-comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
      toast({
        title: "Success!",
        description: "Your comment has been posted.",
      });
    },
    onError: (error) => {
      console.error('Error creating comment:', error);
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const toggleCommentLikeMutation = useMutation({
    mutationFn: async ({ commentId, isLiked }: { commentId: string; isLiked: boolean }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      if (isLiked) {
        await supabase
          .from('comment_likes')
          .delete()
          .eq('comment_id', commentId)
          .eq('user_id', user.id);

        await supabase
          .from('post_comments')
          .update({ likes_count: Math.max(0, comments.find(c => c.id === commentId)?.likes_count || 0 - 1) })
          .eq('id', commentId);
      } else {
        await supabase
          .from('comment_likes')
          .insert({ comment_id: commentId, user_id: user.id });

        await supabase
          .from('post_comments')
          .update({ likes_count: (comments.find(c => c.id === commentId)?.likes_count || 0) + 1 })
          .eq('id', commentId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post-comments', postId] });
    },
    onError: (error) => {
      console.error('Error toggling comment like:', error);
      toast({
        title: "Error",
        description: "Failed to update like. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Set up real-time subscription for comments
  useEffect(() => {
    const channel = supabase
      .channel('post-comments-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'post_comments',
          filter: `post_id=eq.${postId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['post-comments', postId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId, queryClient]);

  const createComment = (content: string, parentCommentId?: string) => {
    createCommentMutation.mutate({ content, parentCommentId });
  };

  const toggleCommentLike = (commentId: string, isLiked: boolean) => {
    toggleCommentLikeMutation.mutate({ commentId, isLiked });
  };

  return {
    comments,
    loading,
    error,
    createComment,
    toggleCommentLike,
    isCreatingComment: createCommentMutation.isPending,
    isTogglingLike: toggleCommentLikeMutation.isPending,
  };
};
