// src/types/thread.ts
export interface AuthorProfile {
  avatarUrl: string;
}

export interface Author {
  profile: AuthorProfile;
  _id: string;
  username: string;
}

export interface Comment {
  _id: string;
  content: string;
  authorId: Author; 
  createdAt: string;
}

export interface Post {
  _id: string;
  content: string;
  comments: Comment[];
  authorId: Author;
  createdAt: string;
  likes?: string;
}


export interface ThreadData {
  isPinned: boolean;
  _id: string;
  title: string;
  authorId: Author;
  tags: string[];
  content: string;
  posts: Post[];
  createdAt: string;
  updatedAt: string;
  views: number;
  isVisible: boolean;
  excerpt?: string;
  favorited?: boolean;
}
