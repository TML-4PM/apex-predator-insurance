
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { ChatConversation, ChatMessage } from '@/types/chat';
import { useToast } from '@/hooks/use-toast';

export const useRealTimeChat = (conversationId?: string) => {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Fetch conversations
  const fetchConversations = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('chat_conversations')
        .select(`
          *,
          chat_participants!inner(
            user_id,
            profiles!user_id(username, avatar_url, full_name)
          )
        `)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setConversations(data || []);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      toast({
        title: "Error",
        description: "Failed to load conversations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch messages for a conversation
  const fetchMessages = async (convId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select(`
          *,
          profiles!sender_id(username, avatar_url, full_name),
          reply_to:chat_messages!reply_to_id(
            id,
            content,
            profiles!sender_id(username)
          )
        `)
        .eq('conversation_id', convId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
    }
  };

  // Send a message
  const sendMessage = async (content: string, replyToId?: string) => {
    if (!conversationId) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: conversationId,
          sender_id: user.id,
          content,
          reply_to_id: replyToId,
        });

      if (error) throw error;

      // Update conversation's updated_at
      await supabase
        .from('chat_conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', conversationId);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  };

  // Create a new conversation
  const createConversation = async (participantIds: string[], name?: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: conversation, error: convError } = await supabase
        .from('chat_conversations')
        .insert({
          name,
          is_group: participantIds.length > 1,
          created_by: user.id,
        })
        .select()
        .single();

      if (convError) throw convError;

      // Add participants
      const participants = [user.id, ...participantIds].map(userId => ({
        conversation_id: conversation.id,
        user_id: userId,
      }));

      const { error: participantsError } = await supabase
        .from('chat_participants')
        .insert(participants);

      if (participantsError) throw participantsError;

      await fetchConversations();
      return conversation.id;
    } catch (error) {
      console.error('Error creating conversation:', error);
      toast({
        title: "Error",
        description: "Failed to create conversation",
        variant: "destructive",
      });
    }
  };

  // Set up real-time subscriptions
  useEffect(() => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Subscribe to new messages
    const messagesChannel = supabase
      .channel('chat-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: conversationId ? `conversation_id=eq.${conversationId}` : undefined,
        },
        async (payload) => {
          const newMessage = payload.new as ChatMessage;
          
          // Fetch the complete message with profile data
          const { data } = await supabase
            .from('chat_messages')
            .select(`
              *,
              profiles!sender_id(username, avatar_url, full_name)
            `)
            .eq('id', newMessage.id)
            .single();

          if (data) {
            setMessages(prev => [...prev, data]);
          }
        }
      )
      .subscribe();

    // Subscribe to conversation updates
    const conversationsChannel = supabase
      .channel('chat-conversations')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_conversations',
        },
        () => {
          fetchConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messagesChannel);
      supabase.removeChannel(conversationsChannel);
    };
  }, [conversationId]);

  // Initial load
  useEffect(() => {
    fetchConversations();
    if (conversationId) {
      fetchMessages(conversationId);
    }
  }, [conversationId]);

  return {
    conversations,
    messages,
    loading,
    sendMessage,
    createConversation,
    fetchMessages,
    refetch: fetchConversations,
  };
};
