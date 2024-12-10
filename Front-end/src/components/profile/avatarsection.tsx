// src/components/profile/avatarsection.tsx
import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';

interface AvatarSectionProps {
  avatarUrl: string;
  onEdit: () => void;
}

const AvatarSection: React.FC<AvatarSectionProps> = ({ avatarUrl, onEdit }) => {
  return (
    <div className="relative text-center">
      <img
        src={avatarUrl}
        alt="Avatar"
        className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-md"
      />
      <button
        onClick={onEdit}
        className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors"
      >
        <FaPencilAlt />
      </button>
    </div>
  );
};

export default AvatarSection;
