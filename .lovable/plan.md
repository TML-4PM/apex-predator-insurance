

# Remaining 3 Items — Implementation Plan

## Item 1: Connect Blog Articles to Predator Research Data

**Problem:** The Articles listing page (`Articles.tsx`) shows lorem ipsum content. The detail page (`ArticleDetail.tsx`) has real content but no connection to the ~85 predator research data files.

**Fix:**
- In `ArticleDetail.tsx`, add a "Predator Facts" sidebar/section after each article that maps the article's category to matching animals from `src/data/animalUtils.ts`
  - Shark article → pull shark species facts
  - Bear article → pull bear species facts
  - Lion article → pull big cat facts
  - Crocodile article → pull crocodilian facts
  - Snake article → pull venomous snake facts
  - Hippo article → pull hippo facts
- Each fact card shows: animal name, danger level (star rating), kills per year, 1-2 fun facts, and the animal's image from the mapping
- Add a `relatedAnimals` field to each blog post mapping to animal category/IDs
- In `Articles.tsx`, replace lorem ipsum `content` fields with real excerpt text (the excerpts are already real — the `content` field on the listing page is lorem ipsum but it's never displayed on the listing page, only on the detail page which already has real content). No change needed here — the listing page only shows `excerpt`, which is real.

**Files:** `src/pages/ArticleDetail.tsx`

## Item 2: Add Subtle Charity Link to Footer

**Problem:** The donation page exists at `/donate` but after removing the large homepage section, there's no visible link to it.

**Fix:** Add a single line to the Footer's Quick Links: "Support Wildlife Education →" linking to `/donate`, styled subtly (same as other footer links, not highlighted).

**File:** `src/components/Footer.tsx` — add one `<li>` to Quick Links

## Item 3: Final Image QA

**Problem:** Some Unsplash URLs may still 404 after the mapping rewrite. Need to verify the key images that appear on high-traffic pages (homepage hero, featured predators, article images, gallery).

**Fix:** Check console for 404 image errors. The article images use hardcoded Unsplash URLs that are different from the animal mapping — verify these 6 URLs are valid. If any are broken, replace with known-good alternatives.

**Files:** `src/pages/Articles.tsx` (6 image URLs), `src/pages/ArticleDetail.tsx` (same 4 image URLs)

---

## Technical Details

- Import `deadlyAnimals` from `@/data/animalUtils` in `ArticleDetail.tsx`
- Filter animals by matching category keywords (e.g., article category "Shark Safety" → filter animals where `category === 'marine'` and name includes "shark")
- Render a "Related Predators" grid of 2-4 animal cards below each article with image, name, danger level dots, and one fact
- Footer change is a single `<li>` addition — no structural changes

