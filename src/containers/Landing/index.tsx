import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import { useToilets } from '../../queries';
import Pagination from './sections/Pagination';
import Products from './sections/Products';
import Sidebar from './sections/Sidebar';

const pageSizeOptions = [10, 20, 30, 50, 100];

const Landing: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({});

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const filters: { [key: string]: string[] } = {};
    searchParams.forEach((value, key) => {
      if (!filters[key]) {
        filters[key] = [];
      }
      filters[key].push(value);
    });
    setSelectedFilters(filters);
  }, [location.search]);

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

  const toggleFilter = (facetIdentifier: string, optionValue: string) => {
    setSelectedFilters((prevFilters) => {
      const currentFilters = prevFilters[facetIdentifier] || [];
      const isSelected = currentFilters.includes(optionValue);

      // If the option is selected, remove it from the array; otherwise, add it.
      const updatedFilters = isSelected
        ? currentFilters.filter((value) => value !== optionValue)
        : [...currentFilters, optionValue];

      // If the updated filters array is empty, remove the filter key; otherwise, update it.
      const newFilters = { ...prevFilters };
      if (updatedFilters.length > 0) {
        newFilters[facetIdentifier] = updatedFilters;
      } else {
        delete newFilters[facetIdentifier];
      }

      // Update the URL with the new filter set
      const searchParams = new URLSearchParams();
      Object.keys(newFilters).forEach((key) => {
        newFilters[key].forEach((value) => searchParams.append(key, value));
      });

      navigate(`?${searchParams.toString()}`);

      return newFilters;
    });
  };

  const clearFilters = () => {
    setSelectedFilters({});
    navigate(location.pathname);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading toilets</p>;
  }

  return (
    <section className="flex flex-col p-4">
      <div className="flex gap-2">
        <Sidebar
          facets={data?.facets || []}
          toggleFilter={toggleFilter}
          selectedFilters={selectedFilters}
          clearFilters={clearFilters}
        />
        <div className="flex-1">
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
          <Products products={data?.products || []} />
        </div>
      </div>
    </section>
  );
};

export default Landing;
