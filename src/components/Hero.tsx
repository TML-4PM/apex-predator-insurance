
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Camera } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      const moveX = (x - 0.5) * 20;
      const moveY = (y - 0.5) * 20;
      
      document.documentElement.style.setProperty('--move-x', `${moveX}px`);
      document.documentElement.style.setProperty('--move-y', `${moveY}px`);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-10"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-apex-black/90 to-apex-black/80 z-10" />
        <div 
          className="absolute inset-0 bg-center bg-cover z-0"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1560275619-4cc5fa59d3ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
            filter: 'brightness(0.4) contrast(1.2)'
          }} 
        />
      </div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
        <div className="floating stagger-1 absolute top-1/4 left-[15%] opacity-20">
          <img src="https://images.unsplash.com/photo-1504472478235-9bc48ba4d60f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
            alt="Shark" className="w-48 h-48 object-cover rounded-full" style={{ filter: 'grayscale(70%) brightness(0.7)' }} />
        </div>
        <div className="floating stagger-3 absolute top-1/3 right-[20%] opacity-20">
          <img src="https://images.unsplash.com/photo-1566159196870-743187b11219?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
            alt="Crocodile" className="w-48 h-48 object-cover rounded-full" style={{ filter: 'grayscale(70%) brightness(0.7)' }} />
        </div>
        <div className="floating stagger-2 absolute bottom-1/4 left-[25%] opacity-20">
          <img src="https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
            alt="Lion" className="w-48 h-48 object-cover rounded-full" style={{ filter: 'grayscale(70%) brightness(0.7)' }} />
        </div>
        <div className="floating stagger-4 absolute bottom-1/3 right-[15%] opacity-20">
          <img src="https://images.unsplash.com/photo-1525869916826-972885c91c1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
            alt="Bear" className="w-48 h-48 object-cover rounded-full" style={{ filter: 'grayscale(70%) brightness(0.7)' }} />
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className="inline-block mb-6 px-4 py-1 rounded-full bg-apex-yellow text-apex-black text-sm font-medium animate-fade-in"
          >
            Because You Never Know... But You Probably Do.
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight animate-fade-up text-shadow-lg">
            Get Covered for the <span className="text-apex-red">Wildest</span> Ways to Go Out
          </h1>
          
          <p className="text-xl md:text-2xl text-white opacity-90 mb-8 animate-fade-up animate-delay-100">
            $9.99 per certificate – or get the full Apex Predator Pack for $49.99!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animate-delay-200">
            <Link 
              to="/plans" 
              className="inline-flex items-center justify-center gap-2 bg-apex-red text-white px-8 py-4 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <ShoppingCart size={20} />
              <span className="font-medium">Buy Your Certificate Now</span>
            </Link>
            
            <Link 
              to="/gallery" 
              className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Camera size={20} />
              <span className="font-medium">Post Your Adventure</span>
            </Link>
          </div>
        </div>
        
        <div className="mt-16 perspective max-w-lg mx-auto">
          <div className="relative w-full preserve-3d transition-all-500 hover:rotate-y-10 animate-scale-in animate-delay-300">
            <div className="premium-card rounded-2xl overflow-hidden shadow-glass p-6 backdrop-blur-md backface-hidden bg-black/40 border border-white/10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/60 mb-1">Apex Predator Certificates</div>
                  <div className="text-2xl font-bold text-white">Wildlife Shield</div>
                </div>
                <div className="h-12 w-12 rounded-full bg-apex-red flex items-center justify-center">
                  <span className="text-white font-bold">AP</span>
                </div>
              </div>
              
              <div className="space-y-4 mt-6">
                <div className="text-sm text-white/60">CERTIFICATE HOLDER</div>
                <div className="text-lg font-medium text-white">John Adventurer</div>
                
                <div className="flex gap-8">
                  <div>
                    <div className="text-sm text-white/60">TYPE</div>
                    <div className="text-base text-white">Shark Certificate</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60">VALID UNTIL</div>
                    <div className="text-base text-white">12 MONTHS</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-6 right-6">
                <div className="text-xs text-white/60">$50,000 accidental death benefit</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-apex-black clip-polygon z-10" />
    </div>
  );
};

export default Hero;
