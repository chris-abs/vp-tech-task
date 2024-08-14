export const formatFiltersForService = (
  selectedFilters: Record<string, string[]>,
  facets: any[],
): Record<string, any[]> => {
  const formattedFilters: Record<string, any[]> = {};

  Object.entries(selectedFilters).forEach(([facetIdentifier, values]) => {
    const facet = facets.find((f) => f.identifier === facetIdentifier);
    if (facet) {
      formattedFilters[facetIdentifier] = values
        .map((value) => {
          const option = facet.options.find(
            (opt: any) => opt.displayValue === value,
          );
          return option
            ? { identifier: option.identifier, value: option.value }
            : null;
        })
        .filter(Boolean);
    }
  });

  return formattedFilters;
};

export const syncFiltersWithURL = (
  location: URLSearchParams,
): Record<string, string[]> => {
  const filters: Record<string, string[]> = {};
  location.forEach((value, key) => {
    if (!filters[key]) {
      filters[key] = [];
    }
    filters[key].push(value);
  });
  return filters;
};
