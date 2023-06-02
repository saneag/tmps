import { IUserImage } from './IUser';
import { IComment } from './IComment';

export interface IPost {
    title: string;
    content: string;
    creator: IUserImage;
}

export interface IPostImage extends IPost {
    image: string;
}

export interface IPostLikeComment extends IPost {
    reactions: IPostReaction[];
    comments: IComment[];
    tags: string[];
    numberOfLikes: number;
    numberOfDislikes: number;
    numberOfComments: number;
}

export interface IPostExtended extends IPostLikeComment, IPostImage {
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface IPostReaction {
    email: string;
    like?: boolean;
    dislike?: boolean;
}
