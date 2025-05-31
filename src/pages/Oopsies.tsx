
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import OopsieGallery from '@/components/OopsieGallery';
import YoutubeChannel from '@/components/YoutubeChannel';
import SpottoMigrationPanel from '@/components/SpottoMigrationPanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Clock, Flame, Youtube, Plus, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { value: 'all', label: 'All Oopsies', icon: Flame },
  { value: 'ai_fail', label: 'AI Fails', icon: TrendingUp },
  { value: 'adventure_gone_wrong', label: 'Adventure Gone Wrong', icon: Clock },
  { value: 'insurance_claim', label: 'Insurance Claims', icon: Flame },
  { value: 'wildlife_encounter', label: 'Wildlife Encounters', icon: Flame },
];

const Oopsies = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showMigrationPanel, setShowMigrationPanel] = useState(false);

  return (
    <Layout>
      <div className="pt-28 pb-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-apex-black mb-6 animate-fade-up">
                Epic Oopsies Gallery
              </h1>
              <p className="text-xl text-apex-darkgray/70 mb-8 animate-fade-up animate-delay-100">
                Discover the funniest adventure mishaps and AI prediction fails from our community.
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center mb-8 animate-fade-up animate-delay-200">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Button
                      key={category.value}
                      variant={selectedCategory === category.value ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category.value)}
                      className="flex items-center gap-2"
                    >
                      <IconComponent size={16} />
                      {category.label}
                    </Button>
                  );
                })}
              </div>
              
              <div className="flex flex-wrap gap-3 justify-center mb-8">
                <Link to="/submit">
                  <Button className="bg-apex-red hover:bg-apex-red/90">
                    <Plus size={16} className="mr-2" />
                    Share Your Oopsie
                  </Button>
                </Link>
                
                <Button
                  variant="outline"
                  onClick={() => setShowMigrationPanel(!showMigrationPanel)}
                  className="border-apex-red text-apex-red hover:bg-apex-red/10"
                >
                  <Settings size={16} className="mr-2" />
                  {showMigrationPanel ? 'Hide' : 'Show'} Migration Tools
                </Button>
              </div>

              {showMigrationPanel && (
                <div className="mb-8 animate-fade-up">
                  <SpottoMigrationPanel />
                </div>
              )}
            </div>

            <Tabs defaultValue="gallery" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="gallery" className="flex items-center gap-2">
                  <Flame size={16} />
                  Community Gallery
                </TabsTrigger>
                <TabsTrigger value="youtube" className="flex items-center gap-2">
                  <Youtube size={16} />
                  YouTube Channel
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="gallery" className="space-y-8">
                <div className="bg-apex-lightgray/50 rounded-lg p-6 mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="text-apex-red" />
                    <h2 className="text-2xl font-bold text-apex-black">Featured Oopsies</h2>
                    <Badge className="bg-apex-red text-white">Trending</Badge>
                  </div>
                  <OopsieGallery showFeatured={true} limit={3} />
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-apex-black mb-6">
                    {selectedCategory === 'all' ? 'All Oopsies' : categories.find(c => c.value === selectedCategory)?.label}
                  </h2>
                  <OopsieGallery 
                    category={selectedCategory === 'all' ? undefined : selectedCategory} 
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="youtube">
                <YoutubeChannel />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Oopsies;
