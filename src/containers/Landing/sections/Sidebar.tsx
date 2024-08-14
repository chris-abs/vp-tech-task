import { MdOutlineFilterListOff } from 'react-icons/md';

interface FacetOption {
  identifier: string;
  value: any;
  displayValue: string;
}

interface Facet {
  identifier: string;
  displayName: string;
  priority: number;
  options: FacetOption[];
  facetType: number;
}

interface SidebarProps {
  facets: Facet[];
  selectedFilters: { [key: string]: string[] };
  toggleFilter: (facetIdentifier: string, optionValue: string) => void;
  clearFilters: () => void; // New prop for clearing filters
}

const Sidebar: React.FC<SidebarProps> = ({
  facets,
  selectedFilters,
  toggleFilter,
  clearFilters,
}) => {
  return (
    <aside className="w-64 rounded-lg bg-gray-100 p-4">
      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-bold">Filters</h2>
        <button
          onClick={clearFilters}
          className="flex items-center text-red-600 underline"
        >
          <MdOutlineFilterListOff /> Filters
        </button>
      </div>
      {facets.map((facet) => (
        <div key={facet.identifier} className="mb-6">
          <h3 className="mb-2 font-semibold">{facet.displayName}</h3>
          {facet.options.map((option) => (
            <label key={option.identifier} className="mb-2 flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={
                  selectedFilters[facet.identifier]?.includes(
                    option.displayValue,
                  ) || false
                }
                onChange={() =>
                  toggleFilter(facet.identifier, option.displayValue)
                }
              />
              {option.displayValue}
            </label>
          ))}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
