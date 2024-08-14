import { useState } from 'react';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

import { useToilets } from '../../queries';
import { Product } from '../../types';
import ProductCard from '../../components/ProductCard';

// Array for page size options
const pageSizeOptions = [10, 20, 30, 50, 100];

const Landing: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);

  const { data, isLoading, error } = useToilets(
    'toilets',
    pageNumber,
    pageSize,
  );

  const totalPages = Math.ceil((data?.pagination?.total || 0) / pageSize);

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value));
    setPageNumber(0);
  };

  const handlePreviousPage = () => {
    setPageNumber((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setPageNumber((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading toilets</p>;
  }

  return (
    <section className="flex flex-col bg-neutral-100 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <label htmlFor="pageSize" className="mr-2">
            Show per page:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="rounded border p-2"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <p>Total Products: {data?.pagination?.total || 0}</p>

        <nav aria-label="Pagination">
          <div className="flex justify-center">
            <button
              onClick={handlePreviousPage}
              disabled={pageNumber === 0}
              className={`p-2 rounded mr-2 text-emerald-700 ${
                pageNumber === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <FaArrowLeftLong aria-hidden="true" />
              <span className="sr-only">Previous page</span>
            </button>
            <button
              onClick={handleNextPage}
              disabled={pageNumber >= totalPages - 1}
              className={`p-2 rounded text-emerald-700 ${
                pageNumber >= totalPages - 1
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              <FaArrowRightLong aria-hidden="true" />
              <span className="sr-only">Next page</span>
            </button>
          </div>
        </nav>
      </div>

      <div className="flex-1">
        <h1 className="mb-6 text-3xl font-bold">Toilets</h1>
        <div className="grid grid-cols-1 gap-8 pb-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {data?.products?.map((product: Product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Landing;
