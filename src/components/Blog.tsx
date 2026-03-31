
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NEWS_ARTICLES } from '@/pages/Articles';

const CATEGORY_COLORS: Record<string, string> = {
  Research: 'bg-blue-100 text-blue-700',
  Tech: 'bg-purple-100 text-purple-700',
  Seasonal: 'bg-orange-100 text-orange-700',
  Conservation: 'bg-green-100 text-green-700',
};

const Blog = () => {
  const posts = NEWS_ARTICLES.slice(0, 3);

  return (
    <section className="py-20 bg-white" id="blog">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-apex-black mb-4">
            Wildlife Intelligence
          </h2>
          <p className="text-lg text-gray-500">
            Research-led reporting on predator populations, encounter data, and the tourism destinations they're powering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {posts.map(post => (
            <Link key={post.id} to={`/articles/${post.slug}`} className="group">
              <Card className="overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full">
                {/* Image */}
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ filter: 'brightness(0.8) saturate(1.05)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[post.category] || 'bg-gray-100 text-gray-700'}`}>
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 text-white/70 text-[10px] flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5" />{post.region}
                  </div>
                </div>

                <CardContent className="flex-1 p-4">
                  <h3 className="font-bold text-apex-black text-sm leading-snug mb-2 group-hover:text-apex-red transition-colors line-clamp-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-xs line-clamp-2">{post.excerpt}</p>
                </CardContent>

                <CardFooter className="px-4 pb-4 pt-0 flex justify-between items-center">
                  <span className="text-gray-400 text-xs flex items-center gap-1">
                    <Calendar className="w-3 h-3" />{post.date}
                  </span>
                  <span className="text-apex-red text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 border-2 border-apex-black text-apex-black font-bold px-6 py-3 rounded-lg hover:bg-apex-black hover:text-white transition-colors"
          >
            All News & Research <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
