import { useState } from 'react';

import { useToilets } from '../../queries';
import { Product } from '../../types';
import ProductCard from '../../components/ProductCard';
import Pagination from './sections/Pagination';

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
    <section className="flex flex-col p-4">
      <Pagination
        pageNumber={pageNumber}
        totalPages={totalPages}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        handlePageSizeChange={handlePageSizeChange}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        totalProducts={data?.pagination?.total || 0}
      />

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
