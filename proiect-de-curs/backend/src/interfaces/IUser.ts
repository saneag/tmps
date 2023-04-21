import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    avatarUrl: string;
    role: 'user' | 'moderator' | 'admin';
    createdAt: Date;
    updatedAt: Date;
    friends: string[];
    friendRequests: string[];
    friendRequestsSent: string[];
}
