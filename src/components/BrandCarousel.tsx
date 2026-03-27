
import React from 'react';

interface Brand {
  name: string;
  url: string;
  logo: string;
  gradientFrom: string;
  gradientTo: string;
}

const brands: Brand[] = [
  {
    name: 'extremespotto.com',
    url: 'https://extremespotto.com',
    logo: 'ES',
    gradientFrom: 'from-orange-500',
    gradientTo: 'to-red-500'
  },
  {
    name: 'apexpredatorinsurance.com',
    url: 'https://apexpredatorinsurance.com',
    logo: 'API',
    gradientFrom: 'from-apex-red',
    gradientTo: 'to-red-600'
  },
  {
    name: 'aioopsies.com',
    url: 'https://aioopsies.com',
    logo: 'AO',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-cyan-500'
  },
  {
    name: 'aussiegirlmath.com',
    url: 'https://aussiegirlmath.com',
    logo: 'AGM',
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-pink-500'
  }
];

const BrandCarousel = () => {
  return (
    <div className="bg-white/10 backdrop-blur-lg border-t border-white/20 py-6 overflow-hidden relative">
      {/* Left fade mask */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black/40 to-transparent z-10 pointer-events-none" />
      {/* Right fade mask */}
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black/40 to-transparent z-10 pointer-events-none" />

      <div className="group">
        <div className="flex animate-scroll-x group-hover:[animation-play-state:paused] w-[calc(200%+2.5rem)]">
          {/* First track */}
          <div className="flex items-center gap-10 min-w-full justify-around">
            {brands.map((brand, index) => (
              <a
                key={`first-${index}`}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/15 hover:bg-white/25 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg whitespace-nowrap"
              >
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${brand.gradientFrom} ${brand.gradientTo} flex items-center justify-center font-bold text-white text-xs shadow-lg`}>
                  {brand.logo}
                </div>
                <div className="font-semibold text-white text-base drop-shadow-sm">
                  {brand.name}
                </div>
              </a>
            ))}
          </div>
          
          {/* Duplicate track for seamless loop */}
          <div className="flex items-center gap-10 min-w-full justify-around">
            {brands.map((brand, index) => (
              <a
                key={`second-${index}`}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/15 hover:bg-white/25 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg whitespace-nowrap"
              >
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${brand.gradientFrom} ${brand.gradientTo} flex items-center justify-center font-bold text-white text-xs shadow-lg`}>
                  {brand.logo}
                </div>
                <div className="font-semibold text-white text-base drop-shadow-sm">
                  {brand.name}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandCarousel;
