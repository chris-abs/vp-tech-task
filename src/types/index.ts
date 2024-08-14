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
