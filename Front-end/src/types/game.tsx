// src/types/game.ts

export interface ExternalLink {
  _id: string;
  name: string;
  url: string;
  id: string;
}

export interface ExternalLinksProps {
  links: {
    officialWebsite: string | null;
    gameplayVideo: string | null;
    communityForum: string | null;
  };
  downloadLink: string | null;
}

export interface ChangelogEntry {
  date: string;
  description: string;
  _id: string;
  id: string;
}

export interface Profile {
  preferences: {
    notifications: boolean;
    theme: string;
  };
  socialLinks: string[];
  locale: string;
  bio: string;
  avatarUrl?: string;
}

export interface Author {
  _id: string;
  username: string;
  profile?: Profile;
}

export interface Reply {
  _id: string;
  targetType: string;
  targetId: string;
  authorId: Author;
  content: string;
  images?: string[];
  isEdited: boolean;
  isVisible: boolean;
  parentCommentId?: string;
  createdAt: string;
  updatedAt: string;
  editHistory: any[];
  __v: number;
  id: string;
}

export interface Comment {
  _id: string;
  targetType: string;
  targetId: string;
  authorId: Author;
  content: string;
  images?: string[];
  fileUrl?: string | null;
  isEdited: boolean;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  editHistory: any[];
  __v: number;
  replies?: Reply[];
  id: string;
}

export interface Rating {
  userId: {
    _id: string;
    username: string;
    id: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
  _id: string;
  id: string;
}

export interface RatingReview {
  username: string;
  comment: string;
  rating: number;
}

export interface SuccessVotes {
  likes: number;
  dislikes: number;
  percentage: number;
  userVotes: any[];
}

export interface CommunityFeedback {
  likes: number;
  dislikes: number;
  successRate: number;
  feedbacks: {
    username: string;
    comment: string;
  }[];
}

export interface Category {
  _id: string;
  name: string;
  key: string;
}

export interface UploadedBy {
  _id: string;
  username: string;
}

export interface ChangelogEntry {
  date: string;
  description: string;
  _id: string;
  id: string;
}

export interface GameData {
  _id: string;
  title: string;
  description: string;
  uploadedBy: UploadedBy;
  images: string[];
  fileUrl: string | null;
  externalLinks: ExternalLink[]; // Changed from ExternalLinksProps[] to ExternalLink[]
  createdAt: string;
  updatedAt: string;
  downloadCount: number;
  viewCount: number;
  favorites: string[];
  tags: string[];
  categories: Category[];
  commentId: string[];
  averageRating: number;
  ratingCount: number;
  newRelease: boolean;
  version: string;
  changelog: ChangelogEntry[];
  ratings: Rating[];
  __v: number;
  platforms: string[];
  comments: Comment[];
  dateUploaded: string;
  coverImage: string;
  downloadLink: string | null;
  screenshots: string[];
  reviews: RatingReview[];
  communityFeedback: CommunityFeedback;
}

export interface CommentsSectionProps {
  comments: Comment[];
  targetType: string;
  targetId: string;
}
