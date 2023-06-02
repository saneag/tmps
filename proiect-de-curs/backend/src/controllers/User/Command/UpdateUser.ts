import { ICommand } from '../../../interfaces/IUser/Command/ICommand';
import User from '../../../models/User';
import { UserBuilder } from '../Builder/UserBuilder';
import { UserDestructuring } from '../../../utils/userDestructuring';
import { Request, Response } from 'express';

export class UpdateUser implements ICommand {
    public async execute(req: Request, res: Response): Promise<void> {
        const user = await User.findById(req.params.userId).lean();

        if (!user) {
            res.status(404).json({
                message: 'User not found',
            });
            return;
        }

        const userBuilder = new UserBuilder();
        userBuilder
            .setFirstName(req.body.firstName)
            .setLastName(req.body.lastName)
            .setEmail(req.body.email)
            .setAvatarUrl(req.body.avatarUrl)
            .setDescription(req.body.description);

        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                ...userBuilder.buildUpdate(),
            },
            {
                new: true,
            }
        ).lean();

        const destructuredUser = UserDestructuring(updatedUser);

        res.status(200).json({
            firstName: destructuredUser.firstName,
            lastName: destructuredUser.lastName,
            email: destructuredUser.email,
            role: destructuredUser.role,
            avatarUrl: destructuredUser.avatarUrl,
            description: destructuredUser.description,
        });
    }
}
