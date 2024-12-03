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