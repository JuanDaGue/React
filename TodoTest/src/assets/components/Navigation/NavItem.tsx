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
        `flex items-center p-3 rounded-lg transition-colors ${
          isActive 
            ? 'bg-purple-600 text-white' 
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`
      }
    >
      <span className="mr-3">{icon}</span>
      <span className="font-medium">{label}</span>
    </NavLink>
  );
}