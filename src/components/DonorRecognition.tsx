
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Crown, Star, Trophy } from 'lucide-react';

const topDonors = [
  { name: 'Anonymous Supporter', amount: 5000, badge: 'Legend', icon: Crown },
  { name: 'Adventure Enthusiast', amount: 2500, badge: 'Super Fan', icon: Trophy },
  { name: 'Safety First', amount: 1000, badge: 'Legend', icon: Crown },
  { name: 'Risk Taker', amount: 500, badge: 'VIP', icon: Star },
  { name: 'Explorer', amount: 250, badge: 'Server Savior', icon: Heart },
];

const recentDonations = [
  { name: 'Anonymous', amount: 25, time: '2 hours ago' },
  { name: 'John D.', amount: 100, time: '4 hours ago' },
  { name: 'Anonymous', amount: 50, time: '6 hours ago' },
  { name: 'Sarah M.', amount: 15, time: '1 day ago' },
  { name: 'Mike R.', amount: 250, time: '1 day ago' },
];

const DonorRecognition = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Top Donors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="text-apex-red" />
            Top Supporters
          </CardTitle>
          <p className="text-sm text-apex-darkgray/70">
            Our most generous supporters who make this possible
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topDonors.map((donor, index) => {
              const IconComponent = donor.icon;
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-apex-lightgray/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-bold text-apex-darkgray/50">#{index + 1}</span>
                      <IconComponent className="text-apex-red" size={16} />
                    </div>
                    <div>
                      <div className="font-semibold text-apex-black">{donor.name}</div>
                      <Badge variant="outline" className="text-xs">
                        {donor.badge}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-apex-red">${donor.amount.toLocaleString()}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Donations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="text-apex-red" />
            Recent Donations
          </CardTitle>
          <p className="text-sm text-apex-darkgray/70">
            Latest contributions from our amazing community
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentDonations.map((donation, index) => (
              <div key={index} className="flex items-center justify-between p-3 border-l-4 border-apex-red/20 bg-apex-lightgray/20 rounded-r-lg">
                <div>
                  <div className="font-semibold text-apex-black">{donation.name}</div>
                  <div className="text-xs text-apex-darkgray/60">{donation.time}</div>
                </div>
                <div className="font-bold text-apex-red">
                  ${donation.amount}
                </div>
              </div>
            ))}
          </div>
          
          {/* Impact Stats */}
          <div className="mt-6 pt-6 border-t border-apex-lightgray">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-apex-red">$47,250</div>
                <div className="text-sm text-apex-darkgray/70">Total Raised</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-apex-red">234</div>
                <div className="text-sm text-apex-darkgray/70">Supporters</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonorRecognition;
