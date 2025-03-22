
import { DangerZone } from "../models/DangerZone";

export const dangerZones: DangerZone[] = [
  { 
    id: 1, 
    name: 'Great Barrier Reef', 
    coordinates: { x: 82, y: 58 }, 
    threat: 'Great White Sharks',
    description: 'Home to various shark species including Great Whites, which can detect one drop of blood in 25 gallons of water.',
    color: '#0EA5E9',
    image: 'https://images.unsplash.com/photo-1560275619-4cc5fa59d3ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 2, 
    name: 'Amazon Rainforest', 
    coordinates: { x: 30, y: 53 }, 
    threat: 'Jaguars',
    description: 'The jaguar is the largest cat in the Americas and an apex predator, known for their powerful jaws that can pierce turtle shells.',
    color: '#F97316',
    image: 'https://images.unsplash.com/photo-1552410260-0fd9b577afa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 3, 
    name: 'Serengeti', 
    coordinates: { x: 55, y: 53 }, 
    threat: 'African Lions',
    description: 'The lion population here is among the largest and most studied in Africa. A lion\'s roar can be heard from up to 5 miles away.',
    color: '#D946EF',
    image: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 4, 
    name: 'Northern Australia', 
    coordinates: { x: 85, y: 57 }, 
    threat: 'Saltwater Crocodiles',
    description: 'Saltwater crocodiles here are among the largest and most aggressive in the world, with the ability to hold their breath underwater for over an hour.',
    color: '#8B5CF6',
    image: 'https://images.unsplash.com/photo-1591389703635-e15a07609a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 5, 
    name: 'Yellowstone', 
    coordinates: { x: 18, y: 38 }, 
    threat: 'Grizzly Bears',
    description: 'Grizzly bears in this vast wilderness can run as fast as 35 mph and are known for their incredible strength and fishing abilities.',
    color: '#EA384C',
    image: 'https://images.unsplash.com/photo-1525869916826-972885c91c1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 6, 
    name: 'Komodo Islands', 
    coordinates: { x: 77, y: 54 }, 
    threat: 'Komodo Dragons',
    description: 'These massive lizards have a venomous bite and can take down large prey. Their saliva contains multiple toxins that can cause bleeding, pain, and paralysis.',
    color: '#33C3F0',
    image: 'https://images.unsplash.com/photo-1487252665478-49b61b47f302?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
];
