

# Full QA Audit Report & Fix Plan — Apex Predator Insurance

## AUDIT RESULTS

---

### A. PASSED ITEMS

| # | Item | Status |
|---|------|--------|
| 1 | Homepage loads, nav works | PASS |
| 2 | Plans page loads, shows products | PASS |
| 3 | Store page loads | PASS |
| 4 | Auth page (Sign in / Sign up) loads | PASS |
| 5 | Gallery page loads, shows 82 predators | PASS |
| 6 | Gallery search filter works | PASS |
| 7 | Gallery category filter works | PASS |
| 8 | Gallery rarity filter works | PASS |
| 9 | Gallery card click opens detail dialog | PASS |
| 10 | Novelty disclaimer banner shows on all pages | PASS |
| 11 | Footer shows correct legal text | PASS |
| 12 | "Support Wildlife Education" link in footer | PASS |
| 13 | Dead social media links removed | PASS |
| 14 | Predator data (85 animals) loads correctly | PASS |
| 15 | Each card shows name, rarity badge, danger level, price, kills/year | PASS |
| 16 | No JS errors in console | PASS |
| 17 | Articles page loads with 6 articles | PASS |
| 18 | Contact, About, Terms, Privacy, Disclaimer pages load | PASS |
| 19 | Donation page loads | PASS |
| 20 | /covered page loads | PASS |

---

### B. FAILED ITEMS

#### CRITICAL — STOP-SHIP

| # | Item | Details |
|---|------|---------|
| F1 | **Double Layout wrapper on ALL pages** | `App.tsx` line 62 wraps all routes in `<Layout>` (Navbar + Footer). But 26 page components ALSO wrap themselves in `<Layout>`. Every page renders **two navbars, two footers, two disclaimer banners**. This is why the gallery content appeared squeezed in screenshots. |
| F2 | **Hero still says "$50K Insurance"** | `ModernHero.tsx` line 88: `Get <span className="text-apex-red">$50K Insurance</span>`. This contradicts the novelty product messaging fixed everywhere else. |
| F3 | **11 images return HTTP 404** | Network requests confirm 11 Unsplash URLs are completely dead (not just wrong species — they return no image at all). Affected: tiger-shark, moray-eel, portuguese-man-o-war, snow-leopard, wolverine, tasmanian-devil, caiman, monitor-lizard, fer-de-lance, gaboon-viper (fabricated "tried" in ID), eastern-diamondback, black-widow, brazilian-wandering-spider, sydney-funnel-web |
| F4 | **~20 animals share duplicate images** | 9 insects share one URL. 3 snakes share one URL. 2 snakes share another. 3 eagles share one URL. 3 birds share one URL. Stingray = electric ray. Bobcat = mountain lion. |
| F5 | **`ImageWithFallback` does NOT show "Image unavailable"** | When an image 404s, it silently falls back to a category photo (e.g., all failed reptiles show the same crocodile). No "Image unavailable" text is shown. |
| F6 | **Blue shark image is a mountain/lake landscape** | `photo-1497436072909-60f360e1d4b1` loads (200 OK) but is the famous "green trees near body of water" Unsplash photo, not a shark. |

#### MODERATE

| # | Item | Details |
|---|------|---------|
| F7 | **Hero "supporter testimonials" use fake data** | Jake/Emma/Alex with stock photos, fake donation amounts ($100/$250/$50). These look like real customer endorsements for a novelty product. |
| F8 | **Hero says "Buy Insurance Now"** | Button text contradicts novelty messaging. Should be "Get Certificate Now" or "Browse Certificates". |
| F9 | **"89% Survival Rate" stat** | Floating stat on homepage — meaningless and misleading for a novelty product. |

---

### C. EXACT FIXES TO APPLY

#### Fix 1: Remove double Layout (CRITICAL)
**Problem:** `App.tsx` wraps all routes in `<Layout>`. 26 page files also wrap in `<Layout>`.
**Solution:** Remove `<Layout>` from `App.tsx` (lines 62 and 115). Keep it in each page component where it already exists. This is safer than the reverse because `Index.tsx` does NOT have its own `<Layout>`, so we'd need to add it there.

**Alternative (cleaner):** Remove `<Layout>` from all 26 page components and keep the single wrapper in `App.tsx`. Then check `Index.tsx` — it doesn't use Layout, which is correct if App.tsx provides it.

**Recommended approach:** Keep `<Layout>` in `App.tsx` only. Remove `import Layout` and `<Layout>...</Layout>` wrapper from all 26 page files. This is the standard React pattern.

**Files to change:** Gallery.tsx, Store.tsx, About.tsx, Contact.tsx, Terms.tsx, PrivacyPolicy.tsx, Disclaimer.tsx, Articles.tsx, ArticleDetail.tsx, Auth.tsx, Checkout.tsx, CertificatePage.tsx, CertificateVerify.tsx, Dashboard.tsx, AdminPortal.tsx, DonationPage.tsx, CoveredPage.tsx, ContentHub.tsx, PlatformAudit.tsx, Wholesale.tsx, PartnerPortal.tsx, PaymentFailure.tsx, PaymentSuccess.tsx (check each), TestimonialsPage.tsx, ChatPage.tsx, SocialHub.tsx

