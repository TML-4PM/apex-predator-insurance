

# Full Site Audit & Repair Plan — Apex Predator Insurance

## EXECUTIVE STATUS

**Launch readiness: ~55%**
**Critical blockers: 5**
**Estimated fix time: 1 session**

---

## 1. BUILD ERRORS (STOP-SHIP — 19 errors blocking deployment)

### A. SubscriptionManager imports non-existent functions
**File:** `src/components/checkout/SubscriptionManager.tsx` lines 6-9
**Problem:** Imports `fetchSubscription`, `updateSubscription`, `cancelSubscription`, `reactivateSubscription` from `@/lib/stripeClient` — these exports don't exist.
**Fix:** Add stub implementations to `src/lib/stripeClient.ts` that call the Supabase edge function, or remove SubscriptionManager from the build since it's not wired to any route anyway.

### B. Edge function TypeScript errors (14 errors across 5 files)
All are the same two patterns:
1. **`error` is of type `unknown`** — need `(error as Error).message` in catch blocks
2. **`options` typed as `{}`** — need `Record<string, any>` in `getPaymentMethodOptions`
3. **`allNewContent` implicit `any[]`** — needs explicit type annotation

**Files to fix:**
- `supabase/functions/crawl-content/index.ts` — type `allNewContent` and `error`
- `supabase/functions/create-payment-intent/index.ts` — type `options` as `Record<string, any>`
- `supabase/functions/generate-risk-card/index.ts` — type `error`
- `supabase/functions/get-user-notifications/index.ts` — type `error`
- `supabase/functions/process-content-ai/index.ts` — type `error`
- `supabase/functions/webhook-handler/index.ts` — type 4 `emailError`/`error` catches

---

## 2. BROKEN ROUTES & NAVIGATION

### Sitemap lists non-existent routes
- `/claims` — no route exists, no page exists → **404 for Google**
- `/faq` — no route exists (FAQ is a component on Index, not a page) → **404 for Google**

**Fix:** Update `public/sitemap.xml` to only list real routes: `/`, `/about`, `/plans`, `/store`, `/gallery`, `/contact`, `/testimonials`, `/articles`, `/terms`, `/privacy`, `/disclaimer`

### Mobile menu links to `/settings` — no route exists
**File:** `src/components/navbar/MobileMenu.tsx` line 87
**Fix:** Change to `/dashboard` or remove

### Certificate route mismatch
Checkout navigates to `/certificate` (no param) but route expects `/certificate/:animalName`. Post-purchase flow will 404.
**Fix:** Update `handlePaymentSuccess` in `Checkout.tsx` to navigate to `/covered` (which exists) or create a general certificate route.

---

## 3. REALITY LEDGER

| Feature | Status | Evidence |
|---------|--------|----------|
| Homepage | REAL | Renders, CTAs link to /plans |
| Plans page | REAL | Lists products, add to cart works |
| Cart system | REAL | localStorage-backed, persists |
| Checkout form | PARTIAL | Form renders, Stripe loads, but falls back to "demo mode" if no STRIPE_SECRET_KEY |
| Payment processing | PRETEND | Edge function returns demoMode when no key configured |
| Subscription management | PRETEND | Imports non-existent functions, will crash if accessed |
| Gallery | PARTIAL | Page loads but images depend on external URLs that may break |
| Store/Merchandise | PRETEND | Emoji placeholders, no real products, "Add to Cart" goes nowhere |
| Blog/Articles | PARTIAL | Loads but content is from Supabase — may be empty |
| Certificate generation | PARTIAL | Preview works, post-purchase flow navigates to wrong route |
| Social/Community | PARTIAL | UI renders, requires auth for interaction |
| YouTube integration | PRETEND | Links to non-existent channel |
| Printify integration | PRETEND | No Printify code exists anywhere in the codebase |
| Email flows | PRETEND | Edge functions reference email sending but no email provider configured |
| Donation page | PARTIAL | Loads, uses Stripe session — same demo mode issue |
| World Map | REAL | Interactive SVG renders |
| Contact form | PARTIAL | Form exists, submission goes to Supabase |
| Auth system | REAL | Supabase auth configured |
| PWA/Install prompt | REAL | Service worker registered |

**Counts: REAL: 6 | PARTIAL: 7 | PRETEND: 5**

---

## 4. IMAGE AUDIT

- **Hero background:** Unsplash URL — works but relies on external CDN
- **Supporter testimonials:** 3 Unsplash face URLs — works
- **Gallery animals:** Previous fix applied Unsplash fallbacks — should work but fragile
- **Merchandise Store:** All products show 🎯 emoji, no real images
- **Insurance Plans:** Emoji icons (🦈🦁🐻) — acceptable for novelty product
- **No Supabase storage bucket images loading** — bucket URLs are non-functional

---

## 5. CHECKOUT FLOW AUDIT

1. Add to cart → **WORKS** (localStorage)
2. Navigate to /checkout → **WORKS** (state passed via router)
3. Fill form → **WORKS** (validation present)
4. Stripe Elements load → **WORKS** (test key hardcoded)
5. Payment submission → **DEMO MODE** (no STRIPE_SECRET_KEY in edge function secrets)
6. Post-payment redirect → **BROKEN** (navigates to `/certificate` which 404s)

---

## 6. IMPLEMENTATION PLAN (Execution Order)

### Step 1: Fix all build errors
- Add 4 stub exports to `src/lib/stripeClient.ts` for subscription functions
- Fix all edge function TypeScript errors (type annotations on catch blocks and options object)

### Step 2: Fix broken routes
- Update sitemap.xml to only list real routes
- Fix `/settings` link in MobileMenu to `/dashboard`
- Fix post-checkout navigation to `/covered` instead of `/certificate`

### Step 3: Fix checkout post-payment flow
- In `Checkout.tsx`, change `navigate('/certificate', ...)` to `navigate('/covered', ...)`

### Step 4: Clean up pretend features
- Remove "Compare Savings" button in Store (does nothing)
- Remove "Join Waitlist" button in MerchandiseStore (does nothing)
- Merchandise "Add to Cart" should either work or be labeled "Coming Soon"

### Step 5: Sitemap & SEO
- Remove `/claims` and `/faq` from sitemap
- Add real routes to sitemap

---

## 7. ESCALATION — Cannot Fix Automatically

| Item | Action Required | Where |
|------|----------------|-------|
| Stripe payments | Add `STRIPE_SECRET_KEY` to Supabase Edge Function secrets | Supabase Dashboard → Settings → Functions |
| Printify integration | Does not exist — needs full implementation or removal from marketing | Business decision |
| YouTube channel | Channel doesn't exist — create or remove links | YouTube + Footer.tsx |
| Email sending | No email provider (Resend/SendGrid) configured | Supabase secrets |
| Social media links | Point to non-existent profiles | Create profiles or remove links |

---

## 8. FINAL VERDICT

## ⚠️ READY WITH RISKS

The site can launch as a **novelty certificate store** if:
1. Build errors are fixed (blocking deployment)
2. Post-checkout flow is fixed (broken user journey)
3. Sitemap is corrected (SEO damage)
4. Stripe secret key is added (or demo mode is clearly communicated to users)

The merchandise store, subscription management, YouTube, and Printify integrations are **not real** and should either be removed or clearly marked as "Coming Soon" before launch.

