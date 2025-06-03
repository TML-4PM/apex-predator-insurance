
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Laugh, Frown, ThumbsUp, Star, Angry } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PostReactionsProps {
  reactions: Record<string, number>;
  userReaction?: string;
  onReact: (reaction: string) => void;
  className?: string;
}

const reactionConfig = {
  like: { icon: ThumbsUp, label: 'Like', color: 'text-blue-500' },
  love: { icon: Heart, label: 'Love', color: 'text-red-500' },
  wow: { icon: Star, label: 'Wow', color: 'text-yellow-500' },
  laugh: { icon: Laugh, label: 'Laugh', color: 'text-green-500' },
  sad: { icon: Frown, label: 'Sad', color: 'text-gray-500' },
  angry: { icon: Angry, label: 'Angry', color: 'text-orange-500' },
};

const PostReactions: React.FC<PostReactionsProps> = ({
  reactions,
  userReaction,
  onReact,
  className,
}) => {
  const totalReactions = Object.values(reactions).reduce((sum, count) => sum + count, 0);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Reaction buttons */}
      <div className="flex items-center gap-1">
        {Object.entries(reactionConfig).map(([type, config]) => {
          const Icon = config.icon;
          const count = reactions[type] || 0;
          const isActive = userReaction === type;
          
          return (
            <Button
              key={type}
              variant="ghost"
              size="sm"
              onClick={() => onReact(type)}
              className={cn(
                'h-8 px-2 hover:bg-muted/50 transition-colors',
                isActive && config.color,
                isActive && 'bg-muted'
              )}
              title={config.label}
            >
              <Icon className={cn('w-4 h-4', isActive && 'fill-current')} />
              {count > 0 && (
                <span className="ml-1 text-xs">{count}</span>
              )}
            </Button>
          );
        })}
      </div>

      {/* Total reactions count */}
      {totalReactions > 0 && (
        <div className="text-sm text-muted-foreground">
          {totalReactions} {totalReactions === 1 ? 'reaction' : 'reactions'}
        </div>
      )}
    </div>
  );
};

export default PostReactions;
