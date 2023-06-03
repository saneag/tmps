import { Request, Response } from 'express';

import { ICommand } from '../../../interfaces/IPost/Command/ICommand';
import Post from '../../../models/Post';

export class DeletePost implements ICommand {
    public async execute(req: Request, res: Response): Promise<void> {
        const { postId } = req.params;

        try {
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
