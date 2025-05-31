
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Link, Camera } from 'lucide-react';
import { useOopsies } from '@/hooks/useOopsies';
import type { OopsieSubmission } from '@/types/oopsie';

const OopsieSubmissionForm = () => {
  const [submission, setSubmission] = useState<OopsieSubmission>({
    title: '',
    description: '',
    category: 'other'
  });
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file');
  const [imageUrl, setImageUrl] = useState('');
  const { submitOopsie, submitting } = useOopsies();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSubmission(prev => ({
        ...prev,
        image_file: file
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalSubmission = {
      ...submission,
      image_url: uploadMethod === 'url' ? imageUrl : undefined
    };

    const success = await submitOopsie(finalSubmission);
    if (success) {
      setSubmission({
        title: '',
        description: '',
        category: 'other'
      });
      setImageUrl('');
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="text-apex-red" />
          Share Your Oopsie
        </CardTitle>
        <p className="text-apex-darkgray/70">
          Did something go hilariously wrong? Share your adventure mishap with our community!
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Oopsie Title*</Label>
            <Input
              id="title"
              value={submission.title}
              onChange={(e) => setSubmission(prev => ({ ...prev, title: e.target.value }))}
              placeholder="What went wrong? (e.g., 'AI predicted I'd be safe from bears')"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="category">Category*</Label>
            <Select
              value={submission.category}
              onValueChange={(value: any) => setSubmission(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ai_fail">AI Prediction Fail</SelectItem>
                <SelectItem value="adventure_gone_wrong">Adventure Gone Wrong</SelectItem>
                <SelectItem value="insurance_claim">Actual Insurance Claim</SelectItem>
                <SelectItem value="wildlife_encounter">Wildlife Encounter</SelectItem>
                <SelectItem value="equipment_failure">Equipment Failure</SelectItem>
                <SelectItem value="other">Other Oopsie</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Tell Your Story*</Label>
            <Textarea
              id="description"
              value={submission.description}
              onChange={(e) => setSubmission(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Share the full story of what happened. The funnier, the better!"
              required
              className="mt-1 min-h-[120px]"
            />
          </div>

          <div>
            <Label>Add Photo/Video Evidence</Label>
            <div className="mt-2 space-y-4">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={uploadMethod === 'file' ? 'default' : 'outline'}
                  onClick={() => setUploadMethod('file')}
                  className="flex-1"
                >
                  <Upload size={16} className="mr-2" />
                  Upload File
                </Button>
                <Button
                  type="button"
                  variant={uploadMethod === 'url' ? 'default' : 'outline'}
                  onClick={() => setUploadMethod('url')}
                  className="flex-1"
                >
                  <Link size={16} className="mr-2" />
                  Image URL
                </Button>
              </div>

              {uploadMethod === 'file' ? (
                <Input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-apex-red/10 file:text-apex-red hover:file:bg-apex-red/20"
                />
              ) : (
                <Input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/your-oopsie-image.jpg"
                />
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting || !submission.title || !submission.description}
            className="w-full bg-apex-red hover:bg-apex-red/90"
          >
            {submitting ? 'Submitting...' : 'Share My Oopsie'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default OopsieSubmissionForm;