#### Fix 2: Fix Hero messaging (CRITICAL)
**File:** `src/components/ModernHero.tsx`
- Line 88: Change `$50K Insurance` → `Your Adventure Certificate`
- Line 93: Change "Real protection for real adventurers" → "The world's most fun novelty certificates for adventurers"
- Line 113: Change "Buy Insurance Now" → "Get Your Certificate"
- Remove "89% Survival Rate" stat (misleading)
- Change supporter testimonials text to remove "covered" language

#### Fix 3: Replace 11 dead image URLs (CRITICAL)
**File:** `src/utils/animalImageMappings.ts`

Verified replacement URLs (from Unsplash search results):

| Animal | Dead URL suffix | Replacement (verified Unsplash ID) |
|--------|----------------|-----------------------------------|
| tiger-shark | `5e0f9b2c2d3b` | Use `1640665733164-9d40c587f815` or fallback to marine |
| moray-eel | `54a921446c01` | `1546387907-f04f2a7589e5` |
| portuguese-man-o-war | `e8d67af77098` | Use box jellyfish as fallback or find jellyfish image |
| snow-leopard | `4a24dfdd94b9` | Search for snow leopard on Unsplash |
| wolverine | `9a56873571b7` | `clrmfepNQjE` (verified: wolverine with teeth bared) |
| tasmanian-devil | `9a56873571b7` | `ZlUDgym9AMM` (verified: tasmanian devils snarling) |
| caiman | `7338bbe83670` | Search for caiman/crocodile |
| monitor-lizard | `7338bbe83670` | Search for monitor lizard |
| fer-de-lance | `7b5c5ad1d3db` | Search for pit viper snake |
| gaboon-viper | `879de26tried` | Search for gaboon viper (fabricated ID!) |
| eastern-diamondback | `817625d9c685` | Search for rattlesnake |
| black-widow | `fb776fa7bad7` | `cpP8arL0V0c` (black and white spider on web) |
| brazilian-wandering-spider | `4b6a37a8fe52` | Search for large spider |
| sydney-funnel-web | `4b6a37a8fe52` | Different spider image |

During implementation, each replacement URL will be verified by fetching the Unsplash page to confirm the photo exists and shows the correct species.

#### Fix 4: Deduplicate shared images
**File:** `src/utils/animalImageMappings.ts`

Give unique images to:
- Each of the 9 insects (bullet-ant, tsetse-fly, kissing-bug, giant-asian-hornet, army-ant, africanized-bee, fire-ant, driver-ant, bot-fly) — currently all share `9d2a7deb7f62`
- `russells-viper` and `reticulated-python` — currently share `e68428a9e205` with black-mamba
- `inland-taipan` and `anaconda` — currently share `fd76ad50012f`
- `electric-ray` — currently same as `stingray`
- `bald-eagle` and `stellers-sea-eagle` — currently same as `harpy-eagle`
- `peregrine-falcon` and `goshawk` — currently same as `secretary-bird`
- `bobcat` — currently same as `mountain-lion`

Search Unsplash for each during implementation.

#### Fix 5: Add "Image unavailable" fallback state
**File:** `src/components/ImageWithFallback.tsx`
When the fallback also fails, show a styled placeholder with the animal's emoji icon and "Image unavailable" text instead of a broken image.

#### Fix 6: Fix blue shark image
**File:** `src/utils/animalImageMappings.ts`
Replace `photo-1497436072909-60f360e1d4b1` (landscape photo) with an actual blue shark image.

---

### D. UNRESOLVED BLOCKERS (Cannot fix automatically)

| # | Item | Owner |
|---|------|-------|
| 1 | Stripe secret key not configured | User — add to Supabase Edge Function secrets |
| 2 | No email provider configured | User — add Resend/SendGrid key |
| 3 | Printify integration doesn't exist | Business decision — keep "Coming Soon" or build |
| 4 | Social media profiles don't exist | User — create accounts |

---

### E. RELEASE RECOMMENDATION

## **HOLD**

**Reason:** The double-Layout bug renders every page with duplicate navigation and footer — this is immediately visible to every user. The hero still claims "$50K Insurance" which contradicts the novelty disclaimers on the same page. 11 animal images are completely broken (404). These are all fixable in this session.

**After fixes applied:** SHIP-ready at ~93%.

---

## IMPLEMENTATION ORDER

1. Remove `<Layout>` wrapper from all 26 page components (keep in App.tsx only)
2. Fix ModernHero messaging — remove "$50K Insurance", "Buy Insurance Now", fake stats
3. Replace all 11 dead image URLs with verified Unsplash photos
4. Deduplicate ~20 shared image URLs
5. Fix blue shark landscape image
6. Add "Image unavailable" fallback state to ImageWithFallback

**Estimated scope:** ~30 file edits, most are mechanical (remove Layout wrapper). Image URL replacement requires Unsplash verification during implementation.

