import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services';

export const useProducts = (
  query: string,
  pageNumber: number = 0,
  size: number = 20,
  additionalPages: number = 0,
  sort: number = 1,
  facets: { [key: string]: any[] } = {},
) => {
  return useQuery({
    queryKey: [
      'products',
      query,
      pageNumber,
      size,
      additionalPages,
      sort,
      facets,
    ],
    queryFn: () =>
      fetchProducts({
        query: 'basins',
        pageNumber,
        size,
        additionalPages,
        sort,
        facets,
      }),
  });
};
