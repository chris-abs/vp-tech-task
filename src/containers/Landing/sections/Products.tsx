import ProductCard from '../../../components/ProductCard';
import type { Product } from '../../../types';

interface ProductsProps {
  products: Product[];
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
    <section className="flex-1">
      <h1 className="mb-6 text-3xl font-bold">Toilets</h1>
      <div className="grid grid-cols-1 gap-8 pb-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {products.map((product: Product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
};

export default Products;
