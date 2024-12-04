// src/types/thread.ts

export interface Author {
  profile: {
    avatarUrl: string;
  };
  _id: string;
  username: string;
}

export interface Comment {
  _id: string;
  content: string;
  authorId: Author; 
  createdAt: string;
}

export interface FeedbackEntry {
  username: string;
  comment: string;
}

export interface CommunityFeedbackProps {
  feedback: {
    likes: number;
    dislikes: number;
    successRate: number;
    feedbacks: FeedbackEntry[];
  };
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
