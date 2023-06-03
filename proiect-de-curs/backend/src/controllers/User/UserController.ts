import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

import User from '../../models/User';
import Notification from '../../models/Notification';

import { IUserController } from '../../interfaces/IUser/IUserController';
import { ICommand } from '../../interfaces/IUser/Command/ICommand';

import { userCommands } from './Command';

export class UserController implements IUserController {
    private static _instance: UserController;

    private loginCommand: ICommand;
    private refreshAccessTokenCommand: ICommand;
    private registerCommand: ICommand;
    private logoutCommand: ICommand;
    private getUserCommand: ICommand;
    private getUserByEmailCommand: ICommand;
    private updateUserCommand: ICommand;

    private constructor() {
        this.loginCommand = new userCommands.login();
        this.refreshAccessTokenCommand = new userCommands.refreshAccessToken();
        this.registerCommand = new userCommands.register();
        this.logoutCommand = new userCommands.logout();
        this.getUserCommand = new userCommands.getUser();
        this.getUserByEmailCommand = new userCommands.getUserByEmail();
        this.updateUserCommand = new userCommands.updateUser();
    }

    static getInstance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new UserController();
        return this._instance;
    }

    public async login(req: Request, res: Response): Promise<void> {
        await this.loginCommand.execute(req, res);
    }

    public async refreshAccessToken(
        req: Request,
        res: Response
    ): Promise<void> {
        await this.refreshAccessTokenCommand.execute(req, res);
    }

    public async register(req: Request, res: Response): Promise<void> {
        await this.registerCommand.execute(req, res);
    }

    public async logout(req: Request, res: Response): Promise<void> {
        await this.logoutCommand.execute(req, res);
    }

    public async getUser(req: Request, res: Response): Promise<void> {
        await this.getUserCommand.execute(req, res);
    }

    public async getUserByEmail(req: Request, res: Response): Promise<void> {
        await this.getUserByEmailCommand.execute(req, res);
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        await this.updateUserCommand.execute(req, res);
    }

    public async followUser(req: Request, res: Response): Promise<void> {
        const user = await User.findById(req.params.userId).lean();

        if (!user) {
            res.status(404).json({
                message: 'User not found',
            });
            return;
        }

        const userToFollow = await User.findOne({
            email: req.params.email,
        }).lean();

        if (!userToFollow) {
            res.status(404).json({
                message: 'User not found',
            });
            return;
        }

        if (user._id.toString() === userToFollow._id.toString()) {
            res.status(400).json({
                message: 'You cannot follow yourself',
            });
            return;
        }

        await User.findByIdAndUpdate(req.params.userId, {
            $addToSet: {
                following: userToFollow._id,
            },
        });

        await User.findByIdAndUpdate(userToFollow._id, {
            $addToSet: {
                followers: user._id,
            },
        });

        const notification = new Notification({
            user: user.email,
            message: `${user.firstName} ${user.lastName} started following you`,
        });

        await notification.save();

        res.status(200).json({
            message: 'User followed',
        });
    }
}

export default UserController.getInstance();
