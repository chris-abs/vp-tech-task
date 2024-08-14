import axios from 'axios';

const API_URL =
  'https://spanishinquisition.victorianplumbing.co.uk/interviews/listings';
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchToilets = async (
  query: string,
  pageNumber: number = 0,
  size: number = 10,
  additionalPages: number = 0,
  sort: number = 1,
) => {
  try {
    const response = await axios.post(
      `${API_URL}?apikey=${API_KEY}`,
      {
        query: 'baths',
        pageNumber,
        size,
        additionalPages,
        sort,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching toilets:', error);
    throw new Error('Failed to fetch toilets');
  }
};
