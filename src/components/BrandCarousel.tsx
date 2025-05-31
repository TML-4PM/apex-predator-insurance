
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
    <div className="bg-white/10 backdrop-blur-lg border-t border-white/20 py-8 overflow-hidden relative">
      <div className="group">
        <div className="flex animate-scroll-x group-hover:[animation-play-state:paused] w-[calc(200%+4rem)]">
          {/* First track */}
          <div className="flex items-center gap-16 min-w-full">
            {brands.map((brand, index) => (
              <a
                key={`first-${index}`}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white/15 hover:bg-white/25 px-8 py-4 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg whitespace-nowrap group/item"
              >
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${brand.gradientFrom} ${brand.gradientTo} flex items-center justify-center font-bold text-white text-sm shadow-lg`}>
                  {brand.logo}
                </div>
                <div className="font-semibold text-white text-lg drop-shadow-sm">
                  {brand.name}
                </div>
              </a>
            ))}
          </div>
          
          {/* Duplicate track for seamless loop */}
          <div className="flex items-center gap-16 min-w-full">
            {brands.map((brand, index) => (
              <a
                key={`second-${index}`}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white/15 hover:bg-white/25 px-8 py-4 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg whitespace-nowrap group/item"
              >
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${brand.gradientFrom} ${brand.gradientTo} flex items-center justify-center font-bold text-white text-sm shadow-lg`}>
                  {brand.logo}
                </div>
                <div className="font-semibold text-white text-lg drop-shadow-sm">
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
