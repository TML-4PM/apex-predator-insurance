

# Fix Gallery Images, Header Count, and Carousel Speed

## Problems (from screenshots)
1. **Images are wrong** — Black Mamba shows a mountain, Bull Shark shows an ocean wave, Mosquito shows Yosemite, Hippo shows a sunset. The Unsplash photo IDs in `animalImageMappings.ts` are landscapes/generic photos, not actual species images.
2. **Gallery header** still says "60" instead of "85+"
3. **Brand carousel** scrolls too slowly (30s)

## Changes

### 1. GalleryHeader count fix (1 file)
- `src/components/gallery/GalleryHeader.tsx` line 14: `all 60 deadly predators` → `all 85+ deadly predators`

### 2. Complete image mapping overhaul (1 file)
- `src/utils/animalImageMappings.ts` — Replace ALL Unsplash photo IDs with species-accurate ones. The current IDs are generic landscapes. Every animal gets a verified, species-correct Unsplash photo ID. Key fixes:
  - **Big Cats**: Keep lion/tiger (correct), fix snow leopard (currently same as leopard)
  - **Sharks**: Fix bull shark (currently a wave), tiger shark, etc.
  - **Snakes**: Fix black mamba (currently a mountain), all others
  - **Marine**: Fix jellyfish, octopus, stonefish, eels — all currently generic ocean shots
  - **Insects**: ALL 13 use the same spider photo — replace each with species-accurate image
  - **Birds**: Fix all raptors — currently generic bird shots
  - **Large mammals**: Fix hippo (currently a sunset), mosquito (Yosemite)
  - **Bears, canines, primates**: Fix duplicates

### 3. Faster carousel (2 files)
- `tailwind.config.ts` line 131: `scroll-x 30s` → `scroll-x 15s`
- `src/components/BrandCarousel.tsx`: Add gradient edge fade masks (left/right) for polished look, tighten gap from 16 to 10

## Files: 4 total
- `src/components/gallery/GalleryHeader.tsx`
- `src/utils/animalImageMappings.ts`
- `tailwind.config.ts`
- `src/components/BrandCarousel.tsx`

