
# Apex Predator Insurance 🦈

A satirical insurance platform for adventurers who encounter predators in the wild. Built with modern web technologies and real-time features.

## 🎯 Project Overview

Apex Predator Insurance is a full-stack web application that provides "insurance coverage" for wildlife encounters. The platform features certificate generation, community sharing, real-time chat, and a complete e-commerce system.

### Live Demo
- **Production**: [apexpredatorinsurance.com](https://apexpredatorinsurance.com)
- **Staging**: Available via Lovable deployment

### Key Features
- 🏆 Certificate generation with social sharing
- 💬 Real-time community features and chat
- 💳 Stripe payment integration
- 📱 Progressive Web App (PWA) with offline support
- 🌍 Interactive world map with danger zones
- 📊 Admin dashboard with analytics
- 🔄 Real-time activity feeds and notifications

## 🏗️ Technical Architecture

### Frontend Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with code splitting
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state
- **Routing**: React Router v6 with lazy loading
- **Performance**: Code splitting, lazy loading, image optimization

### Backend Infrastructure
- **Database**: Supabase PostgreSQL with 40+ tables
- **Authentication**: Supabase Auth with social providers
- **Real-time**: Supabase real-time subscriptions
- **Edge Functions**: Deno-based serverless functions
- **File Storage**: Supabase Storage (not currently in use)

### Third-Party Integrations
- **Payments**: Stripe with multiple payment methods
- **Maps**: Custom world map implementation
- **Charts**: Recharts for analytics
- **PWA**: Service worker with caching strategies

## 📊 Database Schema

### Core Tables
```sql
-- User Management
profiles (user_id, username, full_name, avatar_url, bio)
user_roles (user_id, role) -- admin, moderator, user

-- Product System
products (id, name, category, price, danger_level, rarity)
bundle_products (id, name, animal_count, base_price, savings)
wholesale_tiers (id, tier_name, min_quantity, price_per_unit)

-- Order Management
orders (id, user_id, amount, items, status, stripe_session_id)
user_certificates (id, user_id, certificate_data, certificate_type)

-- Community Features
community_posts (id, user_id, content, image_url, location)
adventure_stories (id, user_id, title, content, predator_type)
post_likes (id, post_id, user_id)
post_comments (id, post_id, user_id, content, parent_comment_id)

-- Real-time Features
chat_conversations (id, name, is_group, created_by)
chat_messages (id, conversation_id, sender_id, content)
activity_feeds (id, user_id, activity_type, target_id, metadata)

-- Analytics & Monitoring
site_audits (id, domain, results, performance_score)
audit_metrics (id, metric_type, metric_value, page_url)
```

### Key Relationships
```sql
-- User to content relationship
profiles.user_id -> auth.users.id (references Supabase auth)

-- Order to certificate relationship
user_certificates.order_id -> orders.id

-- Community hierarchy
post_comments.parent_comment_id -> post_comments.id (self-referencing)
chat_messages.reply_to_id -> chat_messages.id (threading)

-- Activity tracking
activity_feeds.target_id -> various tables (polymorphic)
```

## 🔧 TypeScript Schemas

### Core Interfaces
```typescript
// Product System
interface Product {
  id: string;
  name: string;
  category: 'terrestrial' | 'marine' | 'aerial' | 'reptile' | 'insect';
  base_price: number;
  danger_level: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'mythic';
}

// Community System
interface CommunityPost {
  id: string;
  user_id: string;
  content: string;
  image_url?: string;
  location?: string;
  likes_count: number;
  comments_count: number;
  user_profile?: UserProfile;
  is_liked?: boolean;
}

// Chat System
interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'image' | 'file';
  reply_to_id?: string;
  sender_profile?: UserProfile;
}
```

### Validation Schemas (Zod)
```typescript
// Checkout form validation
const checkoutSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
});

// Product creation validation
const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  category: z.enum(['terrestrial', 'marine', 'aerial', 'reptile', 'insect']),
  price: z.number().min(0, "Price must be positive"),
  danger_level: z.number().min(1).max(5),
});
```

## 🚀 Development Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account and project
- Stripe account for payments

### Environment Variables
Create a `.env.local` file:
```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Installation & Setup
```bash
# Clone the repository
git clone <repository-url>
cd apex-predator-insurance

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Database Setup
1. Create a new Supabase project
2. Run the SQL migrations from `supabase/functions/_shared/database.sql`
3. Enable real-time on required tables
4. Configure Row Level Security (RLS) policies

### Supabase Edge Functions
The project includes several edge functions:
- `create-payment-intent`: Stripe payment processing
- `create-donation-session`: Donation handling
- `webhook-handler`: Stripe webhook processing
- `generate-risk-card`: Dynamic image generation

## 🌐 Deployment

### Lovable Deployment (Recommended)
1. Click "Publish" in the Lovable interface
2. Configure custom domain in project settings
3. Set up environment variables in deployment settings

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Configure environment variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
vercel env add VITE_STRIPE_PUBLISHABLE_KEY
```

### Custom Domain Configuration
For AWS Route 53 DNS setup:
```
# Root domain (apexpredatorinsurance.com)
Type: A
Name: (empty)
Value: 76.76.21.21 (Vercel IP)

# WWW subdomain
Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

## 🎨 Component Architecture

### UI Components (shadcn/ui)
```
src/components/ui/
├── button.tsx          # Base button component
├── card.tsx            # Card containers
├── dialog.tsx          # Modal dialogs
├── form.tsx            # Form components
└── toast.tsx           # Notification system
```

### Feature Components
```
src/components/
├── auth/               # Authentication components
├── chat/               # Real-time chat system
├── community/          # Social features
├── product/            # E-commerce components
├── admin/              # Admin dashboard
└── mobile/             # Mobile-specific components
```

### Page Components
```
src/pages/
├── Index.tsx           # Landing page
├── Gallery.tsx         # Animal gallery
├── Store.tsx           # Product catalog
├── Dashboard.tsx       # User dashboard
└── AdminPortal.tsx     # Admin interface
```

## 🔄 Real-time Features

### Activity Feed Implementation
```typescript
const { activities, createActivity } = useActivityFeed();

// Create activity
createActivity('certificate_generated', certificateId, 'certificate', {
  animalName: 'Great White Shark',
  location: 'Australia'
});

// Real-time subscription
useEffect(() => {
  const channel = supabase
    .channel('activity-feed-changes')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'activity_feeds',
    }, handleNewActivity)
    .subscribe();

  return () => supabase.removeChannel(channel);
}, []);
```

### Chat System
```typescript
const { conversations, messages, sendMessage } = useRealTimeChat();

// Send message
sendMessage(conversationId, 'Hello, fellow adventurer!');

// Real-time message updates
const channel = supabase
  .channel(`chat-${conversationId}`)
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'chat_messages',
    filter: `conversation_id=eq.${conversationId}`,
  }, handleNewMessage)
  .subscribe();
```

## 💳 Payment Integration

### Stripe Configuration
```typescript
// Stripe Elements setup
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

// Payment Intent creation
const { clientSecret } = await supabase.functions.invoke('create-payment-intent', {
  body: {
    amount: totalAmount,
    currency: 'usd',
    planId,
    customerEmail,
  }
});

// Webhook handling for payment completion
await supabase.functions.invoke('webhook-handler', {
  body: stripeEvent
});
```

## 🔒 Security & Authentication

### Row Level Security (RLS)
```sql
-- Users can only see their own data
CREATE POLICY "Users own data" ON profiles
  FOR ALL USING (auth.uid() = user_id);

-- Public read access for community content
CREATE POLICY "Public read access" ON community_posts
  FOR SELECT USING (true);

-- Authenticated users can create content
CREATE POLICY "Authenticated create" ON community_posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### Authentication Flow
1. User signs up/logs in via Supabase Auth
2. Profile automatically created via database trigger
3. JWT token stored in browser
4. RLS policies enforce data access rules

## 📱 PWA Features

### Service Worker
- Offline page caching
- Background sync for failed requests
- Push notification support (configured)
- App install prompts

### Manifest Configuration
```json
{
  "name": "Apex Predator Insurance",
  "short_name": "Apex Insurance",
  "display": "standalone",
  "theme_color": "#dc2626",
  "background_color": "#ffffff"
}
```

## 🧪 Testing & Quality

### Code Quality Tools
- TypeScript for type safety
- ESLint for code standards
- Prettier for formatting (configured)
- Husky for git hooks (not configured)

### Performance Monitoring
- Code splitting with React.lazy()
- Image optimization with lazy loading
- Bundle analysis available
- Core Web Vitals tracking

## 🛠️ Maintenance & Monitoring

### Database Maintenance
```sql
-- Update trending scores (scheduled)
SELECT update_trending_scores();

-- Calculate viral metrics
SELECT update_viral_scores();

-- Clean old audit data
DELETE FROM audit_metrics WHERE recorded_at < NOW() - INTERVAL '30 days';
```

### Monitoring Endpoints
- Site audit system for health checks
- Performance metrics collection
- Error boundary implementation
- Real-time user presence tracking

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make changes following TypeScript/React best practices
4. Test thoroughly in development environment
5. Submit pull request with detailed description

### Code Standards
- Use TypeScript strict mode
- Follow React functional component patterns
- Implement proper error boundaries
- Use shadcn/ui components when possible
- Keep components under 100 lines when practical

### Database Changes
1. Create migration SQL files
2. Test migrations on development database
3. Update TypeScript interfaces
4. Update RLS policies if needed
5. Document schema changes

## 📚 API Documentation

### Supabase Functions
```typescript
// Create payment intent
POST /functions/v1/create-payment-intent
Body: { amount: number, currency: string, planId: string }
Returns: { clientSecret: string }

// Generate certificate
POST /functions/v1/generate-risk-card
Body: { animalName: string, userDetails: object }
Returns: { imageUrl: string }

// Process webhook
POST /functions/v1/webhook-handler
Body: Stripe webhook payload
Returns: { received: boolean }
```

### Database Query Patterns
```typescript
// Fetch user's certificates
const { data } = await supabase
  .from('user_certificates')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false });

