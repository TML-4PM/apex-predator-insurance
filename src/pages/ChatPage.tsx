
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Users } from 'lucide-react';
import ConversationsList from '@/components/chat/ConversationsList';
import ChatInterface from '@/components/chat/ChatInterface';
import { useRealTimeChat } from '@/hooks/useRealTimeChat';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ChatPage = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<string>();
  const [showNewChatDialog, setShowNewChatDialog] = useState(false);
  const [newChatName, setNewChatName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const { createConversation } = useRealTimeChat();

  // Fetch available users
  const { data: users = [] } = useQuery({
    queryKey: ['users-for-chat'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('user_id, username, avatar_url, full_name')
        .limit(20);
      
      if (error) throw error;
      return data || [];
    },
  });

  const handleCreateConversation = async () => {
    if (selectedUsers.length === 0) return;
    
    const conversationId = await createConversation(
      selectedUsers,
      selectedUsers.length > 1 ? newChatName || undefined : undefined
    );
    
    if (conversationId) {
      setSelectedConversationId(conversationId);
      setShowNewChatDialog(false);
      setNewChatName('');
      setSelectedUsers([]);
    }
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Messages</h1>
        <p className="text-muted-foreground">
          Connect with fellow adventurers and share your experiences in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <div className="lg:col-span-1">
          <ConversationsList
            onSelectConversation={setSelectedConversationId}
            selectedConversationId={selectedConversationId}
            onCreateNew={() => setShowNewChatDialog(true)}
          />
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-2">
          {selectedConversationId ? (
            <ChatInterface conversationId={selectedConversationId} />
          ) : (
            <Card className="h-[600px] flex items-center justify-center">
              <CardContent className="text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No conversation selected</h3>
                <p className="text-muted-foreground mb-4">
                  Select a conversation from the list or start a new one to begin chatting.
                </p>
                <Button onClick={() => setShowNewChatDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Start New Chat
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* New Chat Dialog */}
      <Dialog open={showNewChatDialog} onOpenChange={setShowNewChatDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start New Conversation</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="chat-name">Conversation Name (optional)</Label>
              <Input
                id="chat-name"
                value={newChatName}
                onChange={(e) => setNewChatName(e.target.value)}
                placeholder="Enter conversation name..."
              />
            </div>
            
            <div>
              <Label>Select Users</Label>
              <div className="max-h-60 overflow-y-auto space-y-2 mt-2">
                {users.map((user) => (
                  <div key={user.user_id} className="flex items-center space-x-2">
                    <Checkbox
                      id={user.user_id}
                      checked={selectedUsers.includes(user.user_id)}
                      onCheckedChange={() => toggleUserSelection(user.user_id)}
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={user.avatar_url} />
                        <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.username}</div>
                        {user.full_name && (
                          <div className="text-sm text-muted-foreground">{user.full_name}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={handleCreateConversation}
                disabled={selectedUsers.length === 0}
                className="flex-1"
              >
                Create Conversation
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowNewChatDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatPage;
