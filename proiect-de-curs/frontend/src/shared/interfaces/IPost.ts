import { IUserImage } from './IUser';

export interface IPost {
    title: string;
    content: string;
    creator: IUserImage;
}

export interface IPostImage extends IPost {
    image: string;
}

export interface IPostLikeComment extends IPost {
    likes: string[];
    comments: string[];
    tags: string[];
}

export interface IPostExtended extends IPostLikeComment, IPostImage {
    _id: string;
    createdAt: string;
    updatedAt: string;
}
