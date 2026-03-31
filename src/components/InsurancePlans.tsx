
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Plus, Trash2, Star, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
  SheetFooter, SheetClose, SheetTrigger
} from '@/components/ui/sheet';
import Certificate, { CertTier } from './Certificate';
import { deadlyAnimals } from '@/data/deadlyAnimals';
import type { DeadlyAnimal } from '@/data/types/DeadlyAnimal';
import { BUNDLE_PLANS, ULTIMATE_BUNDLE } from '@/constants/pricing/bundlePlans';

// ── Tier options shown above the grid ────────────────────────────────────
const TIERS = [
  {
    id: 'individual' as CertTier,
    label: 'Individual',
    price: 9.99,
    desc: 'Pick any predator',
    badge: null,
    highlight: false,
  },
  {
    id: 'top25' as CertTier,
    label: 'Top 25 Pack',
    price: 79.00,
    desc: '25 iconic predators',
    badge: 'BEST VALUE',
    highlight: true,
  },
  {
    id: 'ultimate' as CertTier,
    label: 'All 60 Predators',
    price: 119.99,
    desc: 'Complete collection',
    badge: 'ULTIMATE',
    highlight: false,
  },
];

const DANGER_COLORS = ['', 'bg-green-500', 'bg-yellow-400', 'bg-orange-400', 'bg-red-500', 'bg-red-700'];
const RARITY_COLORS: Record<string, string> = {
  common: 'text-gray-400',
  uncommon: 'text-green-400',
  rare: 'text-blue-400',
  legendary: 'text-yellow-400',
  mythic: 'text-red-400',
};

interface CartItem {
  id: string;
  name: string;
  price: number;
  icon: string;
  imageUrl: string;
}

