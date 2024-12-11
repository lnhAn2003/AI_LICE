// src/types/game.ts

export interface GameData {
    title: string;
    uploadedBy: UploadedBy;
    dateUploaded: string;
    coverImage: string;
    description: string;
    tags: string[];
    categories: Category[];
    platforms: string[];
    externalLinks: {
        officialWebsite: string;
        gameplayVideo: string;
        communityForum: string;
    };
    downloadLink: string;
    screenshots: string[];
    changelog: { date: string; changes: string }[];
    averageRating: number;
    totalRatings: number;
    reviews: {
        username: string;
        comment: string;
        rating: number;
    }[];
    communityFeedback: {
        likes: number;
        dislikes: number;
        successRate: number;
        feedbacks: {
            username: string;
            comment: string;
        }[];
    };
    comments: Comment[];
    ratingCount: number;
    successVotes: SuccessVotes;
    _id: string;
    images: string[];
    viewCount: number;
    newRelease: boolean;
    downloadCount: number;
    gameModes: string[];
    releaseDate: string;
    fileUrl: string;
    createdAt: string;
    updatedAt: string;
    favorites: any[];
    commentId: any[];
    version: string;
    ratings: Rating[];
    __v: number;
}

export interface Category {
    _id: string;
    name: string;
    key: string;
}

export interface UploadedBy {
    username: string;
    _id: string;
}

export interface SuccessVotes {
    likes: number;
    dislikes: number;
    percentage: number;
    userVotes: any[];
}

export interface Changelog {
    date: string;
    description: string;
    _id: string;
}

export interface Rating {
    userId: string;
    rating: number;
    comment: string;
    createdAt: string;
    _id: string;
}

export interface Reply {
    username: string;
    date: string;
    content: string;
  }
  
  export interface Comment {
    username: string;
    date: string;
    content: string;
    replies?: Reply[];
  }
  