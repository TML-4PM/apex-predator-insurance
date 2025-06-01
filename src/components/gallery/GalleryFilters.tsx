
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GalleryFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedRarity: string;
  setSelectedRarity: (rarity: string) => void;
  totalAnimals: number;
  filteredCount: number;
}

const GalleryFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedRarity,
  setSelectedRarity,
  totalAnimals,
  filteredCount
}: GalleryFiltersProps) => {
  return (
    <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-apex-darkgray/60" size={20} />
          <Input
            placeholder="Search predators..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full md:w-64"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="marine">Marine</SelectItem>
            <SelectItem value="terrestrial">Terrestrial</SelectItem>
            <SelectItem value="reptile">Reptile</SelectItem>
            <SelectItem value="aerial">Aerial</SelectItem>
            <SelectItem value="insect">Insect</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedRarity} onValueChange={setSelectedRarity}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Rarity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Rarities</SelectItem>
            <SelectItem value="common">Common</SelectItem>
            <SelectItem value="uncommon">Uncommon</SelectItem>
            <SelectItem value="rare">Rare</SelectItem>
            <SelectItem value="legendary">Legendary</SelectItem>
            <SelectItem value="mythic">Mythic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="text-sm text-apex-darkgray/60">
        Showing {filteredCount} of {totalAnimals} predators
      </div>
    </div>
  );
};

export default GalleryFilters;
