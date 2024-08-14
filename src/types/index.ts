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
