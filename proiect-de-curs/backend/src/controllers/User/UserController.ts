import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

import { comparePasswords, hashPassword } from '../../utils/hashPassword';

import User from '../../models/User';
import { IDecodedJwt } from '../../interfaces/IDecodedJwt';
import { UserBuilder } from './UserBuilder';
import { userDestructuring } from '../../utils/userDestructuring';
import * as console from 'console';

export class UserController {
    private static _instance: UserController;

    private constructor() {}

    static getInstance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new UserController();
        return this._instance;
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email }).lean();

            if (!user) {
                res.status(401).json({
                    message: 'Invalid credentials',
                });
                return;
            }

            const isPasswordValid = await comparePasswords(
                password,
                user.passwordHash
            );

            if (!isPasswordValid) {
                res.status(401).json({
                    message: 'Invalid credentials',
                });
                return;
            }

            const accessToken = jwt.sign(
                { userId: user._id },
                process.env.JWTSECRET as string,
                {
                    expiresIn: '1h',
                }
            );

            const refreshToken = jwt.sign(
                { userId: user._id },
                process.env.JWTREFRESHSECRET as string,
                {
                    expiresIn: '14d',
                }
            );

            await User.updateOne(
                {
                    _id: user._id,
                },
                {
                    $set: {
                        refreshToken,
                    },
                }
            );

            res.status(200).json({
                message: 'Login successful',
                accessToken: accessToken,
                refreshToken: refreshToken,
            });
        } catch (error) {
            console.error(error as Error);
            res.status(500).send('Server error');
        }
    }

    public async refreshAccessToken(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const { refreshToken } = req.body;
            let isExpired = false;

            jwt.verify(
                refreshToken,
                process.env.JWTREFRESHSECRET as string,
                function (err: any, decoded: any) {
                    if (err) {
                        isExpired = true;
                    } else {
                        const currentTime = Math.floor(Date.now() / 1000); // in seconds
                        isExpired = decoded.exp < currentTime;
                    }
                }
            );

            if (isExpired) {
                res.status(401).json({
                    message: 'Invalid refresh token',
                });
                return;
            }

            const decoded: IDecodedJwt = jwt.verify(
                refreshToken,
                process.env.JWTREFRESHSECRET as string
            ) as IDecodedJwt;

            const user = await User.findOne({
                _id: decoded.userId,
            }).lean();

            if (!user) {
                res.status(401).json({
                    message: 'Invalid refresh token',
                });
                return;
            }

            const accessToken = jwt.sign(
                { userId: user._id },
                process.env.JWTSECRET as string,
                {
                    expiresIn: '1h',
                }
            );

            res.status(200).json({
                message: 'Access token refreshed',
                accessToken: accessToken,
            });
        } catch (error) {
            console.error(error as Error);
            res.status(500).send('Server error');
        }
    }

    public async register(req: Request, res: Response): Promise<void> {
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

    public async logout(req: Request, res: Response): Promise<void> {
        res.cookie('accessToken', '', {
            httpOnly: true,
            expires: new Date(0),
        });

        res.cookie('refreshToken', '', {
            httpOnly: true,
            expires: new Date(0),
        });

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.status(200).json({
            message: 'Logout successful',
        });
    }

    public async getUser(req: Request, res: Response): Promise<void> {
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

    public async updateUser(req: Request, res: Response): Promise<void> {
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

        const destructuredUser = userDestructuring(updatedUser);
        console.log(destructuredUser);

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

export default UserController.getInstance();
