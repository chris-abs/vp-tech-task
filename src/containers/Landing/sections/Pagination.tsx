import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

interface PaginationProps {
  pageNumber: number;
  totalPages: number;
  pageSize: number;
  pageSizeOptions: number[];
  handlePageSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  totalProducts: number;
}

const Pagination: React.FC<PaginationProps> = ({
  pageNumber,
  totalPages,
  pageSize,
  pageSizeOptions,
  handlePageSizeChange,
  handlePreviousPage,
  handleNextPage,
  totalProducts,
}) => {
  return (
    <section className="mb-4 flex items-center justify-between">
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

      <p>Total Products: {totalProducts}</p>

      <nav aria-label="Pagination">
        <p>
          Page {pageNumber + 1} of {totalPages}
        </p>
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
    </section>
  );
};

export default Pagination;
