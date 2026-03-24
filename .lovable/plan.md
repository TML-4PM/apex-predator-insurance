

# Full Audit & Launch Readiness Plan — Path to 90%+

## CRITICAL FINDING: Contradictory Legal Messaging (STOP-SHIP)

The site simultaneously claims:
- **Footer/CoveredPage/Layout banner**: "Novelty product only. Not real insurance. No actual coverage."
- **PaymentForm line 411**: "This is a real insurance product with a $50,000 accidental death benefit."
- **Terms.tsx**: "provides novelty insurance certificates with a real $50,000 accidental death benefit"
- **Disclaimer.tsx**: Full policy language describing accidental death coverage, beneficiaries, lump sum payments
- **CertificatePage.tsx**: "$50,000 accidental death benefit"
- **Hero.tsx**: "$50,000 accidental death benefit"
- **TravelerStories.tsx**: "Real adventures, real insurance, real peace of mind"

**This is a legal and regulatory risk.** The site must pick ONE position and be consistent. Based on the footer disclaimer and CoveredPage language, the correct position is: **novelty product, not real insurance.**

---

## Current State Summary

| Area | Status | Issue |
|------|--------|-------|
| Homepage | WORKS | Contradictory insurance claims |
| Plans/Products | WORKS | Emoji icons, functional CTAs |
| Checkout flow | WORKS (demo mode) | Stripe loads, demo mode fallback works, navigates to /covered correctly |
| Post-checkout /covered | WORKS | Shows success, novelty disclaimer present |
| Blog/Articles | STATIC | 6 hardcoded articles with lorem ipsum content — not automated, not from DB |
| Gallery | PARTIAL | Images fixed last round, depends on Unsplash URLs |
| Merchandise Store | PRETEND | Emoji placeholders, "Coming Soon" badge added |
| Donation page | WORKS | Form + Stripe session, same demo mode caveat |
| Certificate page | WORKS | But claims $50K accidental death benefit |
| Printify | DOES NOT EXIST | No code, no integration, no products |
| YouTube | PRETEND | Links to non-existent channel |
| Predator research data | EXISTS | ~85 animals in data files with facts, danger levels, habitats — used in gallery/plans |
| Charity element | PARTIAL | Donation page exists at /donate, linked from homepage, but prominently featured |

---

## Implementation Plan (Execution Order)

### Step 1: Fix contradictory messaging (CRITICAL)
Remove all references to "real insurance", "$50,000 accidental death benefit", and actual policy language. Standardize on novelty product messaging.

**Files to change:**
- `src/components/checkout/PaymentForm.tsx` line 411 — change to "Novelty certificate — not real insurance"
- `src/pages/Terms.tsx` — rewrite insurance claims to novelty product language
- `src/pages/Disclaimer.tsx` — rewrite from insurance policy to novelty product disclaimer
- `src/pages/CertificatePage.tsx` line 189 — remove "$50,000 accidental death benefit"
- `src/components/Hero.tsx` line 122 — remove "$50,000 accidental death benefit"
- `src/components/TravelerStories.tsx` line 42 — change "real insurance" to "real fun"

### Step 2: Make blog content real (not lorem ipsum)
The 6 articles in `Articles.tsx` and `ArticleDetail.tsx` have actual written content (not lorem ipsum in detail view — the detail page has real paragraphs). The listing page excerpts are real. **Blog is actually functional** — hardcoded but with real content. No automation needed for launch.

To make it pull from predator research data: add a "Predator Facts" section to each article that pulls fun facts, danger levels, and habitat info from the existing `src/data/animals/` files. This connects the research data to the blog.

### Step 3: Tone down charity/donation — make it subtle
Currently the homepage has a large "Community Support" section with "Support Our Mission" heading and prominent "Make a Donation" CTA. 

**Change to:** A subtle footer-area mention: "Support wildlife education" with a small text link to /donate, removing the large homepage section or converting it to a small banner.

### Step 4: Connect predator research to visible content
The site already has ~85 animals with detailed data (danger levels, habitats, fun facts) in `src/data/animals/`. These ARE the research files. They're used in:
- Gallery page (animal grid)
- Insurance plans (plan descriptions)
- Featured predators section on homepage

This is already working. The data IS being pulled from the research files.

### Step 5: Printify — honest assessment
No Printify code exists. No API integration, no product sync, no fulfilment. Options:
1. Remove merchandise store entirely
2. Keep as "Coming Soon" (current state after last fix)
3. Build Printify integration (requires API key, product catalog, webhook for orders — significant work)

**Recommendation for 90%+ launch:** Keep "Coming Soon" — it's honest and doesn't block launch.

### Step 6: Remove dead social links
Footer links to non-existent Instagram, Facebook, LinkedIn, YouTube profiles. Either:
- Create the profiles (manual action)
- Remove the links until profiles exist

---

## Post-Fix Reality Ledger

| Feature | Status After Fix |
|---------|-----------------|
| Homepage | REAL |
| Plans/Checkout | REAL (demo mode clearly labeled) |
| Blog/Articles | REAL (6 articles with real content) |
| Gallery | REAL (85 animals with images) |
| Predator Research | REAL (data files powering gallery + plans) |
| Certificate generation | REAL (post-purchase flow works) |
| Donation | REAL (subtle, not highlighted) |
| Auth system | REAL |
| World Map | REAL |
| Contact form | REAL |
| Merchandise | LABELED "Coming Soon" |
| Social links | REMOVED or profiles created |

## Estimated Launch Readiness After Fix: **92%**

## Files Changed
- `src/components/checkout/PaymentForm.tsx` — fix false insurance claim
- `src/pages/Terms.tsx` — rewrite to novelty language
- `src/pages/Disclaimer.tsx` — rewrite to novelty language  
- `src/pages/CertificatePage.tsx` — remove insurance benefit claim
- `src/components/Hero.tsx` — remove insurance benefit claim
- `src/components/TravelerStories.tsx` — fix "real insurance" text
- `src/pages/Index.tsx` — tone down donation section to subtle mention
- `src/components/Footer.tsx` — remove dead social links or add "coming soon" tooltips

