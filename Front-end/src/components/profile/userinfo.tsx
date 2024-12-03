// src/components/profile/UserInfo.tsx

import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';
import { User, UserData } from '../../types/user';

const getSocialIcon = (platform?: string) => {
  if (!platform) {
    return <FaGlobe size={24} />;
  }

  switch (platform.toLowerCase()) {
    case 'facebook':
      return <FaFacebook size={24} />;
    case 'twitter':
      return <FaTwitter size={24} />;
    case 'linkedin':
      return <FaLinkedin size={24} />;
    case 'github':
      return <FaGithub size={24} />;
    default:
      return <FaGlobe size={24} />;
  }
};
const UserInfo: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">{user.username}</h2>
      <p>{user.bio}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p>
            <strong>Joined:</strong> {user.joinedDate}
          </p>
          <p>
            <strong>Last Login:</strong> {user.lastLogin}
          </p>
        </div>
        <div>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      </div>
      <div>
        <h3 className="font-semibold">Social Links</h3>
        {user.socialLinks && user.socialLinks.length > 0 ? (
          <div className="flex space-x-4 mt-2">
            {user.socialLinks
              .filter((link) => link.platform && link.url)
              .map((link, index) => (
                <a
                  key={link.platform + index}
                  href={link.url}
                  className="text-secondary hover:text-secondary-dark transition-colors flex items-center space-x-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {getSocialIcon(link.platform)}
                  <span>{link.platform}</span>
                </a>
              ))}
          </div>
        ) : (
          <p className="text-gray-600">No social links available.</p>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
