// src/types/thread.ts
export interface UserData {
  user: User;
}

export interface User {
  id: string;
  avatarUrl: string;
  username: string;
  bio: string;
  joinedDate: string;
  lastActive: string;
  lastLogin: string;
  role: string;
  email: string;
  socialLinks: Array<{ platform: string; url: string }>;
  statistics: Statistics;
  recentActivity: RecentActivity;
  badges: Badges;
}

export interface RecentActivity {
  threads: any[];
  posts: any[];
  games: any[];
};

export interface Badges {
  earned: Array<{ icon: string; title: string; description: string }>;
  upcoming: Array<{ icon: string; title: string; description: string }>;
};

export interface Statistics {
  threadsCreated: number;
  postsMade: number;
  gamesShared: number;
  aiInteractions: number;
};  


export interface UserProfileData {
  _id: string;
  username: string;
  email: string;
  profile: {
    avatarUrl?: string;
    bio?: string;
    socialLinks?: string[];
    locale?: string;
    preferences?: {
      notifications?: boolean;
      theme?: string;
    };
  };
  roleId: {
    _id: string;
    name: string;
  };
  status: {
    online: boolean;
    lastActive: string;
  };
  threads: { _id: string; title: string }[];
  posts: { _id: string; content: string }[];
  gamesShared: string[];
  aiInteractions: any[];
  joinedAt: string;
  lastLogin: string;
  __v: number;
  favorites: any[];
}