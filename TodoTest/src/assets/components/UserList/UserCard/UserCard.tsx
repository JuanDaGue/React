import { User } from '../../../../../Types';

type UserCardProps = {
  user: User;
};

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg hover:transform hover:scale-105 transition-all shadow-md hover:shadow-lg">
      <h3 className="text-xl font-semibold text-purple-300 truncate">{user.name}</h3>
      <p className="text-gray-400 text-sm mt-1">{user.email}</p>
      <div className="mt-2 pt-2 border-t border-gray-700">
        <p className="text-gray-500 text-xs">
          {user.address.city}, {user.address.street}
        </p>
      </div>
    </div>
  );
}