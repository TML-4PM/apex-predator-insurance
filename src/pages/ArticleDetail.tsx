
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Tag, Share2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NEWS_ARTICLES } from '@/data/newsArticles';

const CATEGORY_COLORS: Record<string, string> = {
  Research: 'bg-blue-100 text-blue-700',
  Tech: 'bg-purple-100 text-purple-700',
  Seasonal: 'bg-orange-100 text-orange-700',
  Conservation: 'bg-green-100 text-green-700',
};

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = NEWS_ARTICLES.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-4 text-center">
        <div className="text-6xl mb-4">🦈</div>
        <h2 className="text-2xl font-bold mb-2">Article not found</h2>
        <p className="text-gray-500 mb-6">The article you're looking for may have moved or been removed.</p>
        <Link to="/articles"><Button variant="outline">← Back to News</Button></Link>
      </div>
    );
  }

  const related = NEWS_ARTICLES.filter(a => a.id !== article.id && a.tag === article.tag).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: article.title, text: article.excerpt, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.6) saturate(1.1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        <div className="absolute top-6 left-4">
          <Link to="/articles">
            <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-1" /> News
            </Button>
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-5 sm:px-8 pb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[article.category] || 'bg-gray-100 text-gray-700'}`}>
              {article.category}
            </span>
            <Badge variant="outline" className="text-white/80 border-white/30 text-[10px]">
              <Tag className="w-2.5 h-2.5 mr-1" />{article.tag}
            </Badge>
            <span className="text-white/60 text-xs flex items-center gap-1">
              <MapPin className="w-3 h-3" />{article.region}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight max-w-3xl">
            {article.title}
          </h1>
        </div>
      </div>

      {/* Meta bar */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto max-w-3xl px-4 py-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{article.date}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{article.readTime}</span>
          <span className="font-medium text-gray-700">{article.author}</span>
          <button onClick={handleShare} className="ml-auto flex items-center gap-1.5 text-apex-red hover:text-apex-red/80 font-semibold">
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto max-w-3xl px-4 py-10">
        <p className="text-lg text-gray-700 font-medium leading-relaxed mb-8 border-l-4 border-apex-red pl-5">
          {article.excerpt}
        </p>
        <div
          className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-apex-black prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />

        {/* Certificate CTA */}
        <div className="mt-12 bg-gradient-to-r from-apex-black to-gray-900 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
          <img
            src={article.image}
            alt={article.tag}
            className="w-20 h-20 rounded-xl object-cover shrink-0"
            style={{ filter: 'brightness(0.8) saturate(1.1)' }}
          />
          <div className="flex-1 text-center sm:text-left">
            <div className="text-white font-black text-lg mb-1">Get Your {article.tag} Certificate</div>
            <div className="text-white/60 text-sm">Commemorate your knowledge of the world's most dangerous predator — US$9.99</div>
          </div>
          <Link to="/plans">
            <Button className="bg-apex-red hover:bg-apex-red/90 text-white shrink-0">
              Get Certificate <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="border-t border-gray-100 bg-gray-50 py-12">
          <div className="container mx-auto max-w-6xl px-4">
            <h3 className="text-xl font-black text-apex-black mb-6">More {article.tag} Stories</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map(r => (
                <Link key={r.id} to={`/articles/${r.slug}`} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-36 overflow-hidden">
                    <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" style={{ filter: 'brightness(0.8)' }} />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-bold text-apex-black group-hover:text-apex-red transition-colors line-clamp-2">{r.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{r.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;
