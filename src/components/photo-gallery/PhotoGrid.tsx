
import React from 'react';
import ImageWithFallback from '@/components/ImageWithFallback';

interface GalleryItem {
  id: number;
  username: string;
  location: string;
  caption: string;
  insurance: string;
  likes: number;
  comments: number;
  imageUrl: string;
}

interface PhotoGridProps {
  items: GalleryItem[];
  onPhotoClick: (id: number) => void;
}

const PhotoGrid = ({ items, onPhotoClick }: PhotoGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <div 
          key={item.id}
          className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
          onClick={() => onPhotoClick(item.id)}
        >
          <div className="aspect-square overflow-hidden">
            <ImageWithFallback
              src={item.imageUrl}
              alt={item.caption}
              category="marine"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <h3 className="text-white font-bold">{item.username}</h3>
            <p className="text-white/80 text-sm">{item.location}</p>
            <div className="flex items-center mt-2">
              <span className="bg-apex-red text-white text-xs px-2 py-1 rounded-full">{item.insurance}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;
