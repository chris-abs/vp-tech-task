export const formatFiltersForService = (
  selectedFilters: { [key: string]: string[] },
  facets: any[],
) => {
  const formattedFilters: { [key: string]: any[] } = {};

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
