
# API Documentation

## Supabase Edge Functions

### Authentication Required
All edge functions require authentication unless specified otherwise. Include the `Authorization: Bearer <token>` header with a valid Supabase JWT.

### Payment Functions

#### Create Payment Intent
Creates a Stripe payment intent for order processing.

```typescript
POST /functions/v1/create-payment-intent

Headers:
  Authorization: Bearer <supabase-jwt>
  Content-Type: application/json

Body:
{
  "amount": number,           // Amount in cents
  "currency": string,         // Currency code (default: "usd")
  "planId": string,          // Product/plan identifier
  "planName": string,        // Human-readable plan name
  "customerEmail": string,    // Customer email address
  "customerName": string,     // Customer full name
  "isBundle"?: boolean       // Whether this is a bundle purchase
}

Response:
{
  "clientSecret": string,     // Stripe client secret for frontend
  "orderId": string          // Internal order ID
}

Errors:
- 400: Missing required fields
- 401: Authentication required
- 500: Internal server error
```

#### Create Donation Session
Creates a Stripe checkout session for donations.

```typescript
POST /functions/v1/create-donation-session

Headers:
  Authorization: Bearer <supabase-jwt>
  Content-Type: application/json

Body:
{
  "amount": number,          // Donation amount in cents
  "currency": string,        // Currency code (default: "usd")
  "donorEmail": string,      // Donor email address
  "donorName"?: string,      // Optional donor name
  "message"?: string         // Optional donation message
}

Response:
{
  "sessionId": string,       // Stripe session ID
  "url": string             // Checkout URL
}
```

#### Webhook Handler
Processes Stripe webhooks for payment completion.

```typescript
POST /functions/v1/webhook-handler

Headers:
  Stripe-Signature: <stripe-signature>
  Content-Type: application/json

Body: <stripe-webhook-payload>

Response:
{
  "received": boolean
}

Note: This endpoint does not require authentication
```

### Content Generation Functions

#### Generate Risk Card
Generates dynamic certificate images.

```typescript
POST /functions/v1/generate-risk-card

Headers:
  Authorization: Bearer <supabase-jwt>
  Content-Type: application/json

Body:
{
  "animalName": string,      // Name of the animal
  "userDetails": {
    "name": string,
    "email": string,
    "location"?: string
  },
  "certificateType": string, // Type of certificate
  "dangerLevel"?: number,    // Danger level (1-5)
  "customizations"?: {
    "backgroundColor": string,
    "textColor": string,
    "logoUrl": string
  }
}

Response:
{
  "imageUrl": string,        // URL to generated image
  "certificateId": string    // Database certificate ID
}
```

### Notification Functions

#### Get User Notifications
Retrieves user notifications with profile data.

```typescript
GET /functions/v1/get-user-notifications

Headers:
  Authorization: Bearer <supabase-jwt>

Query Parameters:
  limit?: number            // Number of notifications (default: 50)
  offset?: number          // Pagination offset (default: 0)
  unread_only?: boolean    // Only unread notifications (default: false)

Response:
{
  "notifications": [
    {
      "id": string,
      "type": string,
      "title": string,
      "message": string,
      "read": boolean,
      "created_at": string,
      "from_user": {
        "username": string,
        "avatar_url": string
      } | null
    }
  ],
  "total_count": number,
  "unread_count": number
}
```

### Content Automation Functions

#### Crawl Content
Automatically discovers and processes content from external sources.

```typescript
POST /functions/v1/crawl-content

Headers:
  Authorization: Bearer <supabase-jwt>
  Content-Type: application/json

Body:
{
  "platform": string,       // Platform to crawl (e.g., "reddit", "twitter")
  "sourceId": string,       // Platform-specific source identifier
  "keywords"?: string[],    // Keywords to filter content
  "limit"?: number         // Maximum items to process
}

Response:
{
  "processed": number,      // Number of items processed
  "created": number,       // Number of new items created
  "skipped": number,       // Number of items skipped
  "errors": string[]       // Any errors encountered
}
```

#### Process Content AI
Uses AI to analyze and categorize content.

```typescript
POST /functions/v1/process-content-ai

Headers:
  Authorization: Bearer <supabase-jwt>
  Content-Type: application/json

Body:
{
  "contentId": string,      // ID of content to process
  "analysisType": string,   // Type of analysis ("sentiment", "categorization", "moderation")
  "options"?: {
    "model": string,        // AI model to use
    "temperature": number,  // Model temperature setting
    "maxTokens": number    // Maximum tokens for response
  }
}

Response:
{
  "analysis": {
    "sentiment"?: {
      "score": number,      // Sentiment score (-1 to 1)
      "label": string      // Sentiment label
    },
    "categories"?: string[], // Detected categories
    "moderation"?: {
      "flagged": boolean,   // Whether content is flagged
      "reasons": string[]   // Reasons for flagging
    }
  },
  "confidence": number,     // Confidence score (0-1)
  "updated": boolean       // Whether content was updated
}
```

## Database API Patterns

### Authentication
All database operations require proper authentication and respect Row Level Security policies.

```typescript
// Initialize Supabase client
import { supabase } from '@/integrations/supabase/client';

// User must be authenticated for protected operations
const { data: { user } } = await supabase.auth.getUser();
if (!user) throw new Error('Authentication required');
```

### User Profile Operations

