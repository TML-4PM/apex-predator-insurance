
import { DangerZone } from "../models/DangerZone";

export const dangerZones: DangerZone[] = [
  { 
    id: 1, 
    name: 'Great Barrier Reef', 
    coordinates: { x: 82, y: 58 }, 
    threat: 'Great White Sharks',
    description: 'Home to massive sharks with 300 serrated teeth that can detect a single drop of blood from a mile away. Their bite force can exceed 4,000 PSI.',
    color: '#0EA5E9',
    image: 'https://images.unsplash.com/photo-1504472478235-9bc48ba4d60f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 2, 
    name: 'Amazon Rainforest', 
    coordinates: { x: 30, y: 53 }, 
    threat: 'Jaguars',
    description: 'Silent killers that strike from above with the strongest bite force of any big cat. Their teeth can pierce through turtle shells and crocodile skulls.',
    color: '#F97316',
    image: 'https://images.unsplash.com/photo-1552410260-0fd9b577afa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 3, 
    name: 'Serengeti', 
    coordinates: { x: 55, y: 53 }, 
    threat: 'African Lions',
    description: 'These predators hunt in packs and can bring down prey three times their size. A lion\'s claws are retractable and razor-sharp, capable of disemboweling with a single swipe.',
    color: '#D946EF',
    image: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 4, 
    name: 'Northern Australia', 
    coordinates: { x: 85, y: 57 }, 
    threat: 'Saltwater Crocodiles',
    description: 'These ancient monsters can exceed 20 feet in length with jaws that exert 3,700 PSI of pressure. They\'ve been known to consume entire humans in a single attack.',
    color: '#8B5CF6',
    image: 'https://images.unsplash.com/photo-1591389703635-e15a07609a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 5, 
    name: 'Yellowstone', 
    coordinates: { x: 18, y: 38 }, 
    threat: 'Grizzly Bears',
    description: 'With claws up to 4 inches long and jaws powerful enough to crush a bowling ball, these 800lb monsters can outrun a horse. They\'ve been known to continue attacking even after being shot.',
    color: '#EA384C',
    image: 'https://images.unsplash.com/photo-1525869916826-972885c91c1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 6, 
    name: 'Komodo Islands', 
    coordinates: { x: 77, y: 54 }, 
    threat: 'Komodo Dragons',
    description: 'These giant lizards have bacteria-filled mouths that cause sepsis. Their venom prevents blood clotting, causing victims to bleed out internally while being tracked for days.',
    color: '#33C3F0',
    image: 'https://images.unsplash.com/photo-1487252665478-49b61b47f302?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
];
