
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Shield, ShoppingCart, Check, Globe, MapPin, Search } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Complete list of 60 deadly animal insurance plans with their respective countries
const fullInsurancePlans = [
  {
    id: 'boxjellyfish',
    name: 'Box Jellyfish Insurance',
    icon: '🪼',
    price: 9.99,
    description: 'Protection against the world\'s most venomous marine creature.',
    location: 'Australia, Philippines',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Box Jellyfish Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'inlandtaipan',
    name: 'Inland Taipan Insurance',
    icon: '🐍',
    price: 9.99,
    description: 'Coverage for encounters with the world\'s most venomous snake.',
    location: 'Australia',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Taipan Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'saltwatercroc',
    name: 'Saltwater Crocodile Insurance',
    icon: '🐊',
    price: 9.99,
    description: 'For those brave enough to swim in croc-infested waters.',
    location: 'Australia, Southeast Asia',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Crocodile Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'blueringedoctopus',
    name: 'Blue-ringed Octopus Insurance',
    icon: '🐙',
    price: 9.99,
    description: 'Coverage for the tiny but deadly ocean predator.',
    location: 'Australia, Japan, Philippines',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Octopus Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'conesnail',
    name: 'Cone Snail Insurance',
    icon: '🐌',
    price: 9.99,
    description: 'Protection from one of the ocean\'s most venomous gastropods.',
    location: 'Australia, Indo-Pacific',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Cone Snail Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'stonefish',
    name: 'Stonefish Insurance',
    icon: '🐡',
    price: 9.99,
    description: 'Coverage for the world\'s most venomous fish that looks like a rock.',
    location: 'Australia, Indo-Pacific',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Stonefish Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'funnelwebspider',
    name: 'Sydney Funnel-web Spider Insurance',
    icon: '🕷️',
    price: 9.99,
    description: 'For those venturing into Sydney\'s spider territory.',
    location: 'Australia',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Spider Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'easternbrownsnake',
    name: 'Eastern Brown Snake Insurance',
    icon: '🐍',
    price: 9.99,
    description: 'Coverage for Australia\'s second most venomous land snake.',
    location: 'Australia',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Snake Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'redbackspider',
    name: 'Redback Spider Insurance',
    icon: '🕷️',
    price: 9.99,
    description: 'For those encountering Australia\'s notorious black widow cousin.',
    location: 'Australia',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Spider Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'tigersnake',
    name: 'Tiger Snake Insurance',
    icon: '🐍',
    price: 9.99,
    description: 'Protection for those in tiger snake territory.',
    location: 'Australia',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Snake Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'deathstalker',
    name: 'Deathstalker Scorpion Insurance',
    icon: '🦂',
    price: 9.99,
    description: 'Coverage for encounters with the world\'s deadliest scorpion.',
    location: 'Middle East, North Africa',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Scorpion Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'sawscaledviper',
    name: 'Saw-scaled Viper Insurance',
    icon: '🐍',
    price: 9.99,
    description: 'For those in regions where these deadly vipers roam.',
    location: 'India, Middle East',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Viper Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'indiancobra',
    name: 'Indian Cobra Insurance',
    icon: '🐍',
    price: 9.99,
    description: 'Coverage for encounters with India\'s iconic venomous snake.',
    location: 'India, South Asia',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Cobra Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'kingcobra',
    name: 'King Cobra Insurance',
    icon: '🐍',
    price: 9.99,
    description: 'Protection against the world\'s longest venomous snake.',
    location: 'India, Southeast Asia',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun King Cobra Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'blackmamba',
    name: 'Black Mamba Insurance',
    icon: '🐍',
    price: 9.99,
    description: 'Coverage for Africa\'s deadliest snake.',
    location: 'Africa',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Black Mamba Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'puffadder',
    name: 'Puff Adder Insurance',
    icon: '🐍',
    price: 9.99,
    description: 'For those venturing into puff adder territory.',
    location: 'Africa',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Adder Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'lion',
    name: 'African Lion Insurance',
    icon: '🦁',
    price: 9.99,
    description: 'For safari enthusiasts who want to get that perfect lion photo.',
    location: 'Africa',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Lion Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'nilecrocodile',
    name: 'Nile Crocodile Insurance',
    icon: '🐊',
    price: 9.99,
    description: 'Coverage for those exploring Africa\'s waterways.',
    location: 'Africa',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Crocodile Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'capebuffalo',
    name: 'Cape Buffalo Insurance',
    icon: '🐃',
    price: 9.99,
    description: 'Protection against Africa\'s notorious "Black Death".',
    location: 'Africa',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Buffalo Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'elephant',
    name: 'African Elephant Insurance',
    icon: '🐘',
    price: 9.99,
    description: 'For those who want to get close to the world\'s largest land mammal.',
    location: 'Africa',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Elephant Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'hippo',
    name: 'Hippopotamus Insurance',
    icon: '🦛',
    price: 9.99,
    description: 'Coverage for encounters with Africa\'s deadliest large land mammal.',
    location: 'Africa',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Hippopotamus Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'mosquito',
    name: 'Mosquito Insurance',
    icon: '🦟',
    price: 9.99,
    description: 'Protection against the world\'s deadliest animal (by human deaths).',
    location: 'Global (Tropics)',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Mosquito Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'tsetsefly',
    name: 'Tsetse Fly Insurance',
    icon: '🪰',
    price: 9.99,
    description: 'Coverage for the deadly African sleeping sickness vector.',
    location: 'Africa',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Tsetse Fly Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'assassinbug',
    name: 'Assassin Bug Insurance',
    icon: '🪲',
    price: 9.99,
    description: 'For those in regions with Chagas disease risk.',
    location: 'Central & South America',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Assassin Bug Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'wanderingspider',
    name: 'Brazilian Wandering Spider Insurance',
    icon: '🕷️',
    price: 9.99,
    description: 'Protection against the world\'s most venomous spider.',
    location: 'Brazil, South America',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Spider Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'bulletant',
    name: 'Bullet Ant Insurance',
    icon: '🐜',
    price: 9.99,
    description: 'Coverage for encounters with the world\'s most painful insect sting.',
    location: 'Brazil, South America',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Ant Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'jaguar',
    name: 'Jaguar Insurance',
    icon: '🐆',
    price: 9.99,
    description: 'For those exploring jaguar territory in the Amazon.',
    location: 'Brazil, Amazon Basin',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Jaguar Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'anaconda',
    name: 'Anaconda Insurance',
    icon: '🐍',
    price: 9.99,
    description: 'Protection against the world\'s largest snake.',
    location: 'Brazil, Amazon Basin',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Anaconda Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'poisondartfrog',
    name: 'Golden Poison Dart Frog Insurance',
    icon: '🐸',
    price: 9.99,
    description: 'Coverage for the deadliest amphibian on Earth.',
    location: 'Colombia',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Frog Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'piranha',
    name: 'Piranha Insurance',
    icon: '🐟',
    price: 9.99,
    description: 'For those swimming in piranha-infested waters.',
    location: 'Amazon River, South America',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Piranha Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'electriceel',
    name: 'Electric Eel Insurance',
    icon: '⚡',
    price: 9.99,
    description: 'Protection against the Amazon\'s shocking predator.',
    location: 'Amazon River, South America',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Electric Eel Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'alligator',
    name: 'American Alligator Insurance',
    icon: '🐊',
    price: 9.99,
    description: 'Coverage for encounters in America\'s swamps and waterways.',
    location: 'USA',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Alligator Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'rattlesnake',
    name: 'Rattlesnake Insurance',
    icon: '🐍',
    price: 9.99,
    description: 'For those hiking in rattlesnake country.',
    location: 'USA, Mexico',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Rattlesnake Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'brownrecluse',
    name: 'Brown Recluse Spider Insurance',
    icon: '🕷️',
    price: 9.99,
    description: 'Protection against America\'s notorious brown spider.',
    location: 'USA',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Spider Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'blackwidow',
    name: 'Black Widow Spider Insurance',
    icon: '🕷️',
    price: 9.99,
    description: 'Coverage for North America\'s most venomous spider.',
    location: 'USA',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Spider Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'grizzly',
    name: 'Grizzly Bear Insurance',
    icon: '🐻',
    price: 9.99,
    description: 'For those exploring North American wilderness.',
    location: 'USA, Canada',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Bear Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'polar',
    name: 'Polar Bear Insurance',
    icon: '🐻‍❄️',
    price: 9.99,
    description: 'Protection for Arctic explorers against the world\'s largest land predator.',
    location: 'Arctic (Canada, Russia)',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Polar Bear Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'wolverine',
    name: 'Wolverine Insurance',
    icon: '🦡',
    price: 9.99,
    description: 'Coverage for encounters with the ferocious northern predator.',
    location: 'Canada, Russia, Scandinavia',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Wolverine Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'wolf',
    name: 'Wolf Insurance',
    icon: '🐺',
    price: 9.99,
    description: 'For those venturing into wolf territory.',
    location: 'Canada, Russia, Europe',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Wolf Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'komodo',
    name: 'Komodo Dragon Insurance',
    icon: '🦎',
    price: 9.99,
    description: 'Protection against the world\'s largest lizard.',
    location: 'Indonesia',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Komodo Dragon Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'malayanpitviper',
    name: 'Malayan Pit Viper Insurance',
    icon: '🐍',
    price: 9.99,
    description: 'Coverage for this deadly Southeast Asian snake.',
    location: 'Malaysia, Southeast Asia',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Viper Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'tiger',
    name: 'Tiger Insurance',
    icon: '🐅',
    price: 9.99,
    description: 'For those exploring tiger country.',
    location: 'India, Southeast Asia',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Tiger Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'gianthornet',
    name: 'Asian Giant Hornet Insurance',
    icon: '🐝',
    price: 9.99,
    description: 'Protection against the notorious "murder hornet".',
    location: 'Japan, China',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Hornet Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'leopard',
    name: 'Leopard Insurance',
    icon: '🐆',
    price: 9.99,
    description: 'Coverage for encounters with this stealthy big cat.',
    location: 'Africa, India',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Leopard Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'indianscorpion',
    name: 'Indian Scorpion Insurance',
    icon: '🦂',
    price: 9.99,
    description: 'For those in Indian scorpion territory.',
    location: 'India',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Scorpion Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'honeybee',
    name: 'Honeybee Insurance',
    icon: '🐝',
    price: 9.99,
    description: 'Protection for those with bee allergies.',
    location: 'Global',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Bee Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'fireant',
    name: 'Fire Ant Insurance',
    icon: '🐜',
    price: 9.99,
    description: 'Coverage for encounters with these painful invaders.',
    location: 'USA, South America',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Ant Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'cassowary',
    name: 'Cassowary Insurance',
    icon: '🐦',
    price: 9.99,
    description: 'For those encountering the world\'s most dangerous bird.',
    location: 'Australia, Papua New Guinea',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Cassowary Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'tarantulahawk',
    name: 'Tarantula Hawk Wasp Insurance',
    icon: '🐝',
    price: 9.99,
    description: 'Protection against one of the most painful insect stings.',
    location: 'USA, Central America',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Wasp Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'killerbees',
    name: 'Africanized Bee Insurance',
    icon: '🐝',
    price: 9.99,
    description: 'Coverage for encounters with "killer" bees.',
    location: 'South & Central America',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Bee Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'sealion',
    name: 'Steller Sea Lion Insurance',
    icon: '🦭',
    price: 9.99,
    description: 'For those diving in North Pacific waters.',
    location: 'North Pacific',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Sea Lion Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'giantoctopus',
    name: 'Giant Pacific Octopus Insurance',
    icon: '🐙',
    price: 9.99,
    description: 'Protection for divers in deep Pacific waters.',
    location: 'North Pacific',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Octopus Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'pufferfish',
    name: 'Pufferfish Insurance',
    icon: '🐡',
    price: 9.99,
    description: 'Coverage for those trying fugu or diving with pufferfish.',
    location: 'Japan, Indo-Pacific',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Pufferfish Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'europeanadder',
    name: 'European Adder Insurance',
    icon: '🐍',
    price: 9.99,
    description: 'For hikers in European adder territory.',
    location: 'Europe',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Adder Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'eagle',
    name: 'Eagle Insurance',
    icon: '🦅',
    price: 9.99,
    description: 'Protection against these powerful birds of prey.',
    location: 'Global',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Eagle Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'greatwhite',
    name: 'Great White Shark Insurance',
    icon: '🦈',
    price: 9.99,
    description: 'For those brave enough to swim with the ocean\'s apex predator.',
    location: 'Australia, USA, South Africa',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Shark Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'tigershark',
    name: 'Tiger Shark Insurance',
    icon: '🦈',
    price: 9.99,
    description: 'Coverage for divers in tiger shark waters.',
    location: 'Australia, USA, Hawaii',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Shark Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'bullshark',
    name: 'Bull Shark Insurance',
    icon: '🦈',
    price: 9.99,
    description: 'Protection against the most aggressive shark species.',
    location: 'Global (Warm Waters)',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Shark Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'mambaspider',
    name: 'Mamba Spider Insurance',
    icon: '🕷️',
    price: 9.99,
    description: 'For those in African mamba spider territory.',
    location: 'Africa',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Spider Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'human',
    name: 'Human Insurance',
    icon: '👤',
    price: 9.99,
    description: 'Protection against the deadliest predator of all - humans!',
    location: 'Global',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun (Scary) Human Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'apex-pack',
    name: 'Apex Predator Pack',
    icon: '🏆',
    price: 249.99,
    description: 'The ultimate package for the ultimate adventurer. All sixty certificates for the price of twenty-five!',
    location: 'Global',
    features: [
      'All 60 Digital Certificates',
      'Shareable on Social Media',
      'All Fun Animal Facts',
      'Ultimate Bragging Rights',
      'Still Not Actual Insurance'
    ],
    featured: true
  }
];

