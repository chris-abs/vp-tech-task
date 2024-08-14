import { MdOutlineStar } from 'react-icons/md';
import { TiShoppingCart } from 'react-icons/ti';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <article
      className="group col-span-1 min-h-[404px] cursor-pointer rounded-xl bg-white"
      key={product.id}
    >
      <div className="flex min-h-full w-full flex-col rounded-xl shadow-md transition hover:shadow-lg">
        <figure className="relative aspect-square w-full overflow-hidden rounded-xl">
          <img
            width={200}
            height={300}
            className="h-full w-full transform object-cover transition duration-200 ease-out group-hover:scale-110"
            src={product.image.url}
            alt={product.productName}
          />
          <figcaption className="absolute right-3 top-3 flex items-center rounded bg-white p-1 text-xs">
            <MdOutlineStar />
            {product.averageRating}
          </figcaption>
        </figure>
        <div className="p-2">
          <header className="relative mb-2 flex min-h-[72px] w-full text-sm font-semibold">
            {product.productName}
          </header>
          <div className="grid grid-cols-[1fr_2fr] gap-4">
            <div className="col-span-1 row-span-2 flex items-center justify-center">
              <button className="flex h-full w-full items-center justify-center rounded bg-emerald-700 py-2 text-white">
                <TiShoppingCart aria-label="Add to cart" />
              </button>
            </div>
            <dl className="col-span-1 flex flex-col justify-center text-xs">
              <dt className="font-light text-neutral-500">Brand</dt>
              <dd className="font-semibold">{product.brand.name}</dd>
            </dl>
            <dl className="col-span-1 flex flex-col justify-center text-xs">
              <dt className="font-light text-neutral-500">Price</dt>
              <dd className="font-semibold">£{product.price.priceIncTax}</dd>
            </dl>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
