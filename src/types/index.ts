export interface Product {
  id: string;
  productName: string;
  averageRating: number;
  brand: {
    name: string;
  };
  price: {
    priceIncTax: number;
  };
  image: {
    url: string;
    attributes: {
      imgAltText: string;
    };
  };
}

export interface FacetOption {
  identifier: string;
  value: any;
  displayValue: string;
}

export interface Facet {
  identifier: string;
  displayName: string;
  priority: number;
  options: FacetOption[];
  facetType: number;
}

export interface FiltersState {
  selectedFilters: Record<string, string[]>;
  formattedFilters: Record<string, any[]>;
}

export type FiltersAction =
  | { type: 'SET_FILTERS'; payload: Record<string, string[]> }
  | { type: 'CLEAR_FILTERS' }
  | { type: 'UPDATE_FORMATTED_FILTERS'; payload: Record<string, any[]> };
