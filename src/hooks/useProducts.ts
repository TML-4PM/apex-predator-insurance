
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Product {
  id: string;
  name: string;
  category: 'terrestrial' | 'marine' | 'aerial' | 'reptile' | 'insect';
  base_price: number;
  price: number;
  description: string;
  icon: string;
  image_url?: string;
  danger_level: number;
  locations: string[];
  facts: string[];
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'mythic';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BundleProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  animal_count: number;
  base_price: number;
  savings: number;
  icon: string;
  image_url?: string;
  features: string[];
  is_active: boolean;
  created_at: string;
}

export interface WholesaleTier {
  id: string;
  tier_name: string;
  min_quantity: number;
  price_per_unit: number;
  discount_percentage: number;
  features: string[];
  is_active: boolean;
  created_at: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [bundleProducts, setBundleProducts] = useState<BundleProduct[]>([]);
  const [wholesaleTiers, setWholesaleTiers] = useState<WholesaleTier[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProducts = async () => {
    try {
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('danger_level', { ascending: false });

      const { data: bundlesData, error: bundlesError } = await supabase
        .from('bundle_products')
        .select('*')
        .eq('is_active', true)
        .order('base_price', { ascending: true });

      const { data: wholesaleData, error: wholesaleError } = await supabase
        .from('wholesale_tiers')
        .select('*')
        .eq('is_active', true)
        .order('min_quantity', { ascending: true });

      if (productsError) throw productsError;
      if (bundlesError) throw bundlesError;
      if (wholesaleError) throw wholesaleError;

      // Map and validate the data to ensure it matches our interfaces
      const mappedProducts: Product[] = (productsData || []).map(product => ({
        ...product,
        category: product.category as Product['category'],
        rarity: product.rarity as Product['rarity'],
        base_price: product.base_price || product.price || 9.99,
        price: product.price || product.base_price || 9.99
      }));

      setProducts(mappedProducts);
      setBundleProducts(bundlesData || []);
      setWholesaleTiers(wholesaleData || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to load products.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    bundleProducts,
    wholesaleTiers,
    loading,
    refetch: fetchProducts
  };
};
