// src/types/studio.tsx

export interface Course {
    _id: string;
    title: string;
    description: string;
    tags: string[];
    categories: string[];
    createdAt: string;
    updatedAt: string;
    averageRating: number;
    sections: {
      _id: string;
      sectionTitle: string;
      lessons: {
        _id: string;
        title: string;
        videoUrl?: string;
      }[];
    }[];
  }
  
  export interface Thread {
    _id: string;
    title: string;
    tags: string[];
    content: string;
    createdAt: string;
    updatedAt: string;
    views: number;
    isPinned: boolean;
  }
  
  export interface Post {
    _id: string;
    threadId: {
      _id: string;
      title: string;
    };
    content: string;
    createdAt: string;
    updatedAt: string;
    isEdited: boolean;
  }
  
  export interface GameShared {
    _id: string;
    title: string;
    description: string;
    images: string[];
    fileUrl: string;
    createdAt: string;
    updatedAt: string;
    downloadCount: number;
    viewCount: number;
    tags: string[];
    categories: string[];
    averageRating: number;
  }
  
  export interface UserInfo {
    _id: string;
    username: string;
    email: string;
    profile: {
      avatarUrl?: string;
    };
    roleId: string;
    joinedAt: string;
    lastLogin: string;
  }
  
  export interface MyStudioData {
    user: UserInfo;
    threads: Thread[];
    posts: Post[];
    courses: Course[];
    gamesShared: GameShared[];
  }
  