import { Routes, Route } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeProvider';
import { Navigation } from '../Navigation';
import { TodoList } from '../TodoList/TodoList';
import { UserList } from '../UserList/UserList';
import { ProductGrid } from '../ProductCard/ProductGrid';


export default function AppContent() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${
            darkMode ? 'text-purple-400' : 'text-purple-600'
          }`}>
            My App
          </h1>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${
              darkMode 
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            aria-label="Toggle theme"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </header>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <Navigation />
          </div>
          
          <main className="flex-1">
            <Routes>
              <Route path="/todos" element={<TodoList />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/products" element={<ProductGrid />} />
              <Route path="/" element={<TodoList />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}
