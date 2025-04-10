import { useEffect, useState } from 'react';
import { ProductList } from '../../../Types';

const API_URL = import.meta.env.VITE_APP_API_URL || 'https://fakestoreapi.com/products';

export function useProducts() {
  const [products, setProducts] = useState<ProductList>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}