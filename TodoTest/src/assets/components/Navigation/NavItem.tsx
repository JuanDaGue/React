import { NavLink } from 'react-router-dom';

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
};

export function NavItem({ to, icon, label }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center p-3 rounded-lg transition-colors duration-200 ${
          isActive
            ? 'bg-purple-600 text-white dark:bg-purple-700'
            : `text-gray-600 hover:bg-gray-100 dark:text-gray-300 
               dark:hover:bg-gray-700 hover:text-purple-600 
               dark:hover:text-purple-400`
        }`
      }
    >
      <span className="mr-3 [&>svg]:w-6 [&>svg]:h-6">
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </NavLink>
  );
}