#### Get User Profile
```typescript
const { data: profile, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('user_id', userId)
  .single();
```

#### Update User Profile
```typescript
const { error } = await supabase
  .from('profiles')
  .update({
    username: 'newusername',
    full_name: 'New Full Name',
    bio: 'Updated bio'
  })
  .eq('user_id', userId);
```

### Community Content Operations

#### Create Community Post
```typescript
const { data, error } = await supabase
  .from('community_posts')
  .insert({
    user_id: userId,
    content: 'Post content',
    image_url: 'optional-image-url',
    location: 'Optional location'
  })
  .select()
  .single();
```

#### Get Community Posts with User Data
```typescript
const { data: posts, error } = await supabase
  .from('community_posts')
  .select(`
    *,
    profiles:user_id (
      username,
      avatar_url,
      full_name
    ),
    post_likes (
      user_id
    )
  `)
  .order('created_at', { ascending: false })
  .limit(20);
```

#### Toggle Post Like
```typescript
const { data: existingLike } = await supabase
  .from('post_likes')
  .select('id')
  .eq('post_id', postId)
  .eq('user_id', userId)
  .single();

if (existingLike) {
  // Remove like
  await supabase
    .from('post_likes')
    .delete()
    .eq('post_id', postId)
    .eq('user_id', userId);
} else {
  // Add like
  await supabase
    .from('post_likes')
    .insert({
      post_id: postId,
      user_id: userId
    });
}
```

### Order and Certificate Operations

#### Create Order
```typescript
const { data: order, error } = await supabase
  .from('orders')
  .insert({
    user_id: userId,
    customer_email: 'customer@example.com',
    customer_name: 'Customer Name',
    plan_id: 'plan_shark_basic',
    plan_name: 'Shark Attack Basic',
    amount: 999, // $9.99 in cents
    currency: 'usd',
    status: 'pending'
  })
  .select()
  .single();
```

#### Get User Certificates
```typescript
const { data: certificates, error } = await supabase
  .from('user_certificates')
  .select(`
    *,
    orders (
      plan_name,
      created_at
    )
  `)
  .eq('user_id', userId)
  .order('created_at', { ascending: false });
```

### Real-time Subscriptions

#### Activity Feed Subscription
```typescript
const activityChannel = supabase
  .channel('activity-feed')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'activity_feeds'
    },
    (payload) => {
      console.log('New activity:', payload.new);
      // Update UI with new activity
    }
  )
  .subscribe();
```

#### Chat Message Subscription
```typescript
const chatChannel = supabase
  .channel(`chat-${conversationId}`)
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'chat_messages',
      filter: `conversation_id=eq.${conversationId}`
    },
    (payload) => {
      console.log('New message:', payload.new);
      // Add message to chat UI
    }
  )
  .subscribe();

// Remember to unsubscribe
return () => {
  supabase.removeChannel(activityChannel);
  supabase.removeChannel(chatChannel);
};
```

### User Presence Tracking

#### Track User Presence
```typescript
const presenceChannel = supabase.channel('user_presence');

const userPresence = {
  user_id: userId,
  username: profile.username,
  avatar_url: profile.avatar_url,
  status: 'online',
  last_seen: new Date().toISOString()
};

presenceChannel
  .on('presence', { event: 'sync' }, () => {
    const state = presenceChannel.presenceState();
    const onlineUsers = Object.values(state).flat();
    console.log('Online users:', onlineUsers);
  })
  .on('presence', { event: 'join' }, ({ newPresences }) => {
    console.log('User joined:', newPresences);
  })
  .on('presence', { event: 'leave' }, ({ leftPresences }) => {
    console.log('User left:', leftPresences);
  })
  .subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      await presenceChannel.track(userPresence);
    }
  });
```

## Error Handling

### Standard Error Responses
```typescript
// Supabase errors
interface SupabaseError {
  message: string;
  details: string;
  hint: string;
  code: string;
}

// Edge function errors
interface EdgeFunctionError {
  error: string;
  message: string;
  details?: any;
}
```

### Common Error Codes
- `PGRST116`: Row Level Security violation
- `23505`: Unique constraint violation
- `23503`: Foreign key constraint violation
- `42P01`: Table does not exist
- `42703`: Column does not exist

### Error Handling Patterns
```typescript
try {
  const { data, error } = await supabase
    .from('table')
    .select('*');
    
  if (error) {
    console.error('Database error:', error);
    // Handle specific error types
    if (error.code === 'PGRST116') {
      // Handle RLS violation
    }
    throw error;
  }
  
  return data;
} catch (error) {
  // Handle network errors, etc.
  console.error('Unexpected error:', error);
  throw error;
}
```

## Rate Limiting

### Default Limits
- Edge Functions: 100 requests per minute per user
- Database operations: 500 requests per minute per user
- Real-time subscriptions: 100 concurrent connections per user

### Implementing Client-side Rate Limiting
```typescript
import { RateLimiter } from 'limiter';

const limiter = new RateLimiter({
  tokensPerInterval: 10,
  interval: 'minute'
});

const makeRequest = async () => {
  const canProceed = await limiter.removeTokens(1);
  if (!canProceed) {
    throw new Error('Rate limit exceeded');
  }
  
  // Make the actual request
  return supabase.from('table').select('*');
};
```

This API documentation provides comprehensive coverage of all endpoints and common database operation patterns used throughout the application.
