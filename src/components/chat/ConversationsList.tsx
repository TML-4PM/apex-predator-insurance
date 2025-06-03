
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Plus, MessageCircle } from 'lucide-react';
import { useRealTimeChat } from '@/hooks/useRealTimeChat';
import { formatDistanceToNow } from 'date-fns';
import type { ChatConversation } from '@/types/chat';

interface ConversationsListProps {
  onSelectConversation: (conversationId: string) => void;
  selectedConversationId?: string;
  onCreateNew: () => void;
}

const ConversationsList: React.FC<ConversationsListProps> = ({
  onSelectConversation,
  selectedConversationId,
  onCreateNew,
}) => {
  const { conversations, loading } = useRealTimeChat();

  const getConversationName = (conversation: ChatConversation) => {
    if (conversation.name) return conversation.name;
    if (conversation.is_group) return 'Group Chat';
    
    // For direct messages, show the other participant's name
    const otherParticipant = conversation.participants?.find(
      p => p.user_id !== conversation.created_by
    );
    return otherParticipant?.profile?.username || 'Direct Message';
  };

  const getConversationAvatar = (conversation: ChatConversation) => {
    if (conversation.is_group) return null;
    
    const otherParticipant = conversation.participants?.find(
      p => p.user_id !== conversation.created_by
    );
    return otherParticipant?.profile?.avatar_url;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="text-center text-muted-foreground">Loading conversations...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Messages
          </h3>
          <Button onClick={onCreateNew} size="sm" variant="outline">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No conversations yet</p>
            <Button onClick={onCreateNew} size="sm" className="mt-2">
              Start a conversation
            </Button>
          </div>
        ) : (
          <div className="space-y-1">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
                className={`w-full p-3 text-left hover:bg-muted transition-colors ${
                  selectedConversationId === conversation.id ? 'bg-muted' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={getConversationAvatar(conversation) || undefined} />
                    <AvatarFallback>
                      {conversation.is_group ? 'G' : getConversationName(conversation).charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium truncate">
                        {getConversationName(conversation)}
                      </h4>
                      {conversation.is_group && (
                        <Badge variant="secondary" className="text-xs">
                          {conversation.participants?.length || 0}
                        </Badge>
                      )}
                    </div>
                    
                    {conversation.last_message && (
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.last_message.content}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(conversation.updated_at), { addSuffix: true })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConversationsList;
