import { Request, Response } from 'express';

import { IPostController } from '../../interfaces/IPost/IPostController';
import { PostDecorator } from './Decorator/PostDecorator';
import Post from '../../models/Post';
import { PostDestructuring } from '../../utils/postDestructuring';
import User from '../../models/User';

class PostController implements IPostController {
    private static _instance: PostController;

    private constructor() {}

    static getInstance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new PostController();
        return this._instance;
    }

    public async createPost(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findById(req.params.userId).lean();

            if (!user) {
                res.status(401).json({
                    message: 'Invalid credentials',
                });
                return;
            }

            const { title, content } = req.body;

            if (!title || !content) {
                res.status(400).json({
                    message: 'Title and content are required.',
                });
                return;
            }

            const postDecorator = new PostDecorator();
            const formattedText = postDecorator.decorateText(content);

            await Post.create({
                title,
                content: formattedText,
                creator: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    avatarUrl: user.avatarUrl,
                },
            });

            res.status(201).json({
                message: 'Post created successfully.',
            });
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong.',
            });
        }
    }

    public async createPostWithImage(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const user = await User.findById(req.params.userId).lean();

            if (!user) {
                res.status(401).json({
                    message: 'Invalid credentials',
                });
                return;
            }

            const { title, content, image } = req.body;

            if (!title || !content || !image) {
                res.status(400).json({
                    message: 'Title, content and image are required.',
                });
                return;
            }

            const postDecorator = new PostDecorator();
            const formattedText = postDecorator.decorateText(content);

            await Post.create({
                title,
                content: formattedText,
                creator: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    avatarUrl: user.avatarUrl,
                },
                image,
            });

            res.status(201).json({
                message: 'Post created successfully.',
            });
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong.',
            });
        }
    }

    public async deletePost(req: Request, res: Response): Promise<void> {
        return Promise.resolve(undefined);
    }

    public async getPost(req: Request, res: Response): Promise<void> {
        return Promise.resolve(undefined);
    }

    public async getPosts(req: Request, res: Response): Promise<void> {
        try {
            const limit = parseInt(req.query.limit as string);
            const page = parseInt(req.query.page as string);
            const search = (req.query.search as string) || '';

            const posts = await Post.find({
                title: { $regex: search, $options: 'i' },
            })
                .limit(limit)
                .skip(limit * (page - 1))
                .sort({ createdAt: -1 });

            const simplifiedPosts = posts.map((post) => {
                const postDecorator = new PostDecorator();
                const simplifiedText = postDecorator.simplifyText(post.content);

                return {
                    ...post.toObject(),
                    content: simplifiedText,
                };
            });

            res.status(200).json({
                message: 'Posts fetched successfully.',
                posts: simplifiedPosts,
            });
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong.',
            });
        }
    }

    public async updatePost(req: Request, res: Response): Promise<void> {
        return Promise.resolve(undefined);
    }
}

export default PostController.getInstance();
