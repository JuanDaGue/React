import { useProducts } from '../../../hooks/usePRoducts';
import { ProductCard } from '../ProductCard';
import { Product } from '../../../../../Types'; // Adjust the path as needed

export function ProductGrid() {
  const { products, loading, error } = useProducts();

  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
    // Add your cart logic here
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded">
        Error loading products: {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}