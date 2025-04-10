import { Product } from '../../../../../Types';

type ProductCardProps = {
  product: Product;
  onAddToCart?: (product: Product) => void;
};

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <div className="relative pt-[100%] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="absolute top-0 left-0 w-full h-full object-contain p-4"
          loading="lazy"
        />
      </div>
      
      <div className="flex flex-col flex-grow p-4">
        <div className="flex-grow">
          <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2 mb-2">
            {product.title}
          </h3>
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-purple-600 dark:text-purple-400">
              ${product.price.toFixed(2)}
            </span>
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => onAddToCart?.(product)}
          className="mt-auto w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white rounded transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}