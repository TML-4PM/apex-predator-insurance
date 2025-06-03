
import React from 'react';
import { Users, Circle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useUserPresence } from '@/hooks/useUserPresence';

const OnlineUsersIndicator = () => {
  const { onlineUsers, onlineCount } = useUserPresence();

  if (onlineCount === 0) return null;

  return (
    <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Circle className="h-3 w-3 fill-green-500 text-green-500 animate-pulse" />
            <Users className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              {onlineCount} online
            </span>
          </div>
          
          <div className="flex -space-x-2">
            {onlineUsers.slice(0, 5).map((user) => (
              <div key={user.user_id} className="relative">
                <Avatar className="h-8 w-8 border-2 border-white">
                  <AvatarImage src={user.avatar_url} alt={user.username} />
                  <AvatarFallback className="text-xs">
                    {user.username[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Badge 
                  variant={user.status === 'online' ? 'default' : 'secondary'}
                  className={`absolute -bottom-1 -right-1 h-3 w-3 p-0 rounded-full border-2 border-white ${
                    user.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                />
              </div>
            ))}
            {onlineCount > 5 && (
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 border-2 border-white text-xs font-medium text-gray-600">
                +{onlineCount - 5}
              </div>
            )}
          </div>
        </div>
        
        {onlineUsers.length > 0 && (
          <div className="mt-2 text-xs text-green-600">
            Recent: {onlineUsers.slice(0, 3).map(u => u.username).join(', ')}
            {onlineUsers.length > 3 && '...'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OnlineUsersIndicator;
