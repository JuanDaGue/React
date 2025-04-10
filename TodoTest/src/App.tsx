import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './assets/contexts/ThemeProvider';
// import { Navigation } from './assets/components/Navigation';
// import { TodoList } from './assets/components/TodoList/TodoList';
// import { UserList } from './assets/components/UserList/UserList';
// import { ProductGrid } from './assets/components/ProductCard/ProductGrid';
import AppContent from './assets/components/Main/AppContent';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}
export default App;
