
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Target, 
  Zap, 
  Crown, 
  Star,
  TrendingUp,
  Users,
  MapPin,
  Calendar,
  Gift
} from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  reward: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLeft: string;
  category: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: string;
  progress?: number;
  total?: number;
}

interface GamificationSystemProps {
  userLevel: number;
  xp: number;
  xpToNext: number;
  activeChallenges: Challenge[];
  achievements: Achievement[];
  leaderboardPosition: number;
  streak: number;
}

const GamificationSystem = ({
  userLevel,
  xp,
  xpToNext,
  activeChallenges,
  achievements,
  leaderboardPosition,
  streak
}: GamificationSystemProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 border-gray-300';
      case 'rare': return 'text-blue-600 border-blue-300';
      case 'epic': return 'text-purple-600 border-purple-300';
      case 'legendary': return 'text-yellow-600 border-yellow-300';
      default: return 'text-gray-600 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* User Progress Overview */}
      <Card className="border-none shadow-lg bg-gradient-to-r from-apex-red/10 to-orange-500/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-apex-red p-3 rounded-full">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-apex-black">Level {userLevel}</h2>
                <p className="text-apex-darkgray/70">Adventure Master</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-apex-red">{xp.toLocaleString()}</div>
              <div className="text-sm text-apex-darkgray/60">Total XP</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Level {userLevel + 1}</span>
              <span>{(xpToNext - (xpToNext - xp)).toLocaleString()} / {xpToNext.toLocaleString()} XP</span>
            </div>
            <Progress value={((xpToNext - (xpToNext - xp)) / xpToNext) * 100} className="h-3" />
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <TrendingUp className="h-6 w-6 text-green-500 mx-auto mb-1" />
              <div className="text-lg font-bold text-apex-black">#{leaderboardPosition}</div>
              <div className="text-xs text-apex-darkgray/60">Leaderboard</div>
            </div>
            <div className="text-center">
              <Target className="h-6 w-6 text-blue-500 mx-auto mb-1" />
              <div className="text-lg font-bold text-apex-black">{streak}</div>
              <div className="text-xs text-apex-darkgray/60">Day Streak</div>
            </div>
            <div className="text-center">
              <Trophy className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
              <div className="text-lg font-bold text-apex-black">{achievements.filter(a => a.unlockedAt).length}</div>
              <div className="text-xs text-apex-darkgray/60">Achievements</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Challenges */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Active Challenges
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeChallenges.map((challenge) => (
            <div key={challenge.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-apex-black">{challenge.title}</h4>
                    <div className={`w-2 h-2 rounded-full ${getDifficultyColor(challenge.difficulty)}`}></div>
                    <Badge variant="outline" className="text-xs">
                      {challenge.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-apex-darkgray/70 mb-2">{challenge.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{challenge.progress} / {challenge.total}</span>
                    </div>
                    <Progress value={(challenge.progress / challenge.total) * 100} className="h-2" />
                  </div>
                </div>
                
                <div className="text-right ml-4">
                  <div className="flex items-center gap-1 text-yellow-600 mb-1">
                    <Gift className="h-4 w-4" />
                    <span className="text-sm font-medium">{challenge.reward}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-apex-darkgray/60">
                    <Calendar className="h-3 w-3" />
                    <span>{challenge.timeLeft}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {activeChallenges.length === 0 && (
            <div className="text-center py-8">
              <Target className="h-12 w-12 text-apex-darkgray/40 mx-auto mb-4" />
              <h3 className="font-medium text-apex-black mb-2">No active challenges</h3>
              <p className="text-apex-darkgray/60 mb-4">
                Complete adventures and engage with the community to unlock new challenges!
              </p>
              <Button className="bg-apex-red hover:bg-apex-red/90">
                Explore Adventures
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Achievements Grid */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.unlockedAt
                    ? `${getRarityColor(achievement.rarity)} bg-gradient-to-br from-white to-gray-50`
                    : 'border-gray-200 bg-gray-50/50 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-apex-black">{achievement.name}</h4>
                    <p className="text-sm text-apex-darkgray/70 mb-2">{achievement.description}</p>
                    
                    {achievement.unlockedAt ? (
                      <Badge variant="outline" className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                        {achievement.rarity} • Unlocked
                      </Badge>
                    ) : achievement.progress !== undefined ? (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-apex-darkgray/60">
                          <span>Progress</span>
                          <span>{achievement.progress} / {achievement.total}</span>
                        </div>
                        <Progress 
                          value={((achievement.progress || 0) / (achievement.total || 1)) * 100} 
                          className="h-1" 
                        />
                      </div>
                    ) : (
                      <Badge variant="outline" className="text-xs border-gray-300 text-gray-500">
                        Locked
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Leaderboard */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-500" />
            Weekly Leaderboard
            <Badge variant="outline" className="ml-auto">You're #{leaderboardPosition}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { rank: 1, name: "AdventureKing", xp: 2850, change: "+2" },
              { rank: 2, name: "WildExplorer", xp: 2740, change: "0" },
              { rank: 3, name: "SafariQueen", xp: 2680, change: "-1" },
              { rank: leaderboardPosition, name: "You", xp: xp, change: "+5", isUser: true }
            ].map((player) => (
              <div 
                key={player.rank}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  player.isUser ? 'bg-apex-red/10 border border-apex-red/20' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    player.rank === 1 ? 'bg-yellow-500 text-white' :
                    player.rank === 2 ? 'bg-gray-400 text-white' :
                    player.rank === 3 ? 'bg-orange-500 text-white' :
                    'bg-gray-200 text-gray-700'
                  }`}>
                    {player.rank}
                  </div>
                  <div>
                    <div className="font-medium text-apex-black">{player.name}</div>
                    <div className="text-sm text-apex-darkgray/60">{player.xp.toLocaleString()} XP</div>
                  </div>
                </div>
                
                <div className={`text-sm font-medium ${
                  player.change.startsWith('+') ? 'text-green-600' :
                  player.change.startsWith('-') ? 'text-red-600' :
                  'text-gray-600'
                }`}>
                  {player.change !== "0" && (player.change.startsWith('+') ? '↗' : '↘')} {player.change}
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full mt-4">
            View Full Leaderboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GamificationSystem;
