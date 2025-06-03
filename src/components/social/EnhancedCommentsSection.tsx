
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MessageCircle, Reply } from 'lucide-react';
import { useEnhancedComments } from '@/hooks/useEnhancedComments';
import { formatDistanceToNow } from 'date-fns';
import type { PostComment } from '@/types/chat';

interface EnhancedCommentsSectionProps {
  postId: string;
}

const CommentItem: React.FC<{
  comment: PostComment;
  onReply: (commentId: string) => void;
  onToggleLike: (commentId: string, isLiked: boolean) => void;
  isReply?: boolean;
}> = ({ comment, onReply, onToggleLike, isReply = false }) => {
  return (
    <div className={`flex gap-3 ${isReply ? 'ml-8 mt-3' : ''}`}>
      <Avatar className="w-8 h-8">
        <AvatarImage src={comment.user_profile?.avatar_url} />
        <AvatarFallback>
          {comment.user_profile?.username?.charAt(0) || 'U'}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="bg-muted p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">
              {comment.user_profile?.username || 'Unknown User'}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
            </span>
          </div>
          <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
        </div>
        
        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={() => onToggleLike(comment.id, comment.is_liked || false)}
            className={`flex items-center gap-1 text-sm hover:text-red-500 transition-colors ${
              comment.is_liked ? 'text-red-500' : 'text-muted-foreground'
            }`}
          >
            <Heart className={`w-4 h-4 ${comment.is_liked ? 'fill-current' : ''}`} />
            {comment.likes_count > 0 && <span>{comment.likes_count}</span>}
          </button>
          
          {!isReply && (
            <button
              onClick={() => onReply(comment.id)}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Reply className="w-4 h-4" />
              Reply
            </button>
          )}
        </div>
        
        {/* Render replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 space-y-3">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                onReply={onReply}
                onToggleLike={onToggleLike}
                isReply={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const EnhancedCommentsSection: React.FC<EnhancedCommentsSectionProps> = ({ postId }) => {
  const [newComment, setNewComment] = useState('');
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [showCommentForm, setShowCommentForm] = useState(false);
  
  const {
    comments,
    loading,
    createComment,
    toggleCommentLike,
    isCreatingComment,
  } = useEnhancedComments(postId);

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    createComment(newComment, replyToId || undefined);
    setNewComment('');
    setReplyToId(null);
    setShowCommentForm(false);
  };

  const handleReply = (commentId: string) => {
    setReplyToId(commentId);
    setShowCommentForm(true);
  };

  const replyToComment = comments.find(c => c.id === replyToId);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="text-center text-muted-foreground">Loading comments...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Comments ({comments.length})
          </h3>
          <Button
            onClick={() => setShowCommentForm(!showCommentForm)}
            variant="outline"
            size="sm"
          >
            {showCommentForm ? 'Cancel' : 'Add Comment'}
          </Button>
        </div>

        {/* Comment form */}
        {showCommentForm && (
          <div className="mb-6">
            {replyToId && replyToComment && (
              <div className="mb-3 p-3 bg-muted rounded-lg border-l-4 border-primary">
                <div className="text-sm text-muted-foreground mb-1">
                  Replying to {replyToComment.user_profile?.username}
                </div>
                <div className="text-sm truncate">{replyToComment.content}</div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplyToId(null)}
                  className="mt-2 h-6 px-2"
                >
                  Cancel Reply
                </Button>
              </div>
            )}
            
            <div className="space-y-3">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={replyToId ? "Write a reply..." : "Write a comment..."}
                className="min-h-[80px]"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim() || isCreatingComment}
                  size="sm"
                >
                  {isCreatingComment ? 'Posting...' : replyToId ? 'Reply' : 'Comment'}
                </Button>
                <Button
                  onClick={() => {
                    setShowCommentForm(false);
                    setNewComment('');
                    setReplyToId(null);
                  }}
                  variant="outline"
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Comments list */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onReply={handleReply}
                onToggleLike={toggleCommentLike}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedCommentsSection;
