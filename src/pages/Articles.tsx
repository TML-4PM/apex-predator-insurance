
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Clock, TrendingUp, Zap, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { NEWS_ARTICLES } from '@/data/newsArticles';

export { NEWS_ARTICLES };

const CATEGORIES = ['All', 'Research', 'Tech', 'Seasonal', 'Conservation'];

export const CATEGORY_COLORS: Record<string, string> = {
  Research: 'bg-blue-100 text-blue-700',
  Tech: 'bg-purple-100 text-purple-700',
  Seasonal: 'bg-orange-100 text-orange-700',
  Conservation: 'bg-green-100 text-green-700',
};

const Articles = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = NEWS_ARTICLES.filter(a => {
    const matchSearch = !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.tag.toLowerCase().includes(search.toLowerCase()) ||
      a.region.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || a.category === activeCategory;
    return matchSearch && matchCat;
  });

  const featured = filtered.find(a => a.featured);
  const rest = filtered.filter(a => !a.featured || activeCategory !== 'All' || !!search);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-apex-black pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-apex-red" />
            <span className="text-apex-red text-sm font-bold uppercase tracking-wider">Wildlife Intelligence</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            News & Research
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Research-led reporting on predator populations, encounter data, emerging tech, and the tourist destinations cashing in on the world's most dangerous animals.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Input
              placeholder="Search by animal, region, topic…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-4"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  activeCategory === cat
                    ? 'bg-apex-black text-white border-apex-black'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-apex-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured */}
        {featured && !search && activeCategory === 'All' && (
          <Link to={`/articles/${featured.slug}`} className="block mb-10 group">
            <div className="relative rounded-2xl overflow-hidden h-80 sm:h-96">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ filter: 'brightness(0.65)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <Badge className="bg-apex-red text-white text-xs">FEATURED</Badge>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[featured.category] || 'bg-gray-100 text-gray-700'}`}>
                    {featured.category}
                  </span>
                  <span className="text-white/60 text-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3" />{featured.region}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white mb-2 group-hover:text-apex-red/90 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-white/70 text-sm line-clamp-2">{featured.excerpt}</p>
                <div className="flex items-center gap-4 mt-3 text-white/50 text-xs">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{featured.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime}</span>
                  <span className="ml-auto flex items-center gap-1 text-apex-red font-semibold">Read More <ArrowRight className="w-3 h-3" /></span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map(article => (
            <Link
              key={article.id}
              to={`/articles/${article.slug}`}
              className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ filter: 'brightness(0.78) saturate(1.05)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[article.category] || 'bg-gray-100 text-gray-700'}`}>
                    {article.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 flex items-center gap-1 text-white/70 text-[10px]">
                  <MapPin className="w-2.5 h-2.5" />{article.region}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-apex-black text-sm leading-snug mb-2 group-hover:text-apex-red transition-colors line-clamp-3">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-xs line-clamp-2 mb-3">{article.excerpt}</p>
                <div className="flex items-center justify-between text-gray-400 text-xs">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{article.date}</span>
                  <span className="flex items-center gap-1 text-apex-red font-semibold">Read <ChevronRight className="w-3 h-3" /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="font-semibold">No articles match "{search}"</p>
          </div>
        )}

        {/* Submit CTA */}
        <div className="mt-16 bg-apex-black rounded-2xl p-8 text-center">
          <Zap className="w-8 h-8 text-apex-red mx-auto mb-3" />
          <h3 className="text-2xl font-black text-white mb-2">Got a Story?</h3>
          <p className="text-white/60 mb-5 max-w-md mx-auto text-sm">
            Researchers, guides, operators and encounter survivors — we publish verified wildlife intelligence with full attribution.
          </p>
          <Link to="/community" className="inline-block bg-apex-red hover:bg-apex-red/90 text-white font-bold px-8 py-3 rounded-lg transition-colors">
            Submit Your Story
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Articles;
