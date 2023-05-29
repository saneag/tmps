import mongoose from 'mongoose';
import { ISimpleUser, IUser } from '../IUser/IUser';

export interface IPostMongo extends IPost, mongoose.Document {
    _id: string;
}

export interface IPost extends IImagePost {
    creator: ISimpleUser;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    comments: string[];
    reactions: string[];
    tags: string[];
}

export interface IBasicPost {
    title: string;
    content: string;
    creator: ISimpleUser;
}

export interface IImagePost extends IBasicPost {
    image: string;
}

export interface IPostUpdate {
    title: string;
    content: string;
    image: string;
    updatedAt: Date;
}
