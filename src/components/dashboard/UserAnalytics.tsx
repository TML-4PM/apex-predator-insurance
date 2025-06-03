
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Award, Share2, Calendar, DollarSign } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsData {
  totalSpent: number;
  certificateCount: number;
  sharesCount: number;
  joinDate: string;
  favoriteCategory: string;
  achievements: string[];
}

export default function UserAnalytics() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAnalytics();
    }
  }, [user]);

  const fetchAnalytics = async () => {
    if (!user) return;

    try {
      // Fetch orders data
      const { data: orders } = await supabase
        .from('orders')
        .select('amount, plan_name, created_at')
        .eq('user_id', user.id)
        .eq('status', 'completed');

      // Fetch certificates data
      const { data: certificates } = await supabase
        .from('user_certificates')
        .select('certificate_type, created_at')
        .eq('user_id', user.id);

      const totalSpent = orders?.reduce((sum, order) => sum + order.amount, 0) || 0;
      const certificateCount = certificates?.length || 0;
      
      // Calculate favorite category (most purchased plan type)
      const planCounts = orders?.reduce((acc: any, order) => {
        acc[order.plan_name] = (acc[order.plan_name] || 0) + 1;
        return acc;
      }, {});
      
      const favoriteCategory = planCounts 
        ? Object.keys(planCounts).reduce((a, b) => planCounts[a] > planCounts[b] ? a : b, '')
        : 'None yet';

      // Generate achievements
      const achievements = [];
      if (certificateCount >= 1) achievements.push('First Certificate');
      if (certificateCount >= 5) achievements.push('Collector');
      if (totalSpent >= 5000) achievements.push('Big Spender'); // $50+
      if (orders && orders.length >= 3) achievements.push('Loyal Customer');

      setAnalytics({
        totalSpent: totalSpent / 100, // Convert from cents
        certificateCount,
        sharesCount: 0, // Placeholder for social sharing
        joinDate: user.created_at,
        favoriteCategory,
        achievements
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analytics) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          <DollarSign className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${analytics.totalSpent.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            Member since {new Date(analytics.joinDate).getFullYear()}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Certificates</CardTitle>
          <Award className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics.certificateCount}</div>
          <p className="text-xs text-muted-foreground">
            Survival certificates earned
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Favorite Plan</CardTitle>
          <TrendingUp className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold truncate">{analytics.favoriteCategory}</div>
          <p className="text-xs text-muted-foreground">
            Most purchased type
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Achievements</CardTitle>
          <Award className="h-4 w-4 text-amber-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics.achievements.length}</div>
          <div className="flex flex-wrap gap-1 mt-2">
            {analytics.achievements.slice(0, 2).map((achievement, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {achievement}
              </Badge>
            ))}
            {analytics.achievements.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{analytics.achievements.length - 2} more
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
