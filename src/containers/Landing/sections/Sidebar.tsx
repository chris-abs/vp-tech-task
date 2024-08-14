import React from 'react';

interface FacetOption {
  identifier: string;
  value: any; // The type of value might vary, so `any` is used. Adjust based on actual types if known.
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
}

const Sidebar: React.FC<SidebarProps> = ({ facets }) => {
  return (
    <aside className="w-64 rounded-lg bg-gray-100 p-4">
      <h2 className="mb-4 text-xl font-bold">Filters</h2>
      {facets.map((facet) => (
        <div key={facet.identifier} className="mb-6">
          <h3 className="mb-2 font-semibold">{facet.displayName}</h3>
          {facet.options.map((option) => (
            <label key={option.identifier} className="mb-2 flex items-center">
              <input type="checkbox" className="mr-2" />
              {option.displayValue}
            </label>
          ))}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
