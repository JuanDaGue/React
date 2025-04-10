import { useProducts } from '../../../hooks/usePRoducts';
import { ProductCard } from '../ProductCard';
import { Product } from '../../../../../Types';
import { useTheme } from '../../../contexts/ThemeProvider'; // Adjust path as needed

export function ProductGrid() {
  const { darkMode } = useTheme();
  const { products, loading, error } = useProducts();

  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
    // Add your cart logic here
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center h-64 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
          darkMode ? 'border-purple-400' : 'border-purple-600'
        }`}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${
        darkMode 
          ? 'bg-red-900/30 border-red-700 text-red-300' 
          : 'bg-red-100 border-red-400 text-red-700'
      } border px-4 py-3 rounded`}>
        Error loading products: {error}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={handleAddToCart}
          darkMode={darkMode} // Pass darkMode prop if ProductCard needs it
        />
      ))}
    </div>
  );
}