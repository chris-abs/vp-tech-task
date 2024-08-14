import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useProducts } from '../../queries';
import { formatFiltersForService } from '../../utils/filterUtils';
import Pagination from './sections/Pagination';
import Products from './sections/Products';
import Sidebar from './sections/Sidebar';

const pageSizeOptions = [20, 30, 50, 100];

const Landing: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [formattedFilters, setFormattedFilters] = useState<
    Record<string, any[]>
  >({});

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const filters: Record<string, string[]> = {};
    searchParams.forEach((value, key) => {
      if (!filters[key]) {
        filters[key] = [];
      }
      filters[key].push(value);
    });
    setSelectedFilters(filters);
  }, [location.search]);

  const { data, isLoading, error } = useProducts(
    'products',
    pageNumber,
    pageSize,
    0,
    1,
    formattedFilters,
  );

  useEffect(() => {
    if (data) {
      const filters = formatFiltersForService(
        selectedFilters,
        data.facets || [],
      );
      setFormattedFilters(filters);
    }
  }, [data, selectedFilters]);

  const totalPages = useMemo(
    () => Math.ceil((data?.pagination?.total || 0) / pageSize),
    [data?.pagination?.total, pageSize],
  );

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

      const updatedFilters = isSelected
        ? currentFilters.filter((value) => value !== optionValue)
        : [...currentFilters, optionValue];

      const newFilters = { ...prevFilters };
      if (updatedFilters.length > 0) {
        newFilters[facetIdentifier] = updatedFilters;
      } else {
        delete newFilters[facetIdentifier];
      }

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
    return <p>Error loading products</p>;
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
