
import React from 'react';

import MerchandiseStore from '@/components/MerchandiseStore';
import EnhancedCertificateSystem from '@/components/EnhancedCertificateSystem';
import ApexPredatorInsurance from '@/components/ApexPredatorInsurance';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Package, Gift, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const SEASONAL_OFFERS = [
  {
    emoji: '🌏',
    title: 'Tour Operator Deal',
    desc: 'Running a wildlife tour? Bulk certificate packs for your guests — co-branded, instant fulfilment.',
    cta: 'Contact Us',
    href: '/contact',
    badge: 'Partner',
    badgeColor: 'bg-emerald-600',
  },
  {
    emoji: '❄️',
    title: 'Winter Pack — 20% Off',
    desc: 'Arctic & cold-climate predator certificates. Limited seasonal offer, ends 31 Aug.',
    cta: 'View Pack',
    href: '/plans#winter-survival-collection',
    badge: 'Seasonal',
    badgeColor: 'bg-blue-600',
  },
  {
    emoji: '☀️',
    title: 'Summer Adventure Drop',
    desc: '10 tropical predators. Great white, tiger shark, box jelly, cone snail — warm-water season.',
    cta: 'View Pack',
    href: '/plans#summer-adventure-pack',
    badge: 'Seasonal',
    badgeColor: 'bg-orange-500',
  },
  {
    emoji: '🎁',
    title: 'Gift a Certificate',
    desc: "Seriously, what do you get someone who has everything? A shark certificate. You're welcome.",
    cta: 'Browse All',
    href: '/plans',
    badge: 'Gift Idea',
    badgeColor: 'bg-apex-red',
  },
  {
    emoji: '🏆',
    title: 'Collector Loyalty — 5th Cert Free',
    desc: "Bought 4? Your fifth certificate is on us. Email us your order IDs and we'll sort it.",
    cta: 'Claim Yours',
    href: '/contact',
    badge: 'Loyalty',
    badgeColor: 'bg-yellow-600',
  },
  {
    emoji: '🤳',
    title: 'Share & Earn',
    desc: 'Post your certificate to Instagram or TikTok, tag us, get a free predator of your choice.',
    cta: 'See How',
    href: '/contact',
    badge: 'Community',
    badgeColor: 'bg-purple-600',
  },
];

