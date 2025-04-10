import { NavItem } from './NavItem';
import { FaClipboardList, FaUsers, FaShoppingCart } from 'react-icons/fa'; // Import Font Awesome icons

export function Navigation() {
  return (
    <nav className="bg-gray-800 p-4 rounded-xl shadow-lg">
      <ul className="space-y-2">
        <li>
          <NavItem
            to="/todos"
            icon={<FaClipboardList className="h-6 w-6" />}
            label="Todo List"
          />
        </li>
        <li>
          <NavItem
            to="/users"
            icon={<FaUsers className="h-6 w-6" />}
            label="Users"
          />
        </li>
        <li>
          <NavItem
            to="/products"
            icon={<FaShoppingCart className="h-6 w-6" />}
            label="Products"
          />
        </li>
      </ul>
    </nav>
  );
}