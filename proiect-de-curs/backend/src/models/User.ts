import mongoose from 'mongoose';

import { IUser } from '../interfaces/IUser';

const UserSchema = new mongoose.Schema<IUser>(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            validate: {
                validator: (value: string) => {
                    return /^[a-zA-Z0-9]+$/.test(value);
                },
                message: 'Please enter a valid name.',
            },
            minLength: 3,
            maxLength: 20,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            validate: {
                validator: (value: string) => {
                    return /^[a-zA-Z0-9]+$/.test(value);
                },
                message: 'Please enter a valid name.',
            },
            minLength: 3,
            maxLength: 20,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            validate: {
                validator: (value: string) => {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                },
                message: 'Please enter a valid email.',
            },
        },
        passwordHash: {
            type: String,
            required: true,
        },
        avatarUrl: {
            type: String,
            default: '',
        },
        role: {
            type: String,
            enum: ['user', 'moderator', 'admin'],
            default: 'user',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        friendRequests: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        friendRequestsSent: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IUser>('User', UserSchema);