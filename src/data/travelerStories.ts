
export interface TravelerStory {
  id: string;
  name: string;
  age: number;
  location: string;
  predator: string;
  story: string;
  image: string;
  likes: number;
  comments: number;
  timeAgo: string;
  verified: boolean;
  country: string;
  certificateType: string;
}

export const travelerStories: TravelerStory[] = [
  {
    id: '1',
    name: 'Jake Martinez',
    age: 24,
    location: 'Bali, Indonesia',
    predator: '🦈',
    story: 'Went shark cage diving in Bali yesterday! Certificate looked absolutely sick on my Instagram stories. Friends couldn\'t believe I actually did it. The $50K coverage gave me such peace of mind!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    likes: 234,
    comments: 18,
    timeAgo: '2h ago',
    verified: true,
    country: '🇮🇩',
    certificateType: 'Shark Insurance'
  },
  {
    id: '2',
    name: 'Emma Chen',
    age: 27,
    location: 'Cairns, Australia',
    predator: '🐊',
    story: 'Crocodile encounter while kayaking in the Daintree! Thank god I had my certificate. The croc was literally 2 meters away. Posted the whole thing on TikTok and it went viral! 🔥',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    likes: 456,
    comments: 32,
    timeAgo: '1d ago',
    verified: true,
    country: '🇦🇺',
    certificateType: 'Crocodile Insurance'
  },
  {
    id: '3',
    name: 'Alex Thompson',
    age: 22,
    location: 'Maasai Mara, Kenya',
    predator: '🦁',
    story: 'Safari group challenge complete! All 6 of us got lion insurance before our Kenya trip. Best decision ever - we saw lions up close during a walking safari. The certificate is now framed in my apartment! 🏆',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    likes: 189,
    comments: 24,
    timeAgo: '3d ago',
    verified: true,
    country: '🇰🇪',
    certificateType: 'Lion Insurance'
  },
  {
    id: '4',
    name: 'Sofia Rodriguez',
    age: 29,
    location: 'Banff, Canada',
    predator: '🐻',
    story: 'Bear encounter while hiking the Rockies! Came face to face with a grizzly on the trail. Having my bear insurance certificate made me feel so much more confident. Plus the photo with my cert got 1000+ likes! 📸',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    likes: 312,
    comments: 15,
    timeAgo: '5d ago',
    verified: true,
    country: '🇨🇦',
    certificateType: 'Bear Insurance'
  }
];
