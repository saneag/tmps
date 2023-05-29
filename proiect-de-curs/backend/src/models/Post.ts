import mongoose from 'mongoose';

import { IPostImage } from '../interfaces/IPost/IPost';

const PostSchema = new mongoose.Schema<IPostImage>({
    title: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (value: string) => {
                return /^[a-zA-Z0-9]+$/.test(value);
            },
            message: 'Please enter a valid title.',
        },
        minLength: 3,
        maxLength: 50,
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 1000,
    },
    image: {
        type: String,
        default: '',
    },
    creator: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        avatarUrl: {
            type: String,
            default: '',
        },
    },
    comments: {
        type: [String],
        default: [],
    },
    reactions: {
        type: [String],
        default: [],
    },
    tags: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model<IPostImage>('Post', PostSchema);
