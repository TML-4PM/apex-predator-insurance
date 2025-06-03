
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCommunityPosts, createCommunityPost, togglePostLike, followUser } from '@/services/communityApi';
import type { CommunityPost } from '@/types/community';
import { useToast } from '@/hooks/use-toast';

export const useCommunity = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: posts = [],
    isLoading: loading,
    error,
    refetch
  } = useQuery({
    queryKey: ['community-posts'],
    queryFn: fetchCommunityPosts,
  });

  const createPostMutation = useMutation({
    mutationFn: (data: { content: string; imageUrl?: string; location?: string; certificateId?: string }) =>
      createCommunityPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
      toast({
        title: "Success!",
        description: "Your adventure story has been shared with the community.",
      });
    },
    onError: (error) => {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to share your story. Please try again.",
        variant: "destructive",
      });
    },
  });

  const toggleLikeMutation = useMutation({
    mutationFn: ({ postId, isLiked, likesCount }: { postId: string; isLiked: boolean; likesCount: number }) =>
      togglePostLike(postId, isLiked, likesCount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
    },
    onError: (error) => {
      console.error('Error toggling like:', error);
      toast({
        title: "Error",
        description: "Failed to update like. Please try again.",
        variant: "destructive",
      });
    },
  });

  const followUserMutation = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You are now following this adventurer.",
      });
    },
    onError: (error) => {
      console.error('Error following user:', error);
      toast({
        title: "Error",
        description: "Failed to follow user. Please try again.",
        variant: "destructive",
      });
    },
  });

  const createPost = async (content: string, imageUrl?: string, location?: string, certificateId?: string) => {
    createPostMutation.mutate({ content, imageUrl, location, certificateId });
  };

  const toggleLike = async (postId: string) => {
    const post = posts.find((p: CommunityPost) => p.id === postId);
    if (!post) return;

    toggleLikeMutation.mutate({
      postId,
      isLiked: post.is_liked || false,
      likesCount: post.likes_count
    });
  };

  return {
    posts,
    loading,
    error,
    createPost,
    toggleLike,
    followUser: followUserMutation.mutate,
    refetch,
    isCreatingPost: createPostMutation.isPending,
    isTogglingLike: toggleLikeMutation.isPending,
    isFollowingUser: followUserMutation.isPending,
  };
};
