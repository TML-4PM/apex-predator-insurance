
import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface UserMentionsProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const UserMentions: React.FC<UserMentionsProps> = ({
  value,
  onChange,
  placeholder,
  className,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);

  // Fetch users for mentions
  const { data: users = [] } = useQuery({
    queryKey: ['users-for-mentions', mentionQuery],
    queryFn: async () => {
      if (!mentionQuery || mentionQuery.length < 2) return [];
      
      const { data, error } = await supabase
        .from('profiles')
        .select('user_id, username, avatar_url, full_name')
        .ilike('username', `%${mentionQuery}%`)
        .limit(5);
      
      if (error) throw error;
      return data || [];
    },
    enabled: mentionQuery.length >= 2,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const cursorPos = e.target.selectionStart || 0;
    
    onChange(newValue);
    setCursorPosition(cursorPos);
    
    // Check if user is typing a mention
    const beforeCursor = newValue.slice(0, cursorPos);
    const mentionMatch = beforeCursor.match(/@(\w*)$/);
    
    if (mentionMatch) {
      setMentionQuery(mentionMatch[1]);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setMentionQuery('');
    }
  };

  const handleMentionSelect = (user: any) => {
    const beforeCursor = value.slice(0, cursorPosition);
    const afterCursor = value.slice(cursorPosition);
    const mentionMatch = beforeCursor.match(/@(\w*)$/);
    
    if (mentionMatch) {
      const beforeMention = beforeCursor.slice(0, mentionMatch.index);
      const newValue = `${beforeMention}@${user.username} ${afterCursor}`;
      onChange(newValue);
    }
    
    setShowSuggestions(false);
    setMentionQuery('');
  };

  const processedValue = useMemo(() => {
    // Highlight mentions in the text
    return value.replace(/@(\w+)/g, '<span class="text-blue-500 font-medium">@$1</span>');
  }, [value]);

  return (
    <div className="relative">
      <Input
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={className}
        onBlur={() => {
          // Delay hiding suggestions to allow click
          setTimeout(() => setShowSuggestions(false), 200);
        }}
      />
      
      {showSuggestions && users.length > 0 && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-1">
          <CardContent className="p-2">
            <div className="space-y-1">
              {users.map((user) => (
                <button
                  key={user.user_id}
                  onClick={() => handleMentionSelect(user)}
                  className="w-full flex items-center gap-2 p-2 hover:bg-muted rounded-md transition-colors"
                >
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={user.avatar_url} />
                    <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <div className="font-medium">@{user.username}</div>
                    {user.full_name && (
                      <div className="text-sm text-muted-foreground">{user.full_name}</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserMentions;