// Front page featured deadly animals - sharks, spiders, and snakes
const featuredCategories = ['shark', 'spider', 'snake'];

const InsurancePlans = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [visiblePlans, setVisiblePlans] = useState(fullInsurancePlans);
  const [displayCount, setDisplayCount] = useState(9); // Initially show 9 plans
  
  // Get unique countries from all plans
  const countries = Array.from(new Set(
    fullInsurancePlans.flatMap(plan => 
      plan.location.split(', ')
    )
  )).sort();
  
  // Filter plans based on search term and selected country
  useEffect(() => {
    let filtered = fullInsurancePlans;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(plan => 
        plan.name.toLowerCase().includes(term) || 
        plan.description.toLowerCase().includes(term)
      );
    }
    
    if (selectedCountry) {
      filtered = filtered.filter(plan => 
        plan.location.includes(selectedCountry)
      );
    }
    
    // Always put the featured plan at the end
    const featuredPlan = filtered.find(plan => plan.featured);
    const regularPlans = filtered.filter(plan => !plan.featured);
    
    setVisiblePlans(
      featuredPlan 
        ? [...regularPlans, featuredPlan] 
        : regularPlans
    );
  }, [searchTerm, selectedCountry]);
  
  // Handle loading more plans
  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 12);
  };
  
  // Highlight featured deadly animals on front page
  const isFeaturedAnimal = (plan: any) => {
    for (const category of featuredCategories) {
      if (plan.id.toLowerCase().includes(category)) {
        return true;
      }
    }
    return false;
  };
  
  const handleSelectPlan = (plan: any) => {
    setSelectedPlan(plan.id);
    toast({
      title: `${plan.name} selected!`,
      description: "Proceed to checkout to complete your purchase.",
    });
    
    navigate('/checkout', { state: { plan } });
  };
  
  return (
    <section id="plans" className="py-20 bg-apex-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 grid-pattern z-0" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-fade-up">
            Choose Your Wildlife Shield
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto animate-fade-up animate-delay-100">
            Pick your adventure from 60 of the world's deadliest creatures and get your fun insurance certificate today.
          </p>
        </div>
        
        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 animate-fade-up">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-white/60 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by animal name..."
                className="pl-10 bg-white/10 border-white/20 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="w-full md:w-1/3">
            <div className="relative">
              <Globe className="absolute left-3 top-3 text-white/60 h-4 w-4" />
              <select
                className="w-full pl-10 py-2 bg-white/10 border border-white/20 rounded-md text-white appearance-none"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="">All Regions</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              <div className="absolute right-3 top-3 pointer-events-none">
                <svg className="h-4 w-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Display Results Count */}
        <p className="text-white/70 mb-6 animate-fade-up">
          Showing {Math.min(displayCount, visiblePlans.length)} of {visiblePlans.length} deadly creatures
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visiblePlans.slice(0, displayCount).map((plan, index) => (
            <div 
              key={plan.id}
              className={cn(
                "bg-white/10 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-500 border border-white/10 hover:border-white/20 transform hover:translate-y-[-4px] hover:shadow-glass",
                plan.featured ? "lg:col-span-3" : "",
                isFeaturedAnimal(plan) && !plan.featured ? "ring-2 ring-apex-yellow" : "",
                "animate-fade-up"
              )}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className={cn(
                "p-6 flex flex-col h-full",
                plan.featured ? "lg:flex-row lg:items-center lg:justify-between" : ""
              )}>
                <div className={plan.featured ? "lg:w-2/3" : ""}>
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-4">{plan.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                      <div className="text-2xl font-bold text-apex-red mt-1">${plan.price}</div>
                    </div>
                  </div>
                  
                  <p className="text-white/70 mb-4">{plan.description}</p>
                  
                  {/* Location badge */}
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-white text-sm mb-4">
                    <MapPin size={12} />
                    <span>{plan.location}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2 text-apex-yellow mt-0.5">
                          <Check size={16} />
                        </span>
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={plan.featured ? "lg:w-1/3 lg:text-right" : ""}>
                  <button 
                    className={cn(
                      "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 text-white font-medium",
                      plan.featured 
                        ? "bg-apex-yellow text-apex-black w-full lg:w-auto transform hover:scale-105"
                        : "bg-white/20 hover:bg-white/30 w-full"
                    )}
                    onClick={() => handleSelectPlan(plan)}
                  >
                    {plan.featured ? <Shield size={18} /> : <ShoppingCart size={18} />}
                    {plan.featured ? "Get Complete Protection" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Load More Button */}
        {displayCount < visiblePlans.length && (
          <div className="mt-10 text-center">
            <Button
              variant="outline"
              onClick={handleLoadMore}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Load More Deadly Creatures
            </Button>
          </div>
        )}
        
        <div className="mt-12 text-center">
          <p className="text-white/60 text-sm">
            * This is not real insurance. It's a fun novelty item only.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InsurancePlans;
