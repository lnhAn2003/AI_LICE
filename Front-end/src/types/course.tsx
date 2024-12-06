// src/types/course.ts
export interface CourseData {
    _id: string;
    title: string;
    createdBy: {
      _id: string;
      username: string;
    };
    createdAt: string;
    description: string;
    tags: string[];
    categories: Category[];
    averageRating: number;
    ratingCount: number;
    resource: string[];
    screenshot: string[];
  }
  
  export interface Category {
    _id: string;
    name: string;
    key: string;
    icon?: string;
    description?: string;
    parentCategory?: string;
  }
  