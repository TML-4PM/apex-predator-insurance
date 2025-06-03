
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

interface ProductFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  rarityFilter: string;
  onRarityChange: (value: string) => void;
  dangerFilter: string;
  onDangerChange: (value: string) => void;
  locationFilter: string;
  onLocationChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  uniqueLocations: string[];
  filteredCount: number;
  totalCount: number;
}

export const ProductFilters = ({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  rarityFilter,
  onRarityChange,
  dangerFilter,
  onDangerChange,
  locationFilter,
  onLocationChange,
  sortBy,
  onSortChange,
  uniqueLocations,
  filteredCount,
  totalCount
}: ProductFiltersProps) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search by name, description, or location..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Select value={categoryFilter} onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="terrestrial">Terrestrial</SelectItem>
            <SelectItem value="marine">Marine</SelectItem>
            <SelectItem value="aerial">Aerial</SelectItem>
            <SelectItem value="reptile">Reptile</SelectItem>
            <SelectItem value="insect">Insect</SelectItem>
          </SelectContent>
        </Select>

        <Select value={rarityFilter} onValueChange={onRarityChange}>
          <SelectTrigger>
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

        <Select value={dangerFilter} onValueChange={onDangerChange}>
          <SelectTrigger>
            <SelectValue placeholder="Danger Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="1-2">Low (1-2)</SelectItem>
            <SelectItem value="3-4">High (3-4)</SelectItem>
            <SelectItem value="5">Extreme (5)</SelectItem>
          </SelectContent>
        </Select>

        <Select value={locationFilter} onValueChange={onLocationChange}>
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {uniqueLocations.slice(0, 20).map(location => (
              <SelectItem key={location} value={location}>{location}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="danger">Danger Level</SelectItem>
            <SelectItem value="price">Price</SelectItem>
            <SelectItem value="rarity">Rarity</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Filter className="w-4 h-4" />
          {filteredCount} of {totalCount}
        </div>
      </div>
    </div>
  );
};
