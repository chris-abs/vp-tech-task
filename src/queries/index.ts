import { useQuery } from '@tanstack/react-query';
import { fetchToilets } from '../services';

export const useToilets = (
  query: string = 'toilets',
  pageNumber: number = 0,
  size: number = 10,
  additionalPages: number = 0,
  sort: number = 1,
) => {
  return useQuery({
    queryKey: ['toilets', query, pageNumber, size, additionalPages, sort],
    queryFn: () => fetchToilets(query, pageNumber, size, additionalPages, sort),
  });
};
