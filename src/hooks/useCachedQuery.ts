
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { cacheService } from '@/services/cacheService';

interface UseCachedQueryOptions<T> extends Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'> {
  queryKey: string[];
  queryFn: () => Promise<T>;
  cacheTTL?: number;
  useMemoryCache?: boolean;
}

export const useCachedQuery = <T>({
  queryKey,
  queryFn,
  cacheTTL = 5 * 60 * 1000, // 5 minutes
  useMemoryCache = true,
  ...options
}: UseCachedQueryOptions<T>) => {
  const cacheKey = queryKey.join('-');

  return useQuery({
    queryKey,
    queryFn: async () => {
      // Check memory cache first
      if (useMemoryCache && cacheService.has(cacheKey)) {
        const cachedData = cacheService.get<T>(cacheKey);
        if (cachedData) {
          console.log(`[Cache] Hit for key: ${cacheKey}`);
          return cachedData;
        }
      }

      // Fetch fresh data
      console.log(`[Cache] Miss for key: ${cacheKey}, fetching fresh data`);
      const data = await queryFn();
      
      // Store in memory cache
      if (useMemoryCache) {
        cacheService.set(cacheKey, data, cacheTTL);
      }
      
      return data;
    },
    staleTime: cacheTTL,
    gcTime: cacheTTL * 2,
    ...options
  });
};
