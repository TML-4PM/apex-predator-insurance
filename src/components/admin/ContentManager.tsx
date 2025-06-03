
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Mail, 
  Share2, 
  Plus, 
  Edit, 
  Trash2,
  Send,
  Eye,
  Calendar
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'published';
  created_at: string;
  author: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'welcome' | 'receipt' | 'newsletter';
}

export default function ContentManager() {
  const [blogPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'Wildlife Safety Tips for Adventure Travelers',
      content: 'Essential safety guidelines for encountering wildlife...',
      status: 'published',
      created_at: '2024-01-15',
      author: 'Admin'
    },
    {
      id: '2',
      title: 'New Certificate Types Available',
      content: 'We\'re excited to announce new certificate options...',
      status: 'draft',
      created_at: '2024-01-14',
      author: 'Admin'
    }
  ]);

  const [emailTemplates] = useState<EmailTemplate[]>([
    {
      id: '1',
      name: 'Welcome Email',
      subject: 'Welcome to Wildlife Shield Insurance!',
      content: 'Thank you for joining Wildlife Shield...',
      type: 'welcome'
    },
    {
      id: '2',
      name: 'Receipt Template',
      subject: 'Your Purchase Receipt',
      content: 'Thank you for your purchase...',
      type: 'receipt'
    }
  ]);

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    status: 'draft' as const
  });

  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Content
        </Button>
      </div>

      <Tabs defaultValue="blog" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="email">Email Templates</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="seo">SEO Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="blog" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Blog Posts List */}
            <Card>
              <CardHeader>
                <CardTitle>Blog Posts</CardTitle>
                <CardDescription>Manage your blog content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{post.title}</h3>
                        <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                          {post.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {post.content.substring(0, 100)}...
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>By {post.author} on {post.created_at}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Create New Post */}
            <Card>
              <CardHeader>
                <CardTitle>Create New Post</CardTitle>
                <CardDescription>Add content to your blog</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Post title"
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                />
                <Textarea
                  placeholder="Post content"
                  rows={8}
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                />
                <div className="flex justify-between">
                  <Button variant="outline">Save Draft</Button>
                  <Button>Publish</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Email Templates List */}
            <Card>
              <CardHeader>
                <CardTitle>Email Templates</CardTitle>
                <CardDescription>Manage automated email content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emailTemplates.map((template) => (
                    <div 
                      key={template.id} 
                      className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{template.name}</h3>
                        <Badge variant="outline">{template.type}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{template.subject}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Template Editor */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedTemplate ? 'Edit Template' : 'Select Template'}
                </CardTitle>
                <CardDescription>
                  {selectedTemplate ? 'Modify email template content' : 'Choose a template to edit'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedTemplate ? (
                  <>
                    <Input
                      placeholder="Template name"
                      value={selectedTemplate.name}
                      readOnly
                    />
                    <Input
                      placeholder="Email subject"
                      value={selectedTemplate.subject}
                    />
                    <Textarea
                      placeholder="Email content"
                      rows={10}
                      value={selectedTemplate.content}
                    />
                    <div className="flex justify-between">
                      <Button variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline">
                          <Send className="h-4 w-4 mr-2" />
                          Test Send
                        </Button>
                        <Button>Save Changes</Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select a template from the list to start editing</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Management</CardTitle>
              <CardDescription>Schedule and manage social media content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Create Social Post</h3>
                  <Textarea placeholder="What's happening with Wildlife Shield?" rows={4} />
                  <div className="flex justify-between">
                    <Button variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                    <Button>
                      <Share2 className="h-4 w-4 mr-2" />
                      Post Now
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Scheduled Posts</h3>
                  <div className="space-y-2">
                    <div className="border rounded p-3">
                      <p className="text-sm">New adventure certificates available!</p>
                      <p className="text-xs text-gray-500">Scheduled for tomorrow 9:00 AM</p>
                    </div>
                    <div className="border rounded p-3">
                      <p className="text-sm">Wildlife safety tip of the week...</p>
                      <p className="text-xs text-gray-500">Scheduled for Friday 3:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Tools</CardTitle>
              <CardDescription>Optimize content for search engines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Keyword Research</h3>
                  <Input placeholder="Enter keywords to research" />
                  <Button className="w-full">Analyze Keywords</Button>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Suggested Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">wildlife insurance</Badge>
                      <Badge variant="outline">adventure travel</Badge>
                      <Badge variant="outline">survival certificates</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">SEO Performance</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Organic Traffic</span>
                      <span className="text-sm font-medium">+15.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Keyword Rankings</span>
                      <span className="text-sm font-medium">147 keywords</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Page Load Speed</span>
                      <span className="text-sm font-medium">2.3s avg</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
