

# Fix Multiple Issues: Emails, Favicon, World Map, Testimonials, Footer, Checkout, Social Tags

## Issues identified (from screenshots + code)

1. **Certificate preview is flat** — OrderSummary shows a plain black box with text, not the actual Certificate component
2. **World Map is a black screen with dots** — Unsplash backgrounds aren't rendering as a usable map
3. **Footer wastes space** — T4H injected footer in index.html (lines 56-61) + BrandCarousel at top of footer is excessive
4. **Emails still say tech4humanity** — Footer (2x), Terms, Disclaimer (3x), index.html footer
5. **Favicon/OG images** — Still using shark photo, needs droid head
6. **Social tags wrong** — `@ApexPredatorIns` + `#ApexPredatorProofGlobal` in Testimonials.tsx and TestimonialsPage.tsx
7. **Testimonial images all the same** — 5 of 6 globalTestimonials use `photo-1506905925346-21bda4d32df4`
8. **GroupPurchase issues** — "2,847 groups" not "10K+", "% saved this month" makes no sense, "Skip Group - Buy Solo" button does nothing
9. **"Novelty Gift Trend"** still on Index.tsx line 37
10. **NFT not hooked up** — EnhancedCertificateSystem mentions NFT/blockchain but it's just UI text, no actual integration
11. **TestimonialsPage buttons don't work** — "Get Your Certificate" and "Follow Our Journey" have no links

---

## Changes

### 1. `index.html` — Favicon, OG image, remove T4H footer
- Replace all favicon/icon URLs (lines 8-11) with `https://lzfgigiyqpuuxslsygjt.supabase.co/storage/v1/object/public/images/AHC%20droid%20head.webp`
- Replace OG image (line 26) and Twitter image (line 36) with same
- Replace logo in structured data (line 45) with same
- Remove the T4H injected footer block (lines 56-61)

### 2. `src/components/Footer.tsx` — Email update, remove carousel, compact
- Replace `contact@tech4humanity.com.au` → `contact@apexpredatorinsurance.com` (lines 28, 53-54)
- Remove `Full Contact Information →` link — just show the email
- Remove `<BrandCarousel />` import and usage (line 9) — move the 4 brand links into a simple inline row within the footer copyright area
- This eliminates the "biggest waste of space"

### 3. `src/components/BrandCarousel.tsx` — Delete or keep as unused
- Remove from Footer. File can remain but won't be imported.

### 4. `src/pages/Terms.tsx` — Email update (line 67)
- `contact@tech4humanity.com.au` → `contact@apexpredatorinsurance.com`

### 5. `src/pages/Disclaimer.tsx` — Email updates (lines 179, 197, 216)
- All 3 instances → `contact@apexpredatorinsurance.com`

### 6. `src/pages/Index.tsx` — Fix "Novelty Gift Trend" (line 37)
- Change to `'Travel Insurance Trend'`

### 7. `src/components/WorldMap.tsx` — Replace broken map with SVG continent outlines
- Remove the 5 stacked Unsplash divs (lines 88-108)
- Replace with an inline SVG containing simplified world continent paths (stroke-only, subtle fill) so zones have geographic context
- Keep the ZoneMarker/ZoneDetails/ZoneConnections logic intact

### 8. `src/components/worldmap/ZoneMarker.tsx` — Better markers
- Show zone name label permanently (not just on hover)
- Use zone-specific color for the marker dot always (not just when active)

### 9. `src/components/worldmap/ZoneDetails.tsx` — Add "Get Covered" CTA
- Add a `<Link to="/plans">` button "Get Covered →" next to the Share button
- Keep existing share functionality

### 10. `src/components/Testimonials.tsx` — Fix social tags (line 168)
- `@ApexPredatorIns` → `@ApexPredatorInsurance`
- `#ApexPredatorProofGlobal` → `#ApexPredatorInsurance`

### 11. `src/pages/TestimonialsPage.tsx` — Fix images, social tags, buttons
- Replace duplicate mountain images with unique destination photos:
  - Machu Picchu → `photo-1526392060635-9d6019884377`
  - Scottish Highlands → `photo-1506377585622-bedcbb027afc`
  - Rio Carnival → `photo-1483729558449-99ef09a8c325` (already correct for #3)
  - Maldives → `photo-1514282401047-d79a71a590e8`
  - Mount Fuji → `photo-1490806843957-31f4c9a91c65`
  - Kruger National Park → `photo-1516426122078-c23e76319801`
- Fix social tags (lines 142-148): same as Testimonials
- Fix buttons (lines 243-249): Wrap "Get Your Certificate" in `<Link to="/plans">`, "Follow Our Journey" in `<a href="https://instagram.com/ApexPredatorInsurance">`

### 12. `src/components/GroupPurchase.tsx` — Fix stats and button
- Change "2,847 groups" → "10,000+ groups" (line 165) to match social proof standards
- Remove the "% saved this month" stat entirely (lines 167-169)
- Make "Skip Group - Buy Solo" button functional: add `onClick` to scroll to the checkout form or link to the form section

### 13. `src/components/checkout/OrderSummary.tsx` — Use ViralCertificate for preview
- Replace the flat black box certificate preview (lines 150-178) with the `<ViralCertificate>` component in preview mode (`isPreview={true}`)
- This gives an actual visual certificate preview instead of plain text

### 14. NFT status note
- The NFT/blockchain mentions in `EnhancedCertificateSystem.tsx` are UI labels only — no actual blockchain integration exists. Will add a note: these are planned feature labels, not functional. No code change needed unless you want them removed.

---

## Files modified: 12
- `index.html`
- `src/components/Footer.tsx`
- `src/pages/Terms.tsx`
- `src/pages/Disclaimer.tsx`
- `src/pages/Index.tsx`
- `src/components/WorldMap.tsx`
- `src/components/worldmap/ZoneMarker.tsx`
- `src/components/worldmap/ZoneDetails.tsx`
- `src/components/Testimonials.tsx`
- `src/pages/TestimonialsPage.tsx`
- `src/components/GroupPurchase.tsx`
- `src/components/checkout/OrderSummary.tsx`

