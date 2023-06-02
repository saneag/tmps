import { IUserImage } from './IUser';

export interface IComment {
    postId: string;
    userId: string;
    content: string;
    creator: IUserImage;
    createdAt: string;
    updatedAt: string;
}
