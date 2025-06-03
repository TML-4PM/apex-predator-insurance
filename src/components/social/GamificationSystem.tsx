
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Target, 
  Zap, 
  Calendar, 
  TrendingUp, 
  Award,
  Star,
  Crown,
  Fire
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
  earned_at: string;
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
  const xpProgress = (xp / xpToNext) * 100;

  const getDifficultyColor = (difficulty: Challenge['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* User Level & XP */}
      <Card className="border-none shadow-lg bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-6 w-6 text-yellow-500" />
            Adventurer Level {userLevel}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Experience Points</span>
            <span className="text-sm text-apex-darkgray/60">{xp} / {xpToNext} XP</span>
          </div>
          <Progress value={xpProgress} className="h-3" />
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-2">
                <Fire className="h-6 w-6 text-orange-500" />
              </div>
              <div className="text-2xl font-bold text-apex-black">{streak}</div>
              <div className="text-sm text-apex-darkgray/60">Day Streak</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
                <TrendingUp className="h-6 w-6 text-purple-500" />
              </div>
              <div className="text-2xl font-bold text-apex-black">#{leaderboardPosition}</div>
              <div className="text-sm text-apex-darkgray/60">Global Rank</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-2">
                <Trophy className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold text-apex-black">{achievements.length}</div>
              <div className="text-sm text-apex-darkgray/60">Achievements</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Challenges */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            Active Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeChallenges.length > 0 ? (
            <div className="grid gap-4">
              {activeChallenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="p-4 border border-apex-lightgray rounded-lg bg-white"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-apex-black">{challenge.title}</h4>
                      <p className="text-sm text-apex-darkgray/60 mt-1">{challenge.description}</p>
                    </div>
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress: {challenge.progress}/{challenge.total}</span>
                      <span className="text-apex-darkgray/60">{challenge.timeLeft} left</span>
                    </div>
                    <Progress value={(challenge.progress / challenge.total) * 100} className="h-2" />
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">{challenge.reward}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {challenge.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Target className="h-12 w-12 text-apex-darkgray/40 mx-auto mb-4" />
              <h3 className="font-medium text-apex-black mb-2">No active challenges</h3>
              <p className="text-apex-darkgray/60 mb-4">
                Check back daily for new challenges to earn XP and rewards!
              </p>
              <Button className="bg-apex-red hover:bg-apex-red/90">
                Explore Challenges
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          {achievements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.slice(0, 6).map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-apex-black">{achievement.name}</h4>
                    <p className="text-sm text-apex-darkgray/60">{achievement.description}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    New
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Trophy className="h-12 w-12 text-apex-darkgray/40 mx-auto mb-4" />
              <h3 className="font-medium text-apex-black mb-2">No achievements yet</h3>
              <p className="text-apex-darkgray/60">
                Complete adventures and challenges to unlock your first achievement!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-none shadow-lg">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16">
              <div className="text-center">
                <Calendar className="h-5 w-5 mx-auto mb-1" />
                <div className="text-sm">Daily Check-in</div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-16">
              <div className="text-center">
                <TrendingUp className="h-5 w-5 mx-auto mb-1" />
                <div className="text-sm">View Leaderboard</div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-16">
              <div className="text-center">
                <Trophy className="h-5 w-5 mx-auto mb-1" />
                <div className="text-sm">Browse Rewards</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GamificationSystem;
