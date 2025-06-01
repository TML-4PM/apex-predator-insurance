
import React from 'react';
import { Eye } from 'lucide-react';

const GalleryHeader = () => {
  return (
    <div className="pt-28 pb-16 bg-apex-lightgray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-apex-black mb-6 animate-fade-up">
            Predator Gallery
          </h1>
          <p className="text-xl text-apex-darkgray/70 mb-6 animate-fade-up animate-delay-100">
            Explore all 60 deadly predators from around the world
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-apex-red/10 text-apex-red text-sm animate-fade-up animate-delay-200">
            <Eye size={16} />
            <span>Choose your next adventure</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryHeader;
