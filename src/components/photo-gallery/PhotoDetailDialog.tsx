
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Heart, MessageCircle, Share2 } from 'lucide-react';
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

interface PhotoDetailDialogProps {
  selectedPhoto: GalleryItem | undefined;
  isOpen: boolean;
  onClose: () => void;
  likedPosts: Record<number, boolean>;
  onToggleLike: (id: number) => void;
  onShare: () => void;
}

const PhotoDetailDialog = ({ 
  selectedPhoto, 
  isOpen, 
  onClose, 
  likedPosts, 
  onToggleLike, 
  onShare 
}: PhotoDetailDialogProps) => {
  if (!selectedPhoto) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="aspect-square overflow-hidden rounded-lg">
            <ImageWithFallback
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.caption}
              category="marine"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{selectedPhoto.username}</span>
                <span className="bg-apex-red text-white text-xs px-2 py-1 rounded-full">{selectedPhoto.insurance}</span>
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {selectedPhoto.location}
              </DialogDescription>
            </DialogHeader>
            
            <p className="my-4 text-apex-darkgray/80">{selectedPhoto.caption}</p>
            
            <div className="mt-auto pt-4 border-t flex justify-between items-center">
              <button 
                className="flex items-center gap-1 text-apex-darkgray/60 hover:text-apex-red transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleLike(selectedPhoto.id);
                }}
              >
                <Heart 
                  size={18} 
                  className={likedPosts[selectedPhoto.id] ? "fill-apex-red text-apex-red" : ""} 
                />
                <span>{likedPosts[selectedPhoto.id] ? selectedPhoto.likes + 1 : selectedPhoto.likes}</span>
              </button>
              
              <button className="flex items-center gap-1 text-apex-darkgray/60 hover:text-apex-darkgray transition-colors">
                <MessageCircle size={18} />
                <span>{selectedPhoto.comments}</span>
              </button>
              
              <button
                className="flex items-center gap-1 text-apex-darkgray/60 hover:text-apex-red transition-colors"
                onClick={onShare}
              >
                <Share2 size={18} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoDetailDialog;
