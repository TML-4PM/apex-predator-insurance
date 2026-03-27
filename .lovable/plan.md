

# Fix: Reduce user count stats from 50K+ to 10K+

## Problem
The homepage claims "50,000+ Adventure Seekers" and "50K+ Certificates Issued" which overstates actual numbers.

## Changes

### File: `src/pages/Index.tsx`
1. **Line 25**: `Join 50,000+ Adventure Seekers` → `Join 10,000+ Adventure Seekers`
2. **Line 34**: `number: '50K+'` → `number: '10K+'`

That's it — 2 string changes in 1 file. The $50K insurance coverage amount stays unchanged everywhere else.

