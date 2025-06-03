
// All routes in the application
export const APP_ROUTES = [
  { path: '/', name: 'Home' },
  { path: '/gallery', name: 'Gallery' },
  { path: '/product', name: 'Product' },
  { path: '/plans', name: 'Plans' },
  { path: '/articles', name: 'Articles' },
  { path: '/donate', name: 'Donate' },
  { path: '/about', name: 'About' },
  { path: '/contact', name: 'Contact' },
  { path: '/privacy', name: 'Privacy Policy' },
  { path: '/terms', name: 'Terms of Service' },
  { path: '/store', name: 'Store' },
  { path: '/wholesale', name: 'Wholesale' },
  { path: '/platform-audit', name: 'Platform Audit' }
];

// Supabase storage configuration
export const SUPABASE_URL = 'https://pflisxkcxbzboxwidywf.supabase.co';
export const STORAGE_BUCKETS = {
  deadly60: 'deadly60',
  animalImages: 'animal-images', 
  spottoImages: 'spotto-images',
  gallery: 'gallery-images'
};
