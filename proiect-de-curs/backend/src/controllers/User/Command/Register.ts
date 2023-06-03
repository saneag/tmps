import { ICommand } from '../../../interfaces/IUser/Command/ICommand';
import { hashPassword } from '../../../utils/PasswordHashFacade';
import { UserBuilder } from '../Builder/UserBuilder';
import User from '../../../models/User';
import { Request, Response } from 'express';

export class Register implements ICommand {
    public async execute(req: Request, res: Response): Promise<void> {
        try {
            const passwordHash = await hashPassword(req.body.password);

            const userBuilder = new UserBuilder();
            userBuilder
                .setFirstName(req.body.firstName)
                .setLastName(req.body.lastName)
                .setEmail(req.body.email)
                .setPasswordHash(passwordHash)
                .setAvatarUrl(req.body.avatarUrl);

            const user = new User({
                ...userBuilder.build(),
            });

            await user.save();
            res.status(201).json(user);
        } catch (error) {
            console.error(error as Error);
            res.status(409).send('Conflict');
        }
    }
}
