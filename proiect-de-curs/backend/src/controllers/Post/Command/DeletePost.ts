import { Request, Response } from 'express';

import Post from '../../../models/Post';

import { ICommand } from '../../../interfaces/IPost/Command/ICommand';

export class DeletePost implements ICommand {
    public async execute(req: Request, res: Response): Promise<void> {
        try {
            const { postId } = req.params;

            const post = await Post.findById(postId).lean();

            if (!post) {
                res.status(404).json({
                    message: 'Post not found.',
                });
            }

            await Post.findByIdAndDelete(postId);

            res.status(200).json({
                message: 'Post deleted successfully.',
            });
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong.',
            });
        }
    }
}
