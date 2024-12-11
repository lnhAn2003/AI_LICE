import React from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaEnvelope,
  FaUserTag,
  FaCalendarAlt,
  FaSignOutAlt,
} from 'react-icons/fa';
import { User } from '../../types/user';

const getSocialIcon = (platform?: string) => {
  if (!platform) {
    return <FaGlobe size={20} />;
  }

  switch (platform.toLowerCase()) {
    case 'facebook':
      return <FaFacebook size={20} />;
    case 'twitter':
      return <FaTwitter size={20} />;
    case 'linkedin':
      return <FaLinkedin size={20} />;
    case 'github':
      return <FaGithub size={20} />;
    default:
      return <FaGlobe size={20} />;
  }
};

const UserInfo: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="space-y-8">
      {/* Username and Bio */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{user.username}</h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{user.bio}</p>
      </div>

      {/* User Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Joined Date */}
        <div className="flex items-start space-x-3 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-sm">
          <FaCalendarAlt className="text-blue-600 dark:text-blue-400" />
          <div className="leading-snug">
            <p className="text-gray-700 dark:text-gray-200 font-semibold">Joined:</p>
            <p className="text-gray-600 dark:text-gray-300">{user.joinedDate}</p>
          </div>
        </div>

        {/* Last Login */}
        <div className="flex items-start space-x-3 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-sm">
          <FaSignOutAlt className="text-blue-600 dark:text-blue-400" />
          <div className="leading-snug">
            <p className="text-gray-700 dark:text-gray-200 font-semibold">Last Login:</p>
            <p className="text-gray-600 dark:text-gray-300">{user.lastLogin}</p>
          </div>
        </div>

        {/* Role */}
        <div className="flex items-start space-x-3 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-sm">
          <FaUserTag className="text-blue-600 dark:text-blue-400" />
          <div className="leading-snug">
            <p className="text-gray-700 dark:text-gray-200 font-semibold">Role:</p>
            <p className="text-gray-600 dark:text-gray-300">{user.role}</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start space-x-3 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-sm">
          <FaEnvelope className="text-blue-600 dark:text-blue-400" />
          <div className="leading-snug">
            <p className="text-gray-700 dark:text-gray-200 font-semibold">Email:</p>
            <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Social Links</h3>
        {user.socialLinks && user.socialLinks.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {user.socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors bg-gray-50 dark:bg-gray-900 px-3 py-2 rounded-full shadow-sm space-x-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                {getSocialIcon(link.platform)}
                <span className="capitalize">{link.platform}</span>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-300 italic">No social links available.</p>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
