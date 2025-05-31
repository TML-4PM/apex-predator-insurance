
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAnimals } from '@/hooks/useAnimals';
import { useInsurancePolicies } from '@/hooks/useInsurancePolicies';
import { usePredatorEncounters } from '@/hooks/usePredatorEncounters';
import { 
  Shield, 
  AlertTriangle, 
  MapPin, 
  DollarSign,
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react';

const ApexPredatorInsurance = () => {
  const { animals, loading: animalsLoading } = useAnimals();
  const { policies, loading: policiesLoading } = useInsurancePolicies();
  const { encounters, loading: encountersLoading } = usePredatorEncounters();

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'mythic': return 'bg-purple-100 text-purple-800';
      case 'legendary': return 'bg-yellow-100 text-yellow-800';
      case 'rare': return 'bg-blue-100 text-blue-800';
      case 'uncommon': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDangerLevelColor = (level: number) => {
    if (level >= 5) return 'text-red-600';
    if (level >= 4) return 'text-orange-600';
    if (level >= 3) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (animalsLoading || policiesLoading || encountersLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-apex-orange mx-auto mb-4"></div>
          <p className="text-apex-darkgray">Loading apex predator data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-red-500" size={24} />
              <div>
                <p className="text-sm text-gray-600">Active Threats</p>
                <p className="text-2xl font-bold">{animals.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Shield className="text-blue-500" size={24} />
              <div>
                <p className="text-sm text-gray-600">Insurance Plans</p>
                <p className="text-2xl font-bold">{policies.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="text-green-500" size={24} />
              <div>
                <p className="text-sm text-gray-600">Reported Encounters</p>
                <p className="text-2xl font-bold">{encounters.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-purple-500" size={24} />
              <div>
                <p className="text-sm text-gray-600">Avg Danger Level</p>
                <p className="text-2xl font-bold">
                  {animals.length > 0 
                    ? Math.round(animals.reduce((sum, a) => sum + a.danger_level, 0) / animals.length * 10) / 10
                    : 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insurance Plans */}
      <div>
        <h2 className="text-2xl font-bold text-apex-black mb-6">Available Insurance Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {policies.map((policy) => (
            <Card key={policy.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{policy.name}</CardTitle>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-apex-orange">${policy.price}</p>
                    <p className="text-sm text-gray-600">per year</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{policy.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-green-600" />
                    <span className="text-sm">Coverage: ${policy.coverage_amount.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-blue-600" />
                    <span className="text-sm">Duration: {policy.coverage_duration_days} days</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-purple-600" />
                    <span className="text-sm">Regions: {policy.covered_regions.join(', ')}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-semibold mb-2">Covered Animals:</p>
                  <div className="flex flex-wrap gap-1">
                    {policy.covered_animals.slice(0, 3).map((animal, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {animal}
                      </Badge>
                    ))}
                    {policy.covered_animals.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{policy.covered_animals.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <Button className="w-full mt-4 bg-apex-orange hover:bg-apex-orange/90">
                  Get Coverage
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Top Threats */}
      <div>
        <h2 className="text-2xl font-bold text-apex-black mb-6">Most Dangerous Apex Predators</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {animals.slice(0, 6).map((animal) => (
            <Card key={animal.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{animal.name}</CardTitle>
                  <Badge className={getRarityColor(animal.rarity)}>
                    {animal.rarity}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg bg-gray-200 mb-4 overflow-hidden">
                  <img 
                    src={animal.image_url} 
                    alt={animal.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                </div>
                
                <p className="text-sm text-gray-700 mb-3 line-clamp-2">{animal.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Danger Level:</span>
                    <span className={`font-bold ${getDangerLevelColor(animal.danger_level)}`}>
                      {animal.danger_level}/5
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Annual Fatalities:</span>
                    <span className="font-semibold text-red-600">{animal.kills_per_year.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Category:</span>
                    <Badge variant="outline" className="text-xs">
                      {animal.category}
                    </Badge>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-xs text-gray-600 mb-1">Found in:</p>
                  <p className="text-sm">{animal.locations.slice(0, 2).join(', ')}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApexPredatorInsurance;
