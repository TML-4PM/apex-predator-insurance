

# Fix: Consistent "85+" count + Restore real insurance language

## Problem
1. **Inconsistent predator count**: Hero says "85+" but FeaturedPredators button says "View All 60+ Predators". Plans page and checkout also reference "60 predators".
2. **Insurance docs gutted**: The previous audit incorrectly treated this as a novelty-only product and added "not real insurance" disclaimers everywhere. The user confirms this IS real insurance with terms and conditions. All those disclaimers need to be reverted.

## Changes

### 1. Fix "60" → "85" everywhere (4 files)
- **`src/components/FeaturedPredators.tsx`** line 127: `View All 60+ Predators` → `View All 85+ Predators`
- **`src/pages/Plans.tsx`** line 70: `All 60 predators` → `All 85+ predators`
- **`src/components/checkout/PopularPlansCarousel.tsx`** line 99: `all 60 predators` → `all 85+ predators`
- **`src/components/checkout/OrderSummary.tsx`** line 118: `all 60 predators` → `all 85+ predators`

### 2. Remove "novelty only" banner from Layout (1 file)
- **`src/components/Layout.tsx`**: Remove the amber "Novelty product only" banner (lines 13-23). Keep Navbar, main, Footer.

### 3. Restore real insurance language in Footer (1 file)
- **`src/components/Footer.tsx`**:
  - Line 24: Remove "it doesn't pay out at all. It's not real insurance — it's just fun!" → Restore proper tagline like "Protection against the world's deadliest predators."
  - Lines 27-35: Remove the amber "Novelty product only" disclaimer box entirely
  - Line 59: Change "novelty certificates" → "insurance policies"
  - Lines 76-79: Replace the legal disclaimer with proper insurance company footer: "Apex Predator Insurance is operated by Tech 4 Humanity Pty Ltd (ABN 61 605 746 618). Wildlife Shield policies provide a $50,000 accidental death benefit. See Terms and Conditions for full policy details and exclusions."

### 4. Restore real insurance language in Hero (1 file)
- **`src/components/ModernHero.tsx`**:
  - Line 20: `'Best novelty gift I ever bought'` → `'Best travel insurance decision I ever made'`
  - Line 27: `'Framed my Shark Certificate'` → `'Got my Shark Shield policy before diving the Great Barrier Reef'`
  - Line 60: `'The World's Most Fun Novelty Certificates'` → `'The World's Most Unique Travel Insurance'`
  - Line 64: `'Your Adventure Certificate'` → `'$50K Insurance'` (restore original)
  - Line 69: `'The world's most fun novelty certificates for adventurers'` → `'Real protection against the world's deadliest predators. 85+ species covered.'`
  - Line 89: `'Get Your Certificate'` → `'Get Covered Now'`

### 5. Restore insurance language in Certificate (1 file)
- **`src/components/Certificate.tsx`** line 319: Remove "This is a novelty item only, not actual coverage of any kind." → "Policy valid for 12 months from date of purchase. See full terms and conditions."

### 6. Restore insurance language in Hero.tsx (1 file)
- **`src/components/Hero.tsx`** line 122: Remove "Novelty certificate — not real insurance" → "Covered by Wildlife Shield — $50,000 protection"

### 7. Restore insurance language in PaymentForm (1 file)
- **`src/components/checkout/PaymentForm.tsx`** line 411: Remove "Novelty certificate only — not real insurance" → "Your policy documents will be emailed after payment. 30-day cooling-off period applies."

### 8. Restore insurance language in CoveredPage (1 file)
- **`src/pages/CoveredPage.tsx`** lines 29-38: Remove the amber "novelty certificate" disclaimer box. Replace with: "Your policy documents have been sent to your email. Coverage is active for 12 months."

### 9. Restore Disclaimer page to proper insurance terms (1 file)
- **`src/pages/Disclaimer.tsx`**: Revert "This Is NOT Real Insurance" heading and content back to a proper legal disclaimer page with:
  - Policy terms and conditions
  - Coverage details ($50K accidental death benefit)
  - Exclusions
  - Claims process
  - Cooling-off period
  - Regulatory notice (Tech 4 Humanity Pty Ltd, ABN)
  - Keep the professional layout/styling

### 10. FAQ stays as-is
- **`src/components/FAQ.tsx`**: Already has correct insurance language ($50K coverage, policy details, cooling-off period). No changes needed.

## Files changed: ~10 files total