const InsurancePlans = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedAnimal, setSelectedAnimal] = useState<DeadlyAnimal>(deadlyAnimals[0]);
  const [selectedTier, setSelectedTier] = useState<CertTier>('individual');
  const [previewName, setPreviewName] = useState('Your Name');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cartItems');
      if (stored) setCartItems(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const filtered = useMemo(() => {
    let list = deadlyAnimals;
    if (search) {
      const s = search.toLowerCase();
      list = list.filter(a =>
        a.name.toLowerCase().includes(s) ||
        a.category.includes(s) ||
        a.locations.some(l => l.toLowerCase().includes(s))
      );
    }
    if (activeTab !== 'all') {
      list = list.filter(a => a.category === activeTab);
    }
    return list;
  }, [search, activeTab]);

  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const cartTotal = cartItems.reduce((s, i) => s + i.price, 0);

  const addToCart = (animal: DeadlyAnimal) => {
    if (cartItems.some(i => i.id === animal.id)) {
      toast({ title: 'Already in cart', description: animal.name, variant: 'default' });
      return;
    }
    setCartItems(prev => [...prev, {
      id: animal.id, name: animal.name,
      price: animal.price, icon: animal.icon, imageUrl: animal.imageUrl
    }]);
    toast({ title: '✓ Added', description: animal.name });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => setCartItems(prev => prev.filter(i => i.id !== id));

  const checkout = () => {
    if (!cartItems.length) return;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    navigate('/checkout', { state: { cartItems } });
  };

  const selectAnimal = (a: DeadlyAnimal) => {
    setSelectedAnimal(a);
    if (selectedTier !== 'individual') setSelectedTier('individual');
  };

  const selectTier = (t: CertTier) => {
    setSelectedTier(t);
  };

  return (
    <section id="plans-section" className="py-10 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Tier selector ── */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-center text-apex-black mb-6">Choose Your Pack</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {TIERS.map(t => (
              <button
                key={t.id}
                onClick={() => selectTier(t.id)}
                className={`relative rounded-2xl p-5 text-left border-2 transition-all duration-200 ${
                  selectedTier === t.id
                    ? 'border-apex-red bg-apex-red/5 shadow-lg scale-[1.02]'
                    : 'border-gray-200 bg-white hover:border-apex-red/50'
                }`}
              >
                {t.badge && (
                  <span className={`absolute -top-3 left-4 text-xs font-black px-2.5 py-0.5 rounded-full text-white ${t.highlight ? 'bg-apex-red' : 'bg-gray-800'}`}>
                    {t.badge}
                  </span>
                )}
                <div className="text-sm font-semibold text-gray-500 mb-1">{t.desc}</div>
                <div className="text-xl font-black text-apex-black">US${t.price.toFixed(2)}</div>
                <div className="text-sm font-semibold text-apex-black mt-0.5">{t.label}</div>
                {selectedTier === t.id && (
                  <div className="absolute bottom-3 right-3 w-4 h-4 rounded-full bg-apex-red flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Main 2-col layout ── */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT — animal grid */}
          <div className="flex-1 min-w-0">

            {/* Search + cart */}
            <div className="flex gap-3 mb-5">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search predators, locations…"
                  className="pl-9"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                />
              </div>
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="relative shrink-0">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Cart
                    {cartItems.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-apex-red text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {cartItems.length}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Cart ({cartItems.length})</SheetTitle>
                    <SheetDescription>{cartItems.length === 0 ? 'Empty' : `Total: US$${cartTotal.toFixed(2)}`}</SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-3">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-center gap-3 py-2 border-b">
                        <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">US${item.price.toFixed(2)}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <SheetFooter className="gap-2 flex-col sm:flex-row">
                    <Button variant="outline" onClick={() => setCartItems([])} className="w-full sm:w-auto">Clear</Button>
                    <SheetClose asChild>
                      <Button onClick={checkout} className="w-full sm:w-auto bg-apex-red hover:bg-apex-red/90">
                        Checkout — US${cartTotal.toFixed(2)}
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>

            {/* Category tabs */}
            <Tabs defaultValue="all" onValueChange={v => { setActiveTab(v); setPage(1); }} className="mb-5">
              <TabsList className="flex flex-wrap gap-1 h-auto bg-gray-100 p-1 rounded-lg">
                {['all', 'marine', 'terrestrial', 'reptile', 'aerial', 'insect'].map(cat => (
                  <TabsTrigger key={cat} value={cat} className="capitalize text-xs px-3 py-1.5 rounded-md">
                    {cat === 'all' ? 'All' : cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <p className="text-sm text-gray-400 mb-4">{filtered.length} predators{search ? ` matching "${search}"` : ''}</p>

            {/* Animal grid — photo cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {paged.map(animal => {
                const isSelected = selectedAnimal.id === animal.id;
                return (
                  <button
                    key={animal.id}
                    onClick={() => selectAnimal(animal)}
                    className={`relative rounded-xl overflow-hidden text-left transition-all duration-200 group border-2 ${
                      isSelected ? 'border-apex-red shadow-lg scale-[1.02]' : 'border-transparent hover:border-apex-red/40'
                    }`}
                  >
                    {/* Photo */}
                    <div className="relative h-32 sm:h-36 overflow-hidden bg-gray-900">
                      <img
                        src={animal.imageUrl}
                        alt={animal.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                        style={{ filter: 'brightness(0.82) saturate(1.05)' }}
                        onError={e => { (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/White_shark.jpg/400px-White_shark.jpg'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                      {/* Danger dots */}
                      <div className="absolute top-2 right-2 flex gap-0.5">
                        {Array.from({ length: animal.dangerLevel }).map((_, i) => (
                          <div key={i} className={`w-1.5 h-1.5 rounded-full ${DANGER_COLORS[animal.dangerLevel]}`} />
                        ))}
                      </div>

                      {/* Rarity */}
                      <span className={`absolute top-2 left-2 text-[9px] font-black uppercase tracking-wider ${RARITY_COLORS[animal.rarity]}`}>
                        {animal.rarity}
                      </span>

                      {/* Name overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-2">
                        <div className="text-white font-bold text-xs leading-tight">{animal.name}</div>
                        <div className="text-white/60 text-[10px]">{animal.locations[0]}</div>
                      </div>

                      {/* Selected indicator */}
                      {isSelected && (
                        <div className="absolute inset-0 border-2 border-apex-red rounded-xl flex items-center justify-center bg-apex-red/10">
                          <div className="bg-apex-red text-white text-[10px] font-black px-2 py-0.5 rounded-full">SELECTED</div>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="bg-white px-2 py-1.5 flex items-center justify-between">
                      <span className="text-xs font-bold text-apex-black">US${animal.price.toFixed(2)}</span>
                      <button
                        onClick={e => { e.stopPropagation(); addToCart(animal); }}
                        className="text-[10px] font-semibold text-apex-red hover:bg-apex-red hover:text-white border border-apex-red rounded-full px-2 py-0.5 transition-colors"
                      >
                        + Cart
                      </button>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button
                    key={n}
                    onClick={() => { setPage(n); document.getElementById('plans-section')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className={`w-8 h-8 rounded-full text-sm font-semibold transition-colors ${
                      page === n ? 'bg-apex-red text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — live cert preview */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-apex-red" />
                <span className="text-sm font-semibold text-gray-700">Live Preview</span>
                <Badge variant="outline" className="text-[10px] ml-auto">Updates instantly</Badge>
              </div>

              {/* Name input */}
              <Input
                placeholder="Enter name for certificate"
                value={previewName}
                onChange={e => setPreviewName(e.target.value)}
                className="mb-4 text-sm"
              />

              {/* Certificate — reactive to animal + tier */}
              <Certificate
                insuranceType={selectedAnimal.name}
                name={previewName || 'Your Name'}
                country={selectedAnimal.locations[0] || 'Worldwide'}
                imageUrl={selectedAnimal.imageUrl}
                tier={selectedTier}
                isPreview={true}
              />

              <div className="mt-4 space-y-2">
                <Button
                  onClick={() => {
                    addToCart(selectedAnimal);
                  }}
                  className="w-full bg-apex-red hover:bg-apex-red/90 text-white font-semibold"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add to Cart — US${selectedAnimal.price.toFixed(2)}
                </Button>
                <p className="text-center text-[11px] text-gray-400">
                  Watermark removed instantly after purchase
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsurancePlans;
