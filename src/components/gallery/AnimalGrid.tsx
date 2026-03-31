
import React, { useState } from 'react';
import { MapPin, AlertCircle } from 'lucide-react';
import { DeadlyAnimal } from '@/data/types/DeadlyAnimal';

// Curated Wikimedia fallback images per category + specific animals
const WIKIMEDIA_FALLBACKS: Record<string, string> = {
  'great-white-shark':    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/White_shark.jpg/400px-White_shark.jpg',
  'tiger-shark':          'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Tiger_shark.jpg/400px-Tiger_shark.jpg',
  'bull-shark':           'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Bullshark_Beqa_Fiji_2007.jpg/400px-Bullshark_Beqa_Fiji_2007.jpg',
  'hammerhead-shark':     'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Scalloped_Hammerhead_Shark_Sphyrna_Lewini_%28226845659%29.jpeg/400px-Scalloped_Hammerhead_Shark_Sphyrna_Lewini_%28226845659%29.jpeg',
  'blue-shark':           'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Tibur%C3%B3n_azul_%28Prionace_glauca%29%2C_canal_Fayal-Pico%2C_islas_Azores%2C_Portugal%2C_2020-07-27%2C_DD_31.jpg/400px-Tibur%C3%B3n_azul_%28Prionace_glauca%29%2C_canal_Fayal-Pico%2C_islas_Azores%2C_Portugal%2C_2020-07-27%2C_DD_31.jpg',
  'saltwater-crocodile':  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/SaltwaterCrocodile%28%27Maximo%27%29.jpg/400px-SaltwaterCrocodile%28%27Maximo%27%29.jpg',
  'nile-crocodile':       'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Nile_crocodile_head.jpg/400px-Nile_crocodile_head.jpg',
  'african-lion':         'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg/400px-020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg',
  'siberian-tiger':       'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/P.t.altaica_Tomak_Male.jpg/400px-P.t.altaica_Tomak_Male.jpg',
  'bengal-tiger':         'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Bengal_tiger_in_Sanjay_Dubri_Tiger_Reserve_December_2024_by_Tisha_Mukherjee_11.jpg/400px-Bengal_tiger_in_Sanjay_Dubri_Tiger_Reserve_December_2024_by_Tisha_Mukherjee_11.jpg',
  'grizzly-bear':         'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/GrizzlyBearJeanBeaufort.jpg/400px-GrizzlyBearJeanBeaufort.jpg',
  'polar-bear':           'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Polar_Bear_-_Alaska_%28cropped%29.jpg/400px-Polar_Bear_-_Alaska_%28cropped%29.jpg',
  'hippopotamus':         'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Portrait_Hippopotamus_in_the_water.jpg/400px-Portrait_Hippopotamus_in_the_water.jpg',
  'african-elephant':     'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/African_Elephant_%28Loxodonta_africana%29_male_%2817289351322%29.jpg/400px-African_Elephant_%28Loxodonta_africana%29_male_%2817289351322%29.jpg',
  'leopard':              'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/African_leopard_male_%28cropped%29.jpg/400px-African_leopard_male_%28cropped%29.jpg',
  'jaguar':               'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Standing_jaguar.jpg/400px-Standing_jaguar.jpg',
  'mountain-lion':        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Mountain_Lion_in_Glacier_National_Park.jpg/400px-Mountain_Lion_in_Glacier_National_Park.jpg',
  'cheetah':              'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Male_cheetah_facing_left_in_South_Africa.jpg/400px-Male_cheetah_facing_left_in_South_Africa.jpg',
  'box-jellyfish':        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Avispa_marina_cropped.png/400px-Avispa_marina_cropped.png',
  'blue-ringed-octopus':  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Hapalochlaena_lunulata2.JPG/400px-Hapalochlaena_lunulata2.JPG',
  'orca':                 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Killerwhales_jumping.jpg/400px-Killerwhales_jumping.jpg',
  'stonefish':            'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Synanceia_verrucosa_Prague_2011_2.jpg/400px-Synanceia_verrucosa_Prague_2011_2.jpg',
  'stingray':             'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/SStringray.jpg/400px-SStringray.jpg',
  'moray-eel':            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Moray_eel.jpg/400px-Moray_eel.jpg',
  'cone-snail':           'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Textile_cone.JPG/400px-Textile_cone.JPG',
  'king-cobra':           'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Ophiophagus_hannah_2.jpg/400px-Ophiophagus_hannah_2.jpg',
  'black-mamba':          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Black_Mamba_2.jpg/400px-Black_Mamba_2.jpg',
  'cape-buffalo':         'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/African_buffalo_%28Syncerus_caffer_caffer%29_male_with_cattle_egret.jpg/400px-African_buffalo_%28Syncerus_caffer_caffer%29_male_with_cattle_egret.jpg',
  'snow-leopard':         'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Irbis4.JPG/400px-Irbis4.JPG',
  'portuguese-man-o-war': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Portuguese_Man-O-War_%28Physalia_physalis%29.jpg/400px-Portuguese_Man-O-War_%28Physalia_physalis%29.jpg',
  'sperm-whale':          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Mother_and_baby_sperm_whale.jpg/400px-Mother_and_baby_sperm_whale.jpg',
};

