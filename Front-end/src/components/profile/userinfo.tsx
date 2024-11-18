// src/components/profile/UserInfo.tsx

import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

interface SocialLink {
  platform: string;
  url: string;
}

interface UserInfoProps {
  username: string;
  bio: string;
  joinedDate: string;
  lastActive: string;
  role: string;
  email: string;
  socialLinks: SocialLink[];
}

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

const UserInfo: React.FC<UserInfoProps> = ({
  username,
  bio,
  joinedDate,
  lastActive,
  role,
  email,
  socialLinks,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">{username}</h2>
      <p>{bio}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p>
            <strong>Joined:</strong> {joinedDate}
          </p>
          <p>
            <strong>Last Active:</strong> {lastActive}
          </p>
        </div>
        <div>
          <p>
            <strong>Role:</strong> {role}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
        </div>
      </div>
      <div>
        <h3 className="font-semibold">Social Links</h3>
        {socialLinks && socialLinks.length > 0 ? (
          <div className="flex space-x-4 mt-2">
            {socialLinks
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
