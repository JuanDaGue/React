import { Product } from '../../../../../Types';

type ProductCardProps = {
  product: Product;
  onAddToCart?: (product: Product) => void;
  darkMode?: boolean;
};

export function ProductCard({ product, onAddToCart, darkMode = false }: ProductCardProps) {
  return (
    <div className={`relative border rounded-xl overflow-hidden transition-all duration-300 ${
      darkMode 
        ? 'bg-gray-800 border-gray-700 hover:shadow-lg' 
        : 'bg-white border-gray-200 hover:shadow-md'
    }`}>
      {/* Product Image */}
      <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-4 hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className={`font-semibold line-clamp-2 ${
            darkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            {product.title}
          </h3>
          <span className={`ml-2 font-bold ${
            darkMode ? 'text-purple-400' : 'text-purple-600'
          }`}>
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(product.rating.rate)
                    ? 'text-yellow-400'
                    : darkMode 
                      ? 'text-gray-500' 
                      : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className={`text-xs ml-1 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            ({product.rating.count})
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart?.(product)}
          className={`w-full py-2 px-4 rounded-lg transition-colors flex items-center justify-center ${
            darkMode 
              ? 'bg-purple-700 hover:bg-purple-800' 
              : 'bg-purple-600 hover:bg-purple-700'
          } text-white`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to Cart
        </button>
      </div>

      {/* Category Badge */}
      <span className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-full ${
        darkMode 
          ? 'bg-purple-900 text-purple-200' 
          : 'bg-purple-100 text-purple-800'
      }`}>
        {product.category}
      </span>
    </div>
  );
}