const CATEGORY_FALLBACKS: Record<string, string> = {
  marine:       'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/White_shark.jpg/400px-White_shark.jpg',
  terrestrial:  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg/400px-020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg',
  reptile:      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/SaltwaterCrocodile%28%27Maximo%27%29.jpg/400px-SaltwaterCrocodile%28%27Maximo%27%29.jpg',
  aerial:       'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/GrizzlyBearJeanBeaufort.jpg/400px-GrizzlyBearJeanBeaufort.jpg',
  insect:       'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Avispa_marina_cropped.png/400px-Avispa_marina_cropped.png',
};

const getBestImage = (animal: DeadlyAnimal): string => {
  if (WIKIMEDIA_FALLBACKS[animal.id]) return WIKIMEDIA_FALLBACKS[animal.id];
  if (animal.imageUrl && !animal.imageUrl.includes('placeholder') && !animal.imageUrl.includes('supabase')) return animal.imageUrl;
  return CATEGORY_FALLBACKS[animal.category] || WIKIMEDIA_FALLBACKS['great-white-shark'];
};

const RARITY_COLORS: Record<string, string> = {
  common:    'bg-gray-500',
  uncommon:  'bg-green-500',
  rare:      'bg-blue-500',
  legendary: 'bg-purple-500',
  mythic:    'bg-orange-500',
};

const DANGER_BG = ['', 'bg-green-500', 'bg-yellow-400', 'bg-orange-400', 'bg-red-500', 'bg-red-700'];

interface AnimalGridProps {
  animals: DeadlyAnimal[];
  isLoading: boolean;
  onAnimalClick: (animal: DeadlyAnimal) => void;
}

const AnimalCard = ({ animal, onClick }: { animal: DeadlyAnimal; onClick: () => void }) => {
  const [imgSrc, setImgSrc] = useState(getBestImage(animal));
  const [imgError, setImgError] = useState(false);

  const handleError = () => {
    if (!imgError) {
      setImgError(true);
      setImgSrc(CATEGORY_FALLBACKS[animal.category] || WIKIMEDIA_FALLBACKS['great-white-shark']);
    }
  };

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-lg transition-all duration-300 group"
      onClick={onClick}
    >
      {/* Photo */}
      <div className="aspect-[4/3] relative overflow-hidden bg-gray-900">
        <img
          src={imgSrc}
          alt={animal.name}
          onError={handleError}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          style={{ filter: 'brightness(0.85) saturate(1.05)' }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Rarity badge */}
        <div className="absolute top-3 left-3">
          <span className={`${RARITY_COLORS[animal.rarity]} text-white text-[10px] font-bold px-2 py-0.5 rounded-full capitalize`}>
            {animal.rarity}
          </span>
        </div>

        {/* Danger indicator */}
        <div className="absolute top-3 right-3 flex gap-0.5 items-center">
          {Array.from({ length: animal.dangerLevel }).map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full ${DANGER_BG[animal.dangerLevel]}`} />
          ))}
        </div>

        {/* Name on photo */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="font-bold text-white text-sm leading-tight">{animal.name}</div>
          <div className="text-white/60 text-[10px] flex items-center gap-1 mt-0.5">
            <MapPin className="w-2.5 h-2.5" />{animal.locations[0]}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{animal.icon}</span>
          <div>
            <div className="text-[10px] text-gray-400 capitalize">{animal.category}</div>
            <div className="text-xs font-semibold text-gray-600">{animal.killsPerYear.toLocaleString()}/yr deaths</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-black text-apex-red">US$9.99</div>
          <div className="text-[10px] text-gray-400">certificate</div>
        </div>
      </div>
    </div>
  );
};

const AnimalGrid = ({ animals, isLoading, onAnimalClick }: AnimalGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="rounded-xl overflow-hidden bg-gray-100 animate-pulse h-72" />
        ))}
      </div>
    );
  }

  if (animals.length === 0) {
    return (
      <div className="text-center py-20">
        <AlertCircle className="mx-auto h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-xl font-bold text-gray-500">No predators found</h3>
        <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {animals.map((animal, index) => (
        <div
          key={animal.id}
          className="animate-fade-up"
          style={{ animationDelay: `${(index % 12) * 40}ms` }}
        >
          <AnimalCard animal={animal} onClick={() => onAnimalClick(animal)} />
        </div>
      ))}
    </div>
  );
};

export default AnimalGrid;