// Create community post
const { error } = await supabase
  .from('community_posts')
  .insert({
    user_id: userId,
    content,
    image_url: imageUrl,
    location
  });

// Real-time subscription
const channel = supabase
  .channel('posts')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'community_posts'
  }, callback)
  .subscribe();
```

## 🚨 Troubleshooting

### Common Issues

**Build Failures**
- Check TypeScript errors: `npm run type-check`
- Verify all imports are correctly typed
- Ensure environment variables are set

**Database Connection Issues**
- Verify Supabase URL and anon key
- Check RLS policies for data access
- Ensure user authentication is working

**Payment Integration Problems**
- Verify Stripe keys in environment
- Check webhook endpoint configuration
- Monitor Stripe dashboard for errors

**Real-time Features Not Working**
- Enable real-time on tables in Supabase
- Check channel subscription setup
- Verify RLS policies allow real-time access

### Performance Issues
- Use React DevTools Profiler
- Check bundle size with `npm run build`
- Monitor Core Web Vitals
- Optimize images and lazy loading

### DNS Configuration (AWS Route 53)
If your custom domain isn't working:
1. Verify A record points to correct IP
2. Check CNAME configuration for www
3. Allow 24-48 hours for DNS propagation
4. Test with DNS checker tools

## 📖 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Integration Guide](https://stripe.com/docs/payments)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

## 📄 License

This project is for educational and demonstration purposes. Please ensure compliance with all applicable laws and regulations if deploying commercially.

---

**Built with ❤️ using modern web technologies**

For support or questions, please check the troubleshooting section above or contact the development team.
