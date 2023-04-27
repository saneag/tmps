import { NextFunction, Request, Response, Router } from 'express';
import { check } from 'express-validator';

import UserController from '../controllers/UserController';

const router = Router();

router.post('/api/hf/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Invalid Email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({
        min: 4,
    }),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await UserController.register(req, res);
        } catch (error) {
            next(error);
        }
    },
]);

router.post(
    '/api/hf/login',
    [
        check('email', 'Invalid Email').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({
            min: 4,
        }),
    ],
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await UserController.login(req, res);
        } catch (error) {
            next(error);
        }
    }
);
