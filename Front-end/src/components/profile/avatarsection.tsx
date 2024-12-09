// src/components/profile/avatarsection.tsx
import React from 'react';

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
        className="absolute bottom-0 right-0 bg-secondary text-white rounded-full p-2 hover:bg-secondary-dark transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.414 2.586a2 2 0 010 2.828l-9.829 9.829-4.95 1.414 1.414-4.95 9.83-9.828a2 2 0 012.828 0z" />
        </svg>
      </button>
    </div>
  );
};

export default AvatarSection;
