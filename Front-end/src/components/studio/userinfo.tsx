import React from 'react';
import { UserInfo } from '../../types/studio';

interface UserInfoProps {
  user: UserInfo;
}

const UserInfoComponent: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <div className="flex items-center space-x-4">
        <img
          src={user.profile?.avatarUrl || '/default-avatar.png'}
          alt={user.username}
          className="w-16 h-16 rounded-full border-2 border-gray-300 dark:border-gray-700"
        />
        <div>
          <h1 className="text-2xl font-bold mb-1">{user.username}</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Email: {user.email}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Joined: {new Date(user.joinedAt).toLocaleDateString()}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Last Login: {new Date(user.lastLogin).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfoComponent;
