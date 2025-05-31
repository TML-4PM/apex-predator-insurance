
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, Heart, Share2, RefreshCw } from 'lucide-react';
import { useSpottos } from '@/hooks/useSpottos';
import { formatDistanceToNow } from 'date-fns';

const SpottoMigrationPanel = () => {
  const { spottos, loading, convertSpottoToOopsie } = useSpottos();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Spottos...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw size={20} />
          Migrate Spottos to Oopsies
        </CardTitle>
        <p className="text-sm text-gray-600">
          Convert existing adventure spottos into oopsies for unified content sharing
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {spottos.slice(0, 10).map((spotto) => (
            <div key={spotto.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{spotto.title}</h4>
                  <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                    {spotto.description}
                  </p>
                  
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    {spotto.location_name && (
                      <div className="flex items-center gap-1">
                        <MapPin size={12} />
                        <span>{spotto.location_name}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Heart size={12} />
                      <span>{spotto.likes_count || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Share2 size={12} />
                      <span>{spotto.shares_count || 0}</span>
                    </div>
                    <span>{formatDistanceToNow(new Date(spotto.created_at))} ago</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <Badge variant="outline" className="text-xs">
                    {spotto.category}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => convertSpottoToOopsie(spotto.id)}
                    className="text-xs flex items-center gap-1"
                  >
                    Convert <ArrowRight size={12} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {spottos.length > 10 && (
          <div className="mt-4 text-center">
            <Badge variant="secondary">
              Showing 10 of {spottos.length} spottos
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SpottoMigrationPanel;
