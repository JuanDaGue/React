import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './assets/components/Navigation';
import { TodoList } from './assets/components/TodoList/TodoList';
import { UserList } from './assets/components/UserList/UserList';
import { ProductCard } from './assets/components/ProductCard/ProductCard';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <header className="flex justify-between items-center mb-8">
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
              My App
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors`}
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
                <Route path="/products" element={<ProductCard />} />
                <Route path="/" element={<TodoList />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;