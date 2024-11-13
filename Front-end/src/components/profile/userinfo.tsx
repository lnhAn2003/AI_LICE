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
    <div className="mt-4">
      <h2 className="text-xl font-semibold">{username}</h2>
      <p className="text-gray-600">{bio}</p>
      <div className="mt-2">
        <p><strong>Joined:</strong> {joinedDate}</p>
        <p><strong>Last Active:</strong> {lastActive}</p>
        <p><strong>Role:</strong> {role}</p>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Contact Information</h3>
        <p><strong>Email:</strong> {email}</p>
        <div className="flex space-x-2 mt-2">
          {socialLinks.map((link, index) => (
            <a
              key={link.platform + index}
              href={link.url}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.platform}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
