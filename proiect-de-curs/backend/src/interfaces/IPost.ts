export interface IPost {
    _id: string;
    userId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    comments: string[];
    likes: string[];
    images: string[];
}
