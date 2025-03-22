import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Shield, ShoppingCart, Check, Globe, MapPin, Search, Trophy, Star, Filter } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious
} from '@/components/ui/pagination';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { PRICING_PLANS } from '@/constants/pricing';

// Complete list of 60 deadly animal insurance plans with their respective countries
const fullInsurancePlans = [
  {
    id: 'boxjellyfish',
    name: 'Box Jellyfish Insurance',
    icon: '🪼',
    price: 9.99,
    description: 'Real protection with $50K death benefit against the world\'s most venomous marine creature.',
    location: 'Australia, Philippines',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Box Jellyfish Facts'
    ],
    funFact: 'Box jellyfish have 24 eyes and can accelerate faster than most Olympic swimmers!'
  },
  {
    id: 'inlandtaipan',
    name: 'Inland Taipan Insurance',
    icon: '🐍',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for encounters with the world\'s most venomous snake.',
    location: 'Australia',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Taipan Facts'
    ],
    funFact: 'The inland taipan\'s venom is strong enough to kill 100 adult humans with a single bite!'
  },
  {
    id: 'saltwatercroc',
    name: 'Saltwater Crocodile Insurance',
    icon: '🐊',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for those brave enough to swim in croc-infested waters.',
    location: 'Australia, Southeast Asia',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Crocodile Facts'
    ],
    funFact: 'Saltwater crocodiles can hold their breath underwater for over an hour!'
  },
  {
    id: 'blueringedoctopus',
    name: 'Blue-ringed Octopus Insurance',
    icon: '🐙',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for the tiny but deadly ocean predator.',
    location: 'Australia, Japan, Philippines',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Octopus Facts'
    ],
    funFact: 'The blue-ringed octopus carries enough venom to kill 26 adult humans within minutes.'
  },
  {
    id: 'conesnail',
    name: 'Cone Snail Insurance',
    icon: '🐌',
    price: 9.99,
    description: 'Real protection with $50K death benefit from one of the ocean\'s most venomous gastropods.',
    location: 'Australia, Indo-Pacific',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Cone Snail Facts'
    ],
    funFact: 'The venom of a cone snail is so complex that scientists are studying it for potential pain medication.'
  },
  {
    id: 'stonefish',
    name: 'Stonefish Insurance',
    icon: '🐡',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for the world\'s most venomous fish that looks like a rock.',
    location: 'Australia, Indo-Pacific',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Stonefish Facts'
    ],
    funFact: 'Stonefish are masters of camouflage, blending seamlessly with rocks and coral.'
  },
  {
    id: 'funnelwebspider',
    name: 'Sydney Funnel-web Spider Insurance',
    icon: '🕷️',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for those venturing into Sydney\'s spider territory.',
    location: 'Australia',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Spider Facts'
    ],
    funFact: 'The Sydney funnel-web spider\'s venom can kill a human in as little as 15 minutes.'
  },
  {
    id: 'easternbrownsnake',
    name: 'Eastern Brown Snake Insurance',
    icon: '🐍',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for Australia\'s second most venomous land snake.',
    location: 'Australia',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Snake Facts'
    ],
    funFact: 'Eastern brown snakes are fast and aggressive, making them a dangerous encounter in the wild.'
  },
  {
    id: 'redbackspider',
    name: 'Redback Spider Insurance',
    icon: '🕷️',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for those encountering Australia\'s notorious black widow cousin.',
    location: 'Australia',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Spider Facts'
    ],
    funFact: 'Female redback spiders are known to eat the males after mating, a behavior called sexual cannibalism.'
  },
  {
    id: 'tigersnake',
    name: 'Tiger Snake Insurance',
    icon: '🐍',
    price: 9.99,
    description: 'Real protection with $50K death benefit for those in tiger snake territory.',
    location: 'Australia',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Snake Facts'
    ],
    funFact: 'Tiger snakes vary greatly in color, from banded to blotched, resembling tiger stripes.'
  },
  {
    id: 'deathstalker',
    name: 'Deathstalker Scorpion Insurance',
    icon: '🦂',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for encounters with the world\'s deadliest scorpion.',
    location: 'Middle East, North Africa',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Scorpion Facts'
    ],
    funFact: 'The deathstalker scorpion\'s venom is a complex cocktail of neurotoxins that can cause intense pain and paralysis.'
  },
  {
    id: 'sawscaledviper',
    name: 'Saw-scaled Viper Insurance',
    icon: '🐍',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for those in regions where these deadly vipers roam.',
    location: 'India, Middle East',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Viper Facts'
    ],
    funFact: 'Saw-scaled vipers get their name from the serrated scales on their sides, which they rub together to produce a warning hiss.'
  },
  {
    id: 'indiancobra',
    name: 'Indian Cobra Insurance',
    icon: '🐍',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for encounters with India\'s iconic venomous snake.',
    location: 'India, South Asia',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Cobra Facts'
    ],
    funFact: 'Indian cobras are revered in Hindu mythology and are often seen as sacred creatures.'
  },
  {
    id: 'kingcobra',
    name: 'King Cobra Insurance',
    icon: '🐍',
    price: 9.99,
    description: 'Real protection with $50K death benefit against the world\'s longest venomous snake.',
    location: 'India, Southeast Asia',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun King Cobra Facts'
    ],
    funFact: 'King cobras can grow up to 18 feet long and can deliver enough venom in a single bite to kill an elephant.'
  },
  {
    id: 'blackmamba',
    name: 'Black Mamba Insurance',
    icon: '🐍',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for Africa\'s deadliest snake.',
    location: 'Africa',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Black Mamba Facts'
    ],
    funFact: 'Black mambas are among the fastest snakes in the world, capable of reaching speeds of up to 12.5 mph.'
  },
  {
    id: 'puffadder',
    name: 'Puff Adder Insurance',
    icon: '🐍',
    price: 9.99,
    description: 'Real protection with $50K death benefit for those venturing into puff adder territory.',
    location: 'Africa',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Adder Facts'
    ],
    funFact: 'Puff adders are masters of camouflage and often lie motionless, making them easy to accidentally step on.'
  },
  {
    id: 'lion',
    name: 'African Lion Insurance',
    icon: '🦁',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for safari enthusiasts who want to get that perfect lion photo.',
    location: 'Africa',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Lion Facts'
    ],
    funFact: 'A lion\'s roar can be heard from up to 5 miles away and can reach 114 decibels - as loud as a rock concert.'
  },
  {
    id: 'nilecrocodile',
    name: 'Nile Crocodile Insurance',
    icon: '🐊',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for those exploring Africa\'s waterways.',
    location: 'Africa',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Crocodile Facts'
    ],
    funFact: 'Nile crocodiles can live for over 70 years and have been known to ambush prey both in and out of the water.'
  },
  {
    id: 'capebuffalo',
    name: 'Cape Buffalo Insurance',
    icon: '🐃',
    price: 9.99,
    description: 'Real protection with $50K death benefit against Africa\'s notorious "Black Death".',
    location: 'Africa',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Buffalo Facts'
    ],
    funFact: 'Cape buffalo are known for their unpredictable temperaments and have been known to charge without warning.'
  },
  {
    id: 'elephant',
    name: 'African Elephant Insurance',
    icon: '🐘',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for those who want to get close to the world\'s largest land mammal.',
    location: 'Africa',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Elephant Facts'
    ],
    funFact: 'Elephants can recognize themselves in mirrors, a rare ability that shows self-awareness shared only by apes, dolphins, and magpies.'
  },
  {
    id: 'hippo',
    name: 'Hippopotamus Insurance',
    icon: '🦛',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for encounters with Africa\'s deadliest large land mammal.',
    location: 'Africa',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Hippopotamus Facts'
    ],
    funFact: 'Hippos may look docile, but they are highly aggressive and are responsible for more human deaths in Africa than lions or crocodiles.'
  },
  {
    id: 'mosquito',
    name: 'Mosquito Insurance',
    icon: '🦟',
    price: 9.99,
    description: 'Real coverage with $50K death benefit against the world\'s deadliest animal (by human deaths).',
    location: 'Global (Tropics)',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Mosquito Facts'
    ],
    funFact: 'Mosquitoes are responsible for transmitting diseases that cause millions of deaths worldwide each year.'
  },
  {
    id: 'tsetsefly',
    name: 'Tsetse Fly Insurance',
    icon: '🪰',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for the deadly African sleeping sickness vector.',
    location: 'Africa',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Tsetse Fly Facts'
    ],
    funFact: 'Tsetse flies transmit trypanosomiasis, also known as sleeping sickness, which can be fatal if left untreated.'
  },
  {
    id: 'assassinbug',
    name: 'Assassin Bug Insurance',
    icon: '🪲',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for those in regions with Chagas disease risk.',
    location: 'Central & South America',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Assassin Bug Facts'
    ],
    funFact: 'Assassin bugs get their name from their hunting behavior, as they ambush and kill other insects.'
  },
  {
    id: 'wanderingspider',
    name: 'Brazilian Wandering Spider Insurance',
    icon: '🕷️',
    price: 9.99,
    description: 'Real coverage with $50K death benefit against the world\'s most venomous spider.',
    location: 'Brazil, South America',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Spider Facts'
    ],
    funFact: 'Brazilian wandering spiders are known for their aggressive behavior and potent venom, which can cause intense pain and muscle spasms.'
  },
  {
    id: 'bulletant',
    name: 'Bullet Ant Insurance',
    icon: '🐜',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for encounters with the world\'s most painful insect sting.',
    location: 'Brazil, South America',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Ant Facts'
    ],
    funFact: 'The sting of a bullet ant is said to feel like being shot, hence its name.'
  },
  {
    id: 'jaguar',
    name: 'Jaguar Insurance',
    icon: '🐆',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for those exploring jaguar territory in the Amazon.',
    location: 'Brazil, Amazon Basin',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Jaguar Facts'
    ],
    funFact: 'Jaguars are the largest cats in the Americas and are known for their powerful jaws and swimming abilities.'
  },
  {
    id: 'anaconda',
    name: 'Anaconda Insurance',
    icon: '🐍',
    price: 9.99,
    description: 'Real protection with $50K death benefit against the world\'s largest snake.',
    location: 'Brazil, Amazon Basin',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Anaconda Facts'
    ],
    funFact: 'Anacondas are non-venomous constrictors that can grow over 20 feet long and weigh over 200 pounds.'
  },
  {
    id: 'poisondartfrog',
    name: 'Golden Poison Dart Frog Insurance',
    icon: '🐸',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for the deadliest amphibian on Earth.',
    location: 'Colombia',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Frog Facts'
    ],
    funFact: 'The golden poison dart frog\'s skin is coated with a deadly toxin that can kill a human with just a touch.'
  },
  {
    id: 'piranha',
    name: 'Piranha Insurance',
    icon: '🐟',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for those swimming in piranha-infested waters.',
    location: 'Amazon River, South America',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Piranha Facts'
    ],
    funFact: 'Piranhas have razor-sharp teeth and a powerful bite, allowing them to quickly strip flesh from their prey.'
  },
  {
    id: 'electriceel',
    name: 'Electric Eel Insurance',
    icon: '⚡',
    price: 9.99,
    description: 'Real protection with $50K death benefit against the Amazon\'s shocking predator.',
    location: 'Amazon River, South America',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Electric Eel Facts'
    ],
    funFact: 'Electric eels can generate powerful electric shocks of up to 600 volts, enough to stun or kill their prey.'
  },
  {
    id: 'alligator',
    name: 'American Alligator Insurance',
    icon: '🐊',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for encounters in America\'s swamps and waterways.',
    location: 'USA',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Alligator Facts'
    ],
    funFact: 'American alligators can live for over 50 years and have been known to ambush prey both in and out of the water.'
  },
  {
    id: 'rattlesnake',
    name: 'Rattlesnake Insurance',
    icon: '🐍',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for those hiking in rattlesnake country.',
    location: 'USA, Mexico',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Rattlesnake Facts'
    ],
    funFact: 'Rattlesnakes use their namesake rattle to warn potential predators of their presence.'
  },
  {
    id: 'brownrecluse',
    name: 'Brown Recluse Spider Insurance',
    icon: '🕷️',
    price: 9.99,
    description: 'Real coverage with $50K death benefit against America\'s notorious brown spider.',
    location: 'USA',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Spider Facts'
    ],
    funFact: 'Brown recluse spiders are known for their distinctive violin-shaped marking on their cephalothorax.'
  },
  {
    id: 'blackwidow',
    name: 'Black Widow Spider Insurance',
    icon: '🕷️',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for North America\'s most venomous spider.',
    location: 'USA',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Spider Facts'
    ],
    funFact: 'Female black widow spiders are known for their distinctive red hourglass marking on their abdomen.'
  },
  {
    id: 'grizzly',
    name: 'Grizzly Bear Insurance',
    icon: '🐻',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for those exploring North American wilderness.',
    location: 'USA, Canada',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Bear Facts'
    ],
    funFact: 'Grizzly bears can run as fast as 35 mph, which is faster than the world\'s fastest human sprinter.'
  },
  {
    id: 'polar',
    name: 'Polar Bear Insurance',
    icon: '🐻‍❄️',
    price: 9.99,
    description: 'Real protection with $50K death benefit for Arctic explorers against the world\'s largest land predator.',
    location: 'Arctic (Canada, Russia)',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Polar Bear Facts'
    ],
    funFact: 'Polar bears are highly adapted to survive in freezing temperatures and can swim for long distances.'
  },
  {
    id: 'wolverine',
    name: 'Wolverine Insurance',
    icon: '🦡',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for encounters with the ferocious northern predator.',
    location: 'Canada, Russia, Scandinavia',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Wolverine Facts'
    ],
    funFact: 'Wolverines are known for their incredible strength and ferocity, capable of taking down prey much larger than themselves.'
  },
  {
    id: 'wolf',
    name: 'Wolf Insurance',
    icon: '🐺',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for those venturing into wolf territory.',
    location: 'Canada, Russia, Europe',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Wolf Facts'
    ],
    funFact: 'Wolves are highly social animals that live in packs with complex social hierarchies.'
  },
  {
    id: 'komodo',
    name: 'Komodo Dragon Insurance',
    icon: '🦎',
    price: 9.99,
    description: 'Real protection with $50K death benefit against the world\'s largest lizard.',
    location: 'Indonesia',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Komodo Dragon Facts'
    ],
    funFact: 'Komodo dragons have venomous saliva containing multiple toxins that can cause bleeding, pain, and paralysis.'
  },
  {
    id: 'malayanpitviper',
    name: 'Malayan Pit Viper Insurance',
    icon: '🐍',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for this deadly Southeast Asian snake.',
    location: 'Malaysia, Southeast Asia',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Viper Facts'
    ],
    funFact: 'Malayan pit vipers are nocturnal ambush predators that rely on their camouflage to blend in with their surroundings.'
  },
  {
    id: 'tiger',
    name: 'Tiger Insurance',
    icon: '🐅',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for those exploring tiger country.',
    location: 'India, Southeast Asia',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Tiger Facts'
    ],
    funFact: 'Tigers are the largest cat species in the world and are known for their distinctive orange and black stripes.'
  },
  {
    id: 'gianthornet',
    name: 'Asian Giant Hornet Insurance',
    icon: '🐝',
    price: 9.99,
    description: 'Real protection with $50K death benefit against the notorious "murder hornet".',
    location: 'Japan, China',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Hornet Facts'
    ],
    funFact: 'Asian giant hornets are known for their aggressive behavior and potent venom, which can be fatal to humans.'
  },
  {
    id: 'leopard',
    name: 'Leopard Insurance',
    icon: '🐆',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for encounters with this stealthy big cat.',
    location: 'Africa, India',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Leopard Facts'
    ],
    funFact: 'Leopards are skilled climbers and often drag their prey up into trees to keep it safe from scavengers.'
  },
  {
    id: 'indianscorpion',
    name: 'Indian Scorpion Insurance',
    icon: '🦂',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for those in Indian scorpion territory.',
    location: 'India',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Scorpion Facts'
    ],
    funFact: 'Indian red scorpions are one of the most dangerous scorpions in the world, with venom that can cause severe pain and even death.'
  },
  {
    id: 'honeybee',
    name: 'Honeybee Insurance',
    icon: '🐝',
    price: 9.99,
    description: 'Real protection with $50K death benefit for those with bee allergies.',
    location: 'Global',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Bee Facts'
    ],
    funFact: 'Honeybees are essential pollinators and play a vital role in agriculture and the environment.'
  },
  {
    id: 'fireant',
    name: 'Fire Ant Insurance',
    icon: '🐜',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for encounters with these painful invaders.',
    location: 'USA, South America',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Ant Facts'
    ],
    funFact: 'Fire ants are known for their aggressive behavior and painful stings, which can cause allergic reactions in some people.'
  },
  {
    id: 'cassowary',
    name: 'Cassowary Insurance',
    icon: '🐦',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for those encountering the world\'s most dangerous bird.',
    location: 'Australia, Papua New Guinea',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Cassowary Facts'
    ],
    funFact: 'Cassowaries have powerful legs and sharp claws that can inflict serious injuries, making them a threat to humans.'
  },
  {
    id: 'tarantulahawk',
    name: 'Tarantula Hawk Wasp Insurance',
    icon: '🐝',
    price: 9.99,
    description: 'Real protection with $50K death benefit against one of the most painful insect stings.',
    location: 'USA, Central America',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Wasp Facts'
    ],
    funFact: 'Tarantula hawk wasps are known for their incredibly painful stings, which are said to be among the most painful insect stings in the world.'
  },
  {
    id: 'killerbees',
    name: 'Africanized Bee Insurance',
    icon: '🐝',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for encounters with "killer" bees.',
    location: 'South & Central America',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Bee Facts'
    ],
    funFact: 'Africanized honeybees, also known as "killer bees," are known for their aggressive behavior and tendency to swarm.'
  },
  {
    id: 'sealion',
    name: 'Steller Sea Lion Insurance',
    icon: '🦭',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for those diving in North Pacific waters.',
    location: 'North Pacific',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Sea Lion Facts'
    ],
    funFact: 'Steller sea lions are the largest of the eared seals and are known for their loud vocalizations.'
  },
  {
    id: 'giantoctopus',
    name: 'Giant Pacific Octopus Insurance',
    icon: '🐙',
    price: 9.99,
    description: 'Real protection with $50K death benefit for divers in deep Pacific waters.',
    location: 'North Pacific',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Octopus Facts'
    ],
    funFact: 'Giant Pacific octopuses are highly intelligent and can solve complex problems and even recognize individual humans.'
  },
  {
    id: 'pufferfish',
    name: 'Pufferfish Insurance',
    icon: '🐡',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for those trying fugu or diving with pufferfish.',
    location: 'Japan, Indo-Pacific',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Pufferfish Facts'
    ],
    funFact: 'Pufferfish contain tetrodotoxin, a deadly neurotoxin that is lethal to humans if not prepared properly.'
  },
  {
    id: 'europeanadder',
    name: 'European Adder Insurance',
    icon: '🐍',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for hikers in European adder territory.',
    location: 'Europe',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Adder Facts'
    ],
    funFact: 'European adders are the only venomous snakes found in Great Britain.'
  },
  {
    id: 'eagle',
    name: 'Eagle Insurance',
    icon: '🦅',
    price: 9.99,
    description: 'Real protection with $50K death benefit against these powerful birds of prey.',
    location: 'Global',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Eagle Facts'
    ],
    funFact: 'Eagles have incredible eyesight and can spot prey from miles away.'
  },
  {
    id: 'greatwhite',
    name: 'Great White Shark Insurance',
    icon: '🦈',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for those brave enough to swim with the ocean\'s apex predator.',
    location: 'Australia, USA, South Africa',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Shark Facts'
    ],
    funFact: 'Great white sharks can detect one drop of blood in 25 gallons of water and can smell blood up to 3 miles away.'
  },
  {
    id: 'tigershark',
    name: 'Tiger Shark Insurance',
    icon: '🦈',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for divers in tiger shark waters.',
    location: 'Australia, USA, Hawaii',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Shark Facts'
    ],
    funFact: 'Tiger sharks are known as the "garbage cans of the sea" because they eat almost anything.'
  },
  {
    id: 'bullshark',
    name: 'Bull Shark Insurance',
    icon: '🦈',
    price: 9.99,
    description: 'Real protection with $50K death benefit against the most aggressive shark species.',
    location: 'Global (Warm Waters)',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Shark Facts'
    ],
    funFact: 'Bull sharks are the only shark species that can tolerate both salt and fresh water, allowing them to swim up rivers.'
  },
  {
    id: 'mambaspider',
    name: 'Mamba Spider Insurance',
    icon: '🕷️',
    price: 9.99,
    description: 'Real coverage with $50K death benefit for those in African mamba spider territory.',
    location: 'Africa',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Spider Facts'
    ],
    funFact: 'Mamba spiders are known for their speed and agility, making them difficult to catch.'
  },
  {
    id: 'human',
    name: 'Human Insurance',
    icon: '👤',
    price: 9.99,
    description: 'Real protection with $50K death benefit against the deadliest predator of all - humans!',
    location: 'Global',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun (Scary) Human Facts'
    ],
    funFact: 'Humans are technically apex predators with a trophic level of 2.21, higher than even some sharks and big cats.'
  },
  {
    id: 'apex-pack',
    name: 'Apex Predator Pack',
    icon: '🏆',
    price: 249.99,
    description: 'The ultimate protection package with $50K death benefit for the ultimate adventurer. All sixty certificates for the price of twenty-five!',
    location: 'Global',
    features: [
      'All 60 Digital Certificates',
      'Shareable on Social Media',
      'All Fun Animal Facts',
      'Ultimate Bragging Rights',
      '$50K Death Benefit per Certificate'
    ],
    funFact: 'Combined, the animals in this pack represent the deadliest creatures on Earth across all continents and habitats!'
  },
  {
    id: 'bundle25',
    name: 'Bundle Deal 25',
    icon: '📦',
    price: 99.90,
    description: '25% off on all plans',
    location: 'Global',
    features: [
      'All 60 Digital Certificates',
      'Shareable on Social Media',
      'All Fun Animal Facts',
      'Ultimate Bragging Rights',
      '$50K Death Benefit per Certificate'
    ],
    funFact: '25% off on all plans'
  },
  {
    id: 'bundle60',
    name: 'Bundle Deal 60',
    icon: '📦',
    price: 599.40,
    description: '60% off on all plans',
    location: 'Global',
    features: [
      'All 60 Digital Certificates',
      'Shareable on Social Media',
      'All Fun Animal Facts',
      'Ultimate Bragging Rights',
      '$50K Death Benefit per Certificate'
    ],
    funFact: '60% off on all plans'
  }
];

