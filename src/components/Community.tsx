
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Heart, BookOpen, Zap, MapPin, Send, AlertTriangle, Fish, Leaf } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// ── Seeded news/encounter articles ──────────────────────────────────────────
const FEATURED_ARTICLES = [
  {
    id: 'a1',
    category: 'encounter',
    tag: 'Shark',
    emoji: '🦈',
    title: 'Freediver surfaces 2m from a great white — "I froze. It just looked at me."',
    summary:
      'A spearfisher off Neptune Islands recounts a prolonged encounter with a 4.5m great white. New drone tech now gives operators a 90-second warning window before sharks breach the surface.',
    image: 'https://images.unsplash.com/photo-1560275619-4cc5fa59d3ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Neptune Islands, SA',
    date: 'Mar 2025',
    likes: 312,
    tech: 'Aerial drone monitoring',
  },
  {
    id: 'a2',
    category: 'tech',
    tag: 'Tech for Humanity',
    emoji: '🔬',
    title: 'AI that listens for hippos: how acoustic sensors are preventing ambushes on African rivers',
    summary:
      'Researchers in Zambia deployed a network of low-power microphones trained on hippo vocalisations. Boat operators receive a vibration alert 40 seconds before rounding a blind bend — time enough.',
    image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Lower Zambezi, Zambia',
    date: 'Feb 2025',
    likes: 198,
    tech: 'Acoustic AI sensors',
  },
  {
    id: 'a3',
    category: 'encounter',
    tag: 'Crocodile',
    emoji: '🐊',
    title: 'Kayaker capsizes in the Daintree — croc was 6 inches from the hull',
    summary:
      'The incident happened in flat-calm conditions at dawn. The kayaker escaped by climbing a mangrove root and waiting two hours. Parks Queensland has since installed thermal camera buoys at six launch points.',
    image: 'https://images.unsplash.com/photo-1591389703635-e15a07609a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Daintree River, QLD',
    date: 'Jan 2025',
    likes: 441,
    tech: 'Thermal camera buoys',
  },
  {
    id: 'a4',
    category: 'tech',
    tag: 'Tech for Humanity',
    emoji: '📡',
    title: 'Shark-spotting satellite imagery goes public — free real-time alerts for any beach',
    summary:
      'The SharkEye platform now processes Sentinel-2 imagery every 6 hours and pushes SMS alerts to opted-in surfers. Coverage spans all of coastal Australia, South Africa, and both US coasts.',
    image: 'https://images.unsplash.com/photo-1502239608882-93b729c6af43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Global',
    date: 'Mar 2025',
    likes: 527,
    tech: 'Satellite ML detection',
  },
  {
    id: 'a5',
    category: 'encounter',
    tag: 'Bear',
    emoji: '🐻',
    title: '"I played dead for 22 minutes." Grizzly encounter in Banff goes viral after helmet-cam footage surfaces',
    summary:
      'A trail runner encountered a grizzly with two cubs. He dropped, covered his neck, and did not move. The bear left after circling three times. Wildlife authorities called it a textbook survival response.',
    image: 'https://images.unsplash.com/photo-1525869916826-972885c91c1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Banff National Park, Canada',
    date: 'Dec 2024',
    likes: 892,
    tech: 'GPS bear collaring data',
  },
  {
    id: 'a6',
    category: 'nature',
    tag: 'Conservation',
    emoji: '🌿',
    title: 'Great white numbers up 40% off Gansbaai — conservation or collision course?',
    summary:
      "South Africa's landmark 1991 white shark protection law is bearing fruit. Tagging data confirms a 40% population increase since 2012. Operators say cage-diving incidents are up proportionally, reigniting the debate about managed access.",
    image: 'https://images.unsplash.com/photo-1502239608882-93b729c6af43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Gansbaai, South Africa',
    date: 'Mar 2025',
    likes: 266,
    tech: 'SMART acoustic tagging',
  },
];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  encounter: <AlertTriangle className="w-3.5 h-3.5" />,
  tech: <Zap className="w-3.5 h-3.5" />,
  nature: <Leaf className="w-3.5 h-3.5" />,
};

