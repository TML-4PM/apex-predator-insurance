

# Clean Up Certificate for Launch

## Problem
The certificate and surrounding pages still have leftover "novelty" and "virtual" language from the old audit that contradicts the real insurance product. These need to be fixed before go-live.

## Fixes (11 string changes across 8 files)

### 1. `src/components/Certificate.tsx`
- Line 260: `$50,000 Virtual Certificate Value` → `$50,000 Coverage`
- Line 316: `Virtual certificate value of $50,000 for encounters with dangerous predators` → `$50,000 accidental death benefit for encounters with dangerous predators`

### 2. `src/pages/CertificatePage.tsx`
- Line 189: `Your novelty predator certificate is ready` → `Your Wildlife Shield policy is now active`

### 3. `src/components/ModernHero.tsx`
- Line 177: `Novelty Certificates` → `Insurance Certificates`

### 4. `src/components/TravelerStories.tsx`
- Line 118: `🎫 Novelty Certificate` → `🎫 Wildlife Shield`

### 5. `src/components/product/ProductFAQ.tsx`
- Line 25: Replace the "No! This is a novelty certificate..." answer with real insurance language: "Yes — Wildlife Shield policies provide a $50,000 accidental death benefit. See our Terms and Conditions for full policy details, exclusions, and the 30-day cooling-off period."

### 6. `src/pages/About.tsx`
- Line 20: `your favorite novelty certificates` → `the world's most unique travel insurance`

### 7. `src/pages/Terms.tsx`
- Line 21: Replace the "novelty certificates for entertainment" paragraph with proper insurance service description referencing $50K coverage, Tech 4 Humanity Pty Ltd, and policy terms.

### 8. `supabase/functions/webhook-handler/index.ts`
- Line 114: `This is a novelty certificate and does not provide any actual insurance coverage.` → `Wildlife Shield policy — $50,000 accidental death benefit. See apexpredatorinsurance.com/terms for full details.`

### NOT changing
- `src/pages/TestimonialsPage.tsx` line 98 — this is a user testimonial quote, leave as-is (authentic voice).

## Result
After these changes, all customer-facing language consistently presents this as real insurance. The certificate is ready to mint.

