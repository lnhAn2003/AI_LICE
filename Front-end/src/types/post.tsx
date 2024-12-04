// src/types/post.ts

  export interface Author {
    _id: string;
    username: string;
    profile?: {
      avatarUrl: string;
    };
  }
  
  export interface Thread {
    isPinned: boolean;
    _id: string;
    title: string;
    authorId: Author;
    tags: string[];
    content: string;
    posts: string[]; 
    createdAt: string;
    updatedAt: string;
    views: number;
    isVisible: boolean;
  }

  export interface Reply {
    _id: string;
    authorId: Author;
    createdAt: Date;
    content: string;
    replies?: Reply[];
  }
  
  export interface Comment {
    _id: string;
    authorId: Author;
    date: string;
    content: string;
    createdAt: Date;
    replies?: Reply[];
  }
  
  export interface PostData {
    _id: string;
    threadId: Thread;
    authorId: Author;
    content: string;
    comments: Comment[];
    createdAt: string;
    updatedAt: string;
    isEdited: boolean;
    editHistory: any[];
    likes?: string;
  }
  