
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  MapPin, 
  Award, 
  Plus,
  X,
  Upload
} from 'lucide-react';
import { useAdventureStories } from '@/hooks/useAdventureStories';
import { useActivityFeed } from '@/hooks/useActivityFeed';

const CreateAdventureStory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [predatorType, setPredatorType] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [certificateId, setCertificateId] = useState('');

  const { createStory, isCreatingStory } = useAdventureStories();
  const { createActivity } = useActivityFeed();

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;

    createStory(title, content, predatorType, location, imageUrls, certificateId);
    
    // Create activity feed entry
    createActivity('story', undefined, 'story', {
      story_title: title,
      predator_type: predatorType,
      location,
      description: content.slice(0, 100) + (content.length > 100 ? '...' : '')
    });

    // Reset form
    setTitle('');
    setContent('');
    setPredatorType('');
    setLocation('');
    setImageUrls([]);
    setCertificateId('');
    setIsOpen(false);
  };

  const addImageUrl = () => {
    const url = prompt('Enter image URL:');
    if (url && url.trim()) {
      setImageUrls([...imageUrls, url.trim()]);
    }
  };

  const removeImageUrl = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  if (!isOpen) {
    return (
      <Card className="mb-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setIsOpen(true)}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Camera className="w-5 h-5" />
            <span>Share your predator encounter story...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Share Your Adventure Story
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="story-title">Story Title</Label>
          <Input
            id="story-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your adventure story a compelling title..."
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="story-content">Your Story</Label>
          <Textarea
            id="story-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tell us about your encounter! What happened? How did you feel? What did you learn?"
            className="mt-1 min-h-[120px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="predator-type">Predator Type</Label>
            <Input
              id="predator-type"
              value={predatorType}
              onChange={(e) => setPredatorType(e.target.value)}
              placeholder="e.g., Great White Shark, Grizzly Bear"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Where did this happen?"
                className="mt-1 pl-10"
              />
            </div>
          </div>
        </div>

        <div>
          <Label>Images</Label>
          <div className="mt-1 space-y-2">
            {imageUrls.map((url, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                <img src={url} alt={`Preview ${index + 1}`} className="w-12 h-12 object-cover rounded" />
                <span className="flex-1 text-sm truncate">{url}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeImageUrl(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={addImageUrl}
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              Add Image URL
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="certificate-id">Related Certificate ID (Optional)</Label>
          <div className="relative">
            <Award className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
            <Input
              id="certificate-id"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              placeholder="Link to your certificate for this encounter"
              className="mt-1 pl-10"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {content.length}/1000 characters
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!title.trim() || !content.trim() || isCreatingStory}
            >
              {isCreatingStory ? 'Sharing...' : 'Share Story'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateAdventureStory;
