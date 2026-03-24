

# Fix All Wrong Animal Images — Complete URL Replacement

## Problem
Nearly every animal image is wrong. From screenshots and URL verification:
- **Box Jellyfish** shows an octopus
- **Saltwater/Nile Crocodile** shows an elephant
- **Hippopotamus** shows a dog (photo `1517849845537` is a famous dog portrait)
- **Gray Wolf/Dingo/Coyote** shows a man's face (photo `1507003211169` is a human portrait)
- **All insects** share one generic URL that may not even be an insect
- **All snakes** share one generic URL
- **All marine animals** (stonefish, barracuda, rays, eels) share one wrong URL
- **Category fallbacks** also use wrong URLs (reptile fallback shows elephant)

Many Unsplash photo IDs were fabricated — they show completely unrelated subjects.

## Root Cause
The file `src/utils/animalImageMappings.ts` has ~65 animals but many share duplicate, incorrect Unsplash photo IDs. Same problem in `src/utils/categoryFallbacks.ts`.

## Verified Correct Unsplash Photo IDs (from Unsplash pages)

| Animal | Verified Photo ID |
|--------|------------------|
| Box jellyfish | `photo-1571767594520-3106ddc752df` |
| Crocodile | `photo-1484620479898-57494cfedf1a` |
| Polar bear | `photo-1614720216135-c83575f58165` |
| Hippopotamus | `photo-1521762695480-fc8d4b6c3e63` |
| Gray wolf | `photo-1653915052544-57318d65b1ad` |
| King cobra | `photo-1572317584569-f652a3350a69` |
| Komodo dragon | `photo-1767986857017-0b1f95af57b1` |
| Orca | `photo-1768345074605-d760b5d2ecd6` |
| Golden eagle | `photo-1750797636255-8c939940bcad` |
| Scorpion | `photo-1531003914465-d6c6673bc635` |
| Chimpanzee | `photo-1742328114706-c38529d47f6b` |
| Cape buffalo | `photo-1764258562741-2b754c56e5f4` |
| African wild dog | `photo-1759145223076-aa96aa7ef122` |
| Spotted hyena | `photo-1692198025819-db9e0a6c9ebd` |

## Implementation Plan

### Step 1: Replace entire `src/utils/animalImageMappings.ts`
Rewrite with verified correct Unsplash photo IDs for every animal. For animals without a verified ID yet, search additional Unsplash pages during implementation to find correct ones. Each animal gets a unique, species-accurate image — no more sharing URLs between unrelated species.

### Step 2: Fix `src/utils/categoryFallbacks.ts`
Replace all 5 category fallback URLs with verified correct ones:
- marine → verified shark/ocean photo
- terrestrial → verified lion photo (current one may be correct)
- reptile → verified crocodile: `photo-1484620479898-57494cfedf1a`
- aerial → verified eagle: `photo-1750797636255-8c939940bcad`
- insect → verified scorpion: `photo-1531003914465-d6c6673bc635`

### Step 3: Verify remaining URLs during implementation
For animals I haven't verified yet (black widow, bullet ant, barracuda, moray eel, manta ray, anaconda, etc.), I'll search Unsplash during implementation to find correct photo IDs for each. Every single URL will be verified before being written.

### Files Changed
- `src/utils/animalImageMappings.ts` — complete rewrite (~65 animals)
- `src/utils/categoryFallbacks.ts` — 5 URL replacements

### No Other Files Change
The data files (`bigCats.ts`, `jellyfish.ts`, etc.) all call `getCompleteAnimalImageUrl()` which reads from the mapping. Fixing the mapping file fixes all images site-wide.

