
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Reply, MoreVertical } from 'lucide-react';
import { useRealTimeChat } from '@/hooks/useRealTimeChat';
import { formatDistanceToNow } from 'date-fns';
import type { ChatMessage } from '@/types/chat';

interface ChatInterfaceProps {
  conversationId: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ conversationId }) => {
  const [newMessage, setNewMessage] = useState('');
  const [replyTo, setReplyTo] = useState<ChatMessage | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage } = useRealTimeChat(conversationId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    await sendMessage(newMessage, replyTo?.id);
    setNewMessage('');
    setReplyTo(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-[600px]">
      <CardHeader className="pb-3">
        <h3 className="font-semibold">Chat</h3>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex gap-3 group">
              <Avatar className="w-8 h-8">
                <AvatarImage src={message.sender_profile?.avatar_url} />
                <AvatarFallback>
                  {message.sender_profile?.username?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">
                    {message.sender_profile?.username || 'Unknown'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                  </span>
                  {message.is_edited && (
                    <span className="text-xs text-muted-foreground">(edited)</span>
                  )}
                </div>

                {/* Reply indicator */}
                {message.reply_to && (
                  <div className="bg-muted p-2 rounded mb-2 text-sm border-l-2 border-primary">
                    <div className="text-xs text-muted-foreground mb-1">
                      Replying to {message.reply_to.sender_profile?.username}
                    </div>
                    <div className="truncate">{message.reply_to.content}</div>
                  </div>
                )}

                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>

                {/* Message actions */}
                <div className="flex gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setReplyTo(message)}
                    className="h-6 px-2"
                  >
                    <Reply className="w-3 h-3 mr-1" />
                    Reply
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 px-2">
                    <MoreVertical className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Reply indicator */}
        {replyTo && (
          <div className="px-4 py-2 bg-muted border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-muted-foreground">Replying to </span>
                <span className="font-medium">{replyTo.sender_profile?.username}</span>
                <div className="truncate text-muted-foreground mt-1">
                  {replyTo.content}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyTo(null)}
              >
                ×
              </Button>
            </div>
          </div>
        )}

        {/* Message input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
