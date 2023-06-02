import { ICommand } from '../../../interfaces/IUser/Command/ICommand';
import User from '../../../models/User';
import { Request, Response } from 'express';

export class GetUser implements ICommand {
    public async execute(req: Request, res: Response): Promise<void> {
        const user = await User.findById(req.params.userId).lean();

        if (!user) {
            res.status(404).json({
                message: 'User not found',
            });
            return;
        }

        res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            avatarUrl: user.avatarUrl,
            description: user.description,
        });
    }
}
