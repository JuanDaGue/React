import { NavItem } from './NavItem';
import { 
  ClipboardListIcon,
  UsersIcon,
  ShoppingCartIcon 
} from '@heroicons/react/outline';

export function Navigation() {
  return (
    <nav className="bg-gray-800 p-4 rounded-xl shadow-lg">
      <ul className="space-y-2">
        <li>
          <NavItem 
            to="/todos" 
            icon={<ClipboardListIcon className="h-6 w-6" />} 
            label="Todo List" 
          />
        </li>
        <li>
          <NavItem 
            to="/users" 
            icon={<UsersIcon className="h-6 w-6" />} 
            label="Users" 
          />
        </li>
        <li>
          <NavItem 
            to="/products" 
            icon={<ShoppingCartIcon className="h-6 w-6" />} 
            label="Products" 
          />
        </li>
      </ul>
    </nav>
  );
}