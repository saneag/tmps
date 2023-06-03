import { Request, Response } from 'express';

import { ICommand } from '../../../interfaces/IPost/Command/ICommand';
import User from '../../../models/User';
import { PostBuilder } from '../Builder/PostBuilder';
import { PostDecorator } from '../Decorator/PostDecorator';

export class UpdatePost implements ICommand {
    public async execute(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { title, content, image } = req.body;

        const post = await User.findById(id).lean();

        if (!post) {
            res.status(404).json({
                message: 'Post not found.',
            });
        }

        const postDecorator = new PostDecorator();
        const formattedText = postDecorator.decorateText(content);

        const postBuilder = new PostBuilder();

        postBuilder
            .setTitle(title)
            .setContent(formattedText)
            .setImage(image)
            .setUpdatedAt(new Date());

        const updatedPost = await User.findByIdAndUpdate(
            id,
            {
                ...postBuilder.buildUpdate(),
            },
            {
                new: true,
            }
        ).lean();

        res.status(200).json({
            message: 'Post updated successfully.',
        });
    }
}