const Store = () => {
  return (
    <>
      <div className="pt-28 pb-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-apex-black animate-fade-up mb-4">
                Wildlife Shield Store
              </h1>
              <p className="text-xl text-apex-darkgray/70 animate-fade-up animate-delay-100">
                Certificates, bundles & collector packs — all in US$.
              </p>
            </div>

            {/* Store Tabs */}
            <Tabs defaultValue="certificates" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="certificates" className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span className="hidden sm:inline">Certificates</span>
                </TabsTrigger>
                <TabsTrigger value="bundles" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  <span className="hidden sm:inline">Bundles</span>
                  <Badge className="bg-green-600 text-white text-xs ml-1">SAVE</Badge>
                </TabsTrigger>
                <TabsTrigger value="offers" className="flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  <span className="hidden sm:inline">Seasonal & Loyalty</span>
                  <Badge className="bg-yellow-500 text-white text-xs ml-1">NEW</Badge>
                </TabsTrigger>
              </TabsList>

              {/* Certificates */}
              <TabsContent value="certificates">
                <div className="mb-6 text-center bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    Individual Certificates — US$9.99 each
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Choose any predator. Personalised, downloadable, shareable. No expiry.
                  </p>
                </div>
                <EnhancedCertificateSystem />
              </TabsContent>

              {/* Bundles */}
              <TabsContent value="bundles">
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-apex-black mb-4">
                      Bundle Collections
                    </h3>
                    <p className="text-gray-600 max-w-3xl mx-auto mb-6">
                      Regional, seasonal and experience-level packs. More predators, less per cert.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-lg">
                        <div className="text-2xl font-bold">US$79</div>
                        <div className="text-sm">Top 25 Pack</div>
                        <div className="text-xs opacity-90">Best-seller</div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-lg">
                        <div className="text-2xl font-bold">11+</div>
                        <div className="text-sm">Bundle Options</div>
                        <div className="text-xs opacity-90">Regional & Seasonal</div>
                      </div>
                      <div className="bg-gradient-to-r from-apex-red to-orange-500 text-white p-4 rounded-lg">
                        <div className="text-2xl font-bold">US$119.99</div>
                        <div className="text-sm">All 60 Predators</div>
                        <div className="text-xs opacity-90">Ultimate Collection</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-orange-100 to-red-100 border border-orange-200 rounded-lg p-6 text-center">
                      <div className="text-4xl mb-3">🌍</div>
                      <h4 className="font-bold text-lg mb-2">Regional</h4>
                      <p className="text-sm text-gray-600 mb-3">African Safari, Amazon, Outback & more</p>
                      <Badge className="bg-orange-600 text-white">5 Collections</Badge>
                    </div>
                    <div className="bg-gradient-to-br from-blue-100 to-cyan-100 border border-blue-200 rounded-lg p-6 text-center">
                      <div className="text-4xl mb-3">🌡️</div>
                      <h4 className="font-bold text-lg mb-2">Seasonal</h4>
                      <p className="text-sm text-gray-600 mb-3">Summer Adventure & Winter Survival</p>
                      <Badge className="bg-blue-600 text-white">2 Collections</Badge>
                    </div>
                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200 rounded-lg p-6 text-center">
                      <div className="text-4xl mb-3">⭐</div>
                      <h4 className="font-bold text-lg mb-2">Experience</h4>
                      <p className="text-sm text-gray-600 mb-3">Beginner to Extreme Explorer</p>
                      <Badge className="bg-purple-600 text-white">3 Collections</Badge>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-400 rounded-lg p-6 text-center">
                      <div className="text-4xl mb-3">🏆</div>
                      <h4 className="font-bold text-lg mb-2">Ultimate</h4>
                      <p className="text-sm text-gray-600 mb-3">All 60 predators — complete set</p>
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">US$119.99</Badge>
                    </div>
                  </div>

                  <div className="text-center mt-8">
                    <a
                      href="/plans"
                      className="inline-block bg-apex-red hover:bg-apex-red/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                    >
                      Browse All Bundles →
                    </a>
                  </div>
                </div>
              </TabsContent>

              {/* Seasonal & Loyalty */}
              <TabsContent value="offers">
                <div className="mb-8 text-center">
                  <h3 className="text-3xl font-bold text-apex-black mb-3">
                    Seasonal & Loyalty Offers
                  </h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Tour operators, gift-givers, collectors and social sharers — there's a deal for you.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SEASONAL_OFFERS.map((offer, i) => (
                    <div
                      key={i}
                      className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-3xl">{offer.emoji}</span>
                        <Badge className={`${offer.badgeColor} text-white text-xs`}>{offer.badge}</Badge>
                      </div>
                      <h4 className="font-bold text-lg text-apex-black mb-2">{offer.title}</h4>
                      <p className="text-sm text-gray-600 flex-1 mb-4">{offer.desc}</p>
                      <a
                        href={offer.href}
                        className="inline-block text-center bg-apex-black hover:bg-apex-red text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                      >
                        {offer.cta} →
                      </a>
                    </div>
                  ))}
                </div>

                {/* Tour operator callout */}
                <div className="mt-12 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl p-8 text-center">
                  <Zap className="w-10 h-10 mx-auto mb-4 opacity-80" />
                  <h3 className="text-2xl font-bold mb-2">Hey Tour Operator 👋</h3>
                  <p className="text-emerald-100 max-w-xl mx-auto mb-6">
                    White-label certificate packs for your guests. Your brand, our predators.
                    Minimum order 10. Bulk pricing from US$7.99/cert.
                  </p>
                  <a
                    href="/contact"
                    className="inline-block bg-white text-emerald-700 font-bold px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    Get a Quote
                  </a>
                </div>
              </TabsContent>
            </Tabs>

          </div>
        </div>
      </div>
    </>
  );
};

export default Store;
