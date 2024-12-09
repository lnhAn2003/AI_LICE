// src/types/course.ts
export interface CourseData {
  _id: string;
  title: string;
  description: string;
  createdBy: {
    _id: string;
    username: string;
    profile?: {
      avatarUrl?: string;
    };
  };
  sections: Section[];
  tags: string[];
  categories: Category[];
  averageRating: number;
  ratingCount: number;
  favorites: string[];
  comments: Comment[];
  resource: string[];
  screenshot: string[];
  ratings: Rating[];
  createdAt: string;
  updatedAt: string;
}

export interface Section {
  _id: string;
  courseId: string;
  authorId: string;
  sectionTitle: string;
  lessons: Lesson[];
  createdAt: string;
  updatedAt: string;
  isEdited: boolean;
  editHistory: any[];
}

export interface Lesson {
  _id: string;
  title: string;
  videoUrl?: string;
  textContent?: string;
  resources?: string[];
  id: string;
}

export interface Category {
  _id: string;
  name: string;
  key: string;
  icon?: string;
  description?: string;
  parentCategory?: string;
}

export interface Comment {
  _id: string;
  userId: string;
  username: string;
  avatarUrl?: string;
  comment: string;
  likes: number;
  replies: Reply[];
  createdAt: string;
}

export interface Reply {
  _id: string;
  userId: string;
  username: string;
  avatarUrl?: string;
  comment: string;
  likes: number;
  createdAt: string;
}

export interface Rating {
  _id: string;
  userId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}
