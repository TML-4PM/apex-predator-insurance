

# Audit and Fix All 82 Predator Gallery Images

## Problem
The majority of images in `src/utils/animalImageMappings.ts` are wrong — showing landscapes, unrelated animals, objects (honey jars, dartboards, confetti, Moulin Rouge posters), or reusing the same photo across multiple unrelated species. Nearly every Unsplash photo ID is inaccurate.

## Root Cause
The Unsplash photo IDs in the mapping file don't correspond to the named species. Many IDs are duplicated with only `w=` or `h=` param changes to make them appear unique, but they resolve to the same wrong image.

## Duplicate Analysis
Current duplicates that must each get unique IDs:
- `photo-1563387852-93abc57745e4` used for bullet-ant, army-ant, fire-ant, driver-ant (4x)
- `photo-1558642452-9d2a7deb7f62` used for tsetse-fly, africanized-bee (2x)
- `photo-1559567349-751f7d2ae68a` used for giant-asian-hornet, bot-fly (2x)
- `photo-1568545813163-84cfd019cfbf` used for sydney-funnel-web, black-widow (2x)
- `photo-1531386151447-fd76ad50012f` used for inland-taipan, black-mamba (2x)
- `photo-1585095595205-e68428a9e205` used for eastern-diamondback, reticulated-python (2x)
- `photo-1504450874802-0ba2bcd659e3` used for anaconda, monitor-lizard (2x)
- `photo-1621451537084-482c73073a0f` used for moray-eel, manta-ray (2x)
- `photo-1557050543-4d5f4e07ef46` used for african-elephant, spotted-hyena (2x)

## Plan — Single File Change

**File: `src/utils/animalImageMappings.ts`**

Replace the entire `COMPLETE_IMAGE_MAPPING` object with verified, species-accurate Unsplash photo IDs. Every single entry gets a new, unique ID sourced from Unsplash search results confirmed to show the correct species as a single-subject photo.

### Verified replacement IDs (from Unsplash search):

**Big Cats** (8 entries) — lion and tigers are likely correct, fix jaguar, mountain-lion, cheetah, snow-leopard with verified IDs

**Bears** (6 entries) — replace all:
- grizzly-bear → `_r6w0R6SueQ` (brown grizzly close-up)
- polar-bear → `bySoVNCijy4` (polar bear on snow)
- kodiak-bear → `qBT44OJWNd8` (grizzly portrait)
- black-bear → `o1PU3O2lIYQ` (black bear close-up)
- sloth-bear, sun-bear → unique bear IDs

**Large Mammals** (4) — hippo → `9aeVbHJ-qYw` (hippo close-up)

**Sharks** (5) — all new:
- tiger-shark → `EQ4iwkcBn-s`
- hammerhead → `v4xMAiisCx0`
- bull-shark → `GBDkr3k96DE` or `oL9jOEfSR_M`

**Marine** (12 entries) — all new:
- moray-eel → `BItcNtj9YQI` (green moray)
- barracuda → `che3vcPwhyg`
- manta-ray → `GBLeUykTjDs`
- stingray → `Ky3da6_hgcM`

**Reptiles** (13 entries) — fix snakes, lizards:
- komodo-dragon → `4yPZXZAETlU`
- black-mamba, inland-taipan → unique snake IDs

**Birds** (8 entries) — all new:
- golden-eagle → `HDkESH18v2Q`
- bald-eagle → `AqRhZbyWLR0`
- harpy-eagle, peregrine-falcon, goshawk → unique raptor IDs

**Insects** (13 entries) — completely broken, all new:
- scorpion → `wucrF8300GA`
- hornet → `3z56aMRpjJ0`
- Each ant, fly, bee, spider gets a distinct macro photo

**Canines** (4) — all new unique IDs
**Carnivores** (4) — all new unique IDs  
**Primates** (2) — verify/replace

### Validation Pass
After replacing all IDs, every entry will be cross-checked:
1. No duplicate photo IDs across any two different animals
2. Every URL uses consistent `?w=400&h=400&fit=crop` params
3. Total count matches the animal data arrays (82+ entries)

## Files Modified: 1
- `src/utils/animalImageMappings.ts` — full rewrite of all ~82 image URLs

## What stays the same
- Card layout, crop ratio, styling — untouched
- Animal data files (names, descriptions, categories) — untouched
- `ImageWithFallback` component and fallback logic — untouched

