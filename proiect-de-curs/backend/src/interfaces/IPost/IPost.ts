import mongoose from 'mongoose';
import { IUser } from '../IUser/IUser';

export interface IPostMongo extends IPost, mongoose.Document {
    _id: string;
}

export interface IPost {
    creator: IUser;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    comments: string[];
    reactions: string[];
    tags: string[];
}

export interface IPostImage extends IPost {
    image: string;
}