// Define the insurance plan type to ensure proper typing
interface InsurancePlan {
  id: string;
  name: string;
  icon: string;
  price: number;
  description: string;
  location: string;
  features: string[];
  funFact: string;
}

// Define popular plans
const popularPlanIds = ['greatwhite', 'lion', 'blackmamba', 'grizzly', 'komodo', 'elephant', 'hippo', 'tiger', 'wolf', 'boxjellyfish'];

// Define bundle plans
const bundlePlanIds = ['bundle25', 'bundle60'];

// Component implementation
const InsurancePlans = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [filteredPlans, setFilteredPlans] = useState<InsurancePlan[]>(fullInsurancePlans);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('all');
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<{id: string, name: string, icon: string}[]>([]);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const plansPerPage = 9; // Show 9 plans per page for better visibility

  // Load recently viewed from localStorage on component mount
  useEffect(() => {
    const storedRecentlyViewed = localStorage.getItem('recentlyViewed');
    if (storedRecentlyViewed) {
      setRecentlyViewed(JSON.parse(storedRecentlyViewed));
    }
  }, []);
  
  // Filter plans based on search term, selected location, active tab, and price filter
  useEffect(() => {
    let filtered = fullInsurancePlans;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(plan => 
        plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply location filter
    if (selectedLocation) {
      filtered = filtered.filter(plan => 
        plan.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }
    
    // Apply price filter
    if (priceFilter === 'under10') {
      filtered = filtered.filter(plan => plan.price < 10);
    } else if (priceFilter === 'over10') {
      filtered = filtered.filter(plan => plan.price >= 10);
    }
    
    // Apply tab filter
    if (activeTab === 'bundle') {
      filtered = filtered.filter(plan => bundlePlanIds.includes(plan.id) || plan.id === 'apex-pack');
    } else if (activeTab === 'popular') {
      filtered = filtered.filter(plan => popularPlanIds.includes(plan.id));
    }
    
    // Apply sorting
    if (sortBy === 'name-asc') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'price-asc') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }
    
    setFilteredPlans(filtered);
    
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchTerm, selectedLocation, activeTab, priceFilter, sortBy]);

  // Get unique locations from all plans
  const getUniqueLocations = (): string[] => {
    const locations = new Set<string>();
    
    fullInsurancePlans.forEach(plan => {
      if (plan.location.includes(',')) {
        plan.location.split(',').forEach(loc => {
          locations.add(loc.trim());
        });
      } else {
        locations.add(plan.location.trim());
      }
    });
    
    return Array.from(locations).sort();
  };

  // Function to handle adding a plan to recently viewed
  const addToRecentlyViewed = (plan: InsurancePlan) => {
    const simplifiedPlan = {
      id: plan.id,
      name: plan.name,
      icon: plan.icon
    };
    
    let updatedRecent = [...recentlyViewed];
    
    // Remove the plan if it's already in the list
    updatedRecent = updatedRecent.filter(item => item.id !== plan.id);
    
    // Add the plan to the beginning of the array
    updatedRecent.unshift(simplifiedPlan);
    
    // Limit to 5 recent items
    if (updatedRecent.length > 5) {
      updatedRecent = updatedRecent.slice(0, 5);
    }
    
    // Update state and localStorage
    setRecentlyViewed(updatedRecent);
    localStorage.setItem('recentlyViewed', JSON.stringify(updatedRecent));
  };

  const handleAddToCart = (plan: InsurancePlan) => {
    // Add to recently viewed
    addToRecentlyViewed(plan);
    
    // Store selected plan in localStorage for checkout
    localStorage.setItem('selectedPlan', JSON.stringify(plan));
    
    toast({
      title: "Plan Added to Cart",
      description: `${plan.name} has been added to your cart.`,
      variant: "default",
    });
    
    // Navigate to checkout
    setTimeout(() => {
      navigate('/checkout');
    }, 1000);
  };

  // Function to handle clicking on a plan (add to recently viewed)
  const handlePlanClick = (plan: InsurancePlan) => {
    addToRecentlyViewed(plan);
  };
  
  // Calculate pagination
  const indexOfLastPlan = currentPage * plansPerPage;
  const indexOfFirstPlan = indexOfLastPlan - plansPerPage;
  const currentPlans = filteredPlans.slice(indexOfFirstPlan, indexOfLastPlan);
  const totalPages = Math.ceil(filteredPlans.length / plansPerPage);
  
  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top of plans section
    document.getElementById('plans-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="plans-section" className="py-10 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs for content categorization */}
        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 lg:w-1/2 mx-auto mb-6">
            <TabsTrigger value="all">All Plans</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="bundle">Bundle Deals</TabsTrigger>
          </TabsList>
          
          <div className="flex flex-col lg:flex-row items-center gap-4 mb-4">
            <div className="relative w-full lg:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for insurance plans..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 w-full lg:w-1/2">
              <Globe className="text-gray-400 flex-shrink-0" />
              <select
                className="border border-input bg-background rounded-md h-10 px-3 py-2 w-full text-sm"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                {getUniqueLocations().map((location: string) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm"
            >
              <Filter size={16} />
              {showFilters ? "Hide Advanced Filters" : "Show Advanced Filters"}
            </Button>
            
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 border rounded-md bg-gray-50">
                <div>
                  <label className="text-sm font-medium mb-1 block">Price Range</label>
                  <select
                    className="border border-input bg-background rounded-md h-10 px-3 py-2 w-full text-sm"
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                  >
                    <option value="all">All Prices</option>
                    <option value="under10">Under $10</option>
                    <option value="over10">$10 and above</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Sort By</label>
                  <select
                    className="border border-input bg-background rounded-md h-10 px-3 py-2 w-full text-sm"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="default">Default</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          
          {/* How It Works collapsible section */}
          <Collapsible 
            open={isHowItWorksOpen} 
            onOpenChange={setIsHowItWorksOpen}
            className="mb-8 border rounded-lg p-4"
          >
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full flex justify-between">
                <span>How It Works - Quick Guide</span>
                <span>{isHowItWorksOpen ? '▲' : '▼'}</span>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-apex-red/10 text-apex-red flex items-center justify-center mb-3 text-xl font-bold">
                    1
                  </div>
                  <h3 className="text-lg font-bold text-apex-black mb-1">Choose Your Predator</h3>
                  <p className="text-sm text-apex-darkgray/70">
                    Select from our range of deadly predators or get the complete pack.
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-apex-red/10 text-apex-red flex items-center justify-center mb-3 text-xl font-bold">
                    2
                  </div>
                  <h3 className="text-lg font-bold text-apex-black mb-1">Personalize It</h3>
                  <p className="text-sm text-apex-darkgray/70">
                    Add your name or gift recipient's details to customize the certificate.
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-apex-red/10 text-apex-red flex items-center justify-center mb-3 text-xl font-bold">
                    3
                  </div>
                  <h3 className="text-lg font-bold text-apex-black mb-1">Download & Share</h3>
                  <p className="text-sm text-apex-darkgray/70">
                    Get your digital certificate instantly and share it with friends.
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          {/* Results summary */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-apex-darkgray/70">
              Showing {filteredPlans.length} {filteredPlans.length === 1 ? 'plan' : 'plans'}
            </p>
            
            {activeTab === 'popular' && (
              <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                <Trophy size={14} className="mr-1" /> Popular Plans
              </Badge>
            )}
          </div>
          
          <TabsContent value="all">
            {currentPlans.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentPlans.map((plan) => (
                    <div
                      key={plan.id}
                      id={plan.id}
                      className={cn(
                        "border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300",
                        plan.id === 'apex-pack' ? "border-2 border-apex-red col-span-1 sm:col-span-2 lg:col-span-3" : "border-gray-200"
                      )}
                      onClick={() => handlePlanClick(plan)}
                    >
                      <div className={cn(
                        "p-6 relative",
                        plan.id === 'apex-pack' ? "bg-gradient-to-r from-apex-red/10 to-apex-black/5" : "bg-white"
                      )}>
                        {/* Popular badge */}
                        {popularPlanIds.includes(plan.id) && (
                          <div className="absolute top-0 right-0">
                            <div className="bg-amber-500 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg flex items-center text-xs font-semibold">
                              <Star size={14} className="mr-1" fill="white" />
                              Most Popular
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{plan.icon}</span>
                            <h3 className={cn(
                              "text-xl font-bold",
                              plan.id === 'apex-pack' ? "text-apex-red" : "text-apex-black"
                            )}>
                              {plan.name}
                            </h3>
                          </div>
                          
                          {plan.id === 'apex-pack' && (
                            <span className="px-3 py-1 bg-apex-red text-white text-xs font-semibold rounded-full">
                              Best Value
                            </span>
                          )}
                        </div>
                        
                        <p className="text-apex-darkgray/70 mb-4">
                          {plan.description}
                        </p>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <MapPin size={16} className="text-apex-darkgray/50" />
                          <span className="text-sm text-apex-darkgray/70">{plan.location}</span>
                        </div>
                        
                        <ScrollArea className="h-24 mb-4 rounded p-2 bg-gray-50">
                          <div className="pr-4">
                            <h4 className="text-sm font-semibold mb-2 text-apex-black">Fun Fact:</h4>
                            <p className="text-sm text-apex-darkgray/70 italic">"{plan.funFact}"</p>
                          </div>
                        </ScrollArea>
                        
                        <div className="space-y-2 mb-6">
                          <h4 className="text-sm font-semibold mb-2 text-apex-black">Coverage Includes:</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                            {plan.features.map((feature, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-apex-darkgray/70">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-apex-black">${plan.price}</span>
                            <span className="text-sm text-apex-darkgray/70">/ year</span>
                          </div>
                          
                          <Button 
                            onClick={() => handleAddToCart(plan)} 
                            className={cn(
                              "flex items-center gap-2",
                              plan.id === 'apex-pack' ? "bg-apex-red hover:bg-apex-red/90" : ""
                            )}
                          >
                            <ShoppingCart size={16} />
                            <span>Get Protected</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination className="mt-10">
                    <PaginationContent>
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                        </PaginationItem>
                      )}
                      
                      {pageNumbers.map(number => (
                        <PaginationItem key={number}>
                          <PaginationLink 
                            isActive={currentPage === number}
                            onClick={() => handlePageChange(number)}
                          >
                            {number}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <Shield className="mx-auto h-16 w-16 text-apex-darkgray/30 mb-4" />
                <h3 className="text-xl font-medium text-apex-black mb-2">No plans found</h3>
                <p className="text-apex-darkgray/70">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="popular">
            {currentPlans.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border-gray-200"
                    >
                      <div className="p-6 bg-white">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{plan.icon}</span>
                            <h3 className="text-xl font-bold text-apex-black">
                              {plan.name}
                            </h3>
                          </div>
                          
                          <span className="px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                            Popular
                          </span>
                        </div>
                        
                        <p className="text-apex-darkgray/70 mb-4">
                          {plan.description}
                        </p>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <MapPin size={16} className="text-apex-darkgray/50" />
                          <span className="text-sm text-apex-darkgray/70">{plan.location}</span>
                        </div>
                        
                        <ScrollArea className="h-24 mb-4 rounded p-2 bg-gray-50">
                          <div className="pr-4">
                            <h4 className="text-sm font-semibold mb-2 text-apex-black">Fun Fact:</h4>
                            <p className="text-sm text-apex-darkgray/70 italic">"{plan.funFact}"</p>
                          </div>
                        </ScrollArea>
                        
                        <div className="space-y-2 mb-6">
                          <h4 className="text-sm font-semibold mb-2 text-apex-black">Coverage Includes:</h4>
                          {plan.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-apex-darkgray/70">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-apex-black">${plan.price}</span>
                            <span className="text-sm text-apex-darkgray/70">/ year</span>
                          </div>
                          
                          <Button 
                            onClick={() => handleAddToCart(plan)} 
                            className="flex items-center gap-2"
                          >
                            <ShoppingCart size={16} />
                            <span>Get Protected</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination className="mt-10">
                    <PaginationContent>
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                        </PaginationItem>
                      )}
                      
                      {pageNumbers.map(number => (
                        <PaginationItem key={number}>
                          <PaginationLink 
                            isActive={currentPage === number}
                            onClick={() => handlePageChange(number)}
                          >
                            {number}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <Shield className="mx-auto h-16 w-16 text-apex-darkgray/30 mb-4" />
                <h3 className="text-xl font-medium text-apex-black mb-2">No popular plans found</h3>
                <p className="text-apex-darkgray/70">Try selecting the "All Plans" tab</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="bundle">
            {currentPlans.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="border-2 border-apex-red rounded-xl overflow-hidden shadow-md bg-gradient-to-r from-apex-red/10 to-apex-black/5 p-6"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{plan.icon}</span>
                        <div>
                          <h3 className="text-2xl font-bold text-apex-red mb-2">
                            {plan.name}
                          </h3>
                          <p className="text-apex-darkgray/70 max-w-xl">
                            {plan.description}
                          </p>
                        </div>
                      </div>
                      
                      <span className="px-4 py-2 bg-apex-red text-white text-sm font-semibold rounded-full">
                        {plan.id === 'bundle25' ? 'Save 40%' : 'Save 60%'}
                      </span>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 mb-4">
                      <h4 className="text-lg font-semibold mb-3 text-apex-black">Bundle Includes:</h4>
                      <div className="space-y-2">
                        {plan.features?.map((feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-apex-darkgray/80">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-lg p-4">
                      <div className="mb-4 sm:mb-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg text-apex-darkgray/70 line-through">
                            ${plan.id === 'bundle25' ? '99.90' : '599.40'}
                          </span>
                          <span className="bg-apex-red/10 text-apex-red text-xs px-2 py-1 rounded">
                            Save ${plan.id === 'bundle25' ? '39.91' : '349.41'}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-apex-black">${plan.price}</span>
                          <span className="text-apex-darkgray/70">/ year</span>
                        </div>
                        <p className="text-sm text-apex-darkgray/60 mt-1">
                          Just ${plan.id === 'bundle25' ? '2.40' : '1.67'} per predator
                        </p>
                      </div>
                      
                      <Button 
                        onClick={() => handleAddToCart(plan)}
                        size="lg"
                        className="bg-apex-red hover:bg-apex-red/90 flex items-center gap-2 px-6"
                      >
                        <ShoppingCart size={18} />
                        <span>Get This Bundle</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Shield className="mx-auto h-16 w-16 text-apex-darkgray/30 mb-4" />
                <h3 className="text-xl font-medium text-apex-black mb-2">No bundle deals found</h3>
                <p className="text-apex-darkgray/70">Please try clearing your search filters</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default InsurancePlans;
