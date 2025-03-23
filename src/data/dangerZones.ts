
import { DangerZone } from "../models/DangerZone";

export const dangerZones: DangerZone[] = [
  { 
    id: 1, 
    name: 'Great Barrier Reef', 
    coordinates: { x: 82, y: 58 }, 
    threat: 'Great White Sharks',
    description: 'Home to massive sharks with 300 serrated teeth that can detect a single drop of blood from a mile away. Their bite force can exceed 4,000 PSI, enough to sever limbs in a single chomp.',
    color: '#0EA5E9',
    image: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 2, 
    name: 'Amazon Rainforest', 
    coordinates: { x: 30, y: 53 }, 
    threat: 'Jaguars',
    description: 'Silent killers that strike from above with the strongest bite force of any big cat. Their teeth can pierce through turtle shells and crocodile skulls, leaving victims with no chance of survival.',
    color: '#F97316',
    image: 'https://images.unsplash.com/photo-1551972873-b7e8754e8e26?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 3, 
    name: 'Serengeti', 
    coordinates: { x: 55, y: 53 }, 
    threat: 'African Lions',
    description: 'These predators hunt in packs and can bring down prey three times their size. A lion\'s claws are retractable and razor-sharp, capable of disemboweling with a single swipe, leaving prey to die in agony.',
    color: '#D946EF',
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 4, 
    name: 'Northern Australia', 
    coordinates: { x: 85, y: 57 }, 
    threat: 'Saltwater Crocodiles',
    description: 'These ancient monsters can exceed 20 feet in length with jaws that exert 3,700 PSI of pressure. They\'ve been known to consume entire humans in a single attack, dragging victims underwater to drown.',
    color: '#8B5CF6',
    image: 'https://images.unsplash.com/photo-1610058497388-5d1e6fcbb56c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 5, 
    name: 'Yellowstone', 
    coordinates: { x: 18, y: 38 }, 
    threat: 'Grizzly Bears',
    description: 'With claws up to 4 inches long and jaws powerful enough to crush a bowling ball, these 800lb monsters can outrun a horse. They\'ve been known to continue attacking even after being shot multiple times.',
    color: '#EA384C',
    image: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 6, 
    name: 'Komodo Islands', 
    coordinates: { x: 77, y: 54 }, 
    threat: 'Komodo Dragons',
    description: 'These giant lizards have bacteria-filled mouths that cause sepsis. Their venom prevents blood clotting, causing victims to bleed out internally while being tracked for days, ensuring a slow, agonizing death.',
    color: '#33C3F0',
    image: 'https://images.unsplash.com/photo-1610881728067-ff1cfbd0391c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
];