const CATEGORY_COLORS: Record<string, string> = {
  encounter: 'bg-apex-red text-white',
  tech: 'bg-blue-600 text-white',
  nature: 'bg-emerald-600 text-white',
};

const Community = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState<'all' | 'encounter' | 'tech' | 'nature'>('all');
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [form, setForm] = useState({
    name: '',
    location: '',
    animal: '',
    story: '',
    email: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const filtered = filter === 'all' ? FEATURED_ARTICLES : FEATURED_ARTICLES.filter(a => a.category === filter);

  const handleLike = (id: string, base: number) => {
    setLikes(prev => ({ ...prev, [id]: (prev[id] ?? base) + 1 }));
  };

  const handleSubmit = async () => {
    if (!form.animal || !form.story || !form.location) {
      toast({ title: 'Missing fields', description: 'Animal, location and your story are required.', variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    // Simulate async submit
    await new Promise(r => setTimeout(r, 800));
    setSubmitting(false);
    setForm({ name: '', location: '', animal: '', story: '', email: '' });
    toast({
      title: '🦈 Encounter submitted!',
      description: "We'll review and publish within 48 hours. Thanks for sharing.",
    });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Fish className="w-7 h-7 text-apex-red" />
            <h2 className="text-3xl md:text-4xl font-bold text-apex-black">
              Wildlife Intelligence
            </h2>
          </div>
          <p className="text-xl text-apex-darkgray/70">
            Real encounters. Real tech. The intersection of humans and the wild — and what we're building to survive it.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {(['all', 'encounter', 'tech', 'nature'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-colors ${
                filter === f
                  ? 'bg-apex-black text-white border-apex-black'
                  : 'bg-white text-apex-darkgray border-gray-200 hover:border-apex-black'
              }`}
            >
              {f === 'all' ? 'All Stories' : f === 'encounter' ? '⚡ Encounters' : f === 'tech' ? '🔬 Tech' : '🌿 Nature'}
            </button>
          ))}
        </div>

        {/* Article grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {filtered.map(article => (
            <Card key={article.id} className="border-none shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col">
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <Badge className={`${CATEGORY_COLORS[article.category]} flex items-center gap-1 text-xs`}>
                    {CATEGORY_ICONS[article.category]}
                    {article.tag}
                  </Badge>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {article.location}
                </div>
              </div>

              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                  <span className="text-lg">{article.emoji}</span>
                  <span>{article.date}</span>
                  {article.tech && (
                    <>
                      <span>·</span>
                      <span className="text-blue-500 font-medium">{article.tech}</span>
                    </>
                  )}
                </div>
                <h3 className="font-bold text-apex-black text-base leading-snug">
                  {article.title}
                </h3>
              </CardHeader>

              <CardContent className="flex-1 pb-2">
                <p className="text-sm text-gray-600 leading-relaxed">{article.summary}</p>
              </CardContent>

              <CardFooter className="pt-2 flex justify-between items-center border-t border-gray-50">
                <button
                  onClick={() => handleLike(article.id, article.likes)}
                  className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-apex-red transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  <span>{likes[article.id] ?? article.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-apex-black transition-colors">
                  <BookOpen className="w-4 h-4" />
                  Read more
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Submit Your Encounter */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-2xl font-bold text-apex-black mb-2">Submit Your Encounter</h3>
              <p className="text-gray-600 text-sm">
                Had a close call? A sighting? A story worth telling? We want it. Best submissions get featured and a free certificate.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Your name (optional)"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
                <Input
                  placeholder="Location *"
                  value={form.location}
                  onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                />
              </div>
              <Input
                placeholder="Animal involved *"
                value={form.animal}
                onChange={e => setForm(f => ({ ...f, animal: e.target.value }))}
              />
              <textarea
                placeholder="Tell us what happened * (the more vivid, the better)"
                value={form.story}
                onChange={e => setForm(f => ({ ...f, story: e.target.value }))}
                className="w-full min-h-[120px] resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Input
                placeholder="Email (if you want a free cert)"
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              />
              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full bg-apex-red hover:bg-apex-red/90 text-white font-semibold py-3"
              >
                <Send className="w-4 h-4 mr-2" />
                {submitting ? 'Submitting…' : 'Submit My Encounter'}
              </Button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Community;
