import axios from 'axios';

const API_URL =
  'https://spanishinquisition.victorianplumbing.co.uk/interviews/listings';
const API_KEY = import.meta.env.VITE_API_KEY;

interface FetchProductsParams {
  query: string;
  pageNumber?: number;
  size?: number;
  additionalPages?: number;
  sort?: number;
  facets?: { [key: string]: any[] };
}

export const fetchProducts = async ({
  query,
  pageNumber = 0,
  size = 20,
  additionalPages = 0,
  sort = 1,
  facets = {},
}: FetchProductsParams) => {
  try {
    const response = await axios.post(
      `${API_URL}?apikey=${API_KEY}`,
      {
        query,
        pageNumber,
        size,
        additionalPages,
        sort,
        facets,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};
