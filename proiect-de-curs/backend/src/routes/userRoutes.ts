import express from 'express';
import path from 'path';
import fs from 'fs';

import {
    checkAuth,
    loginValidation,
    registerValidation,
    validateErrors,
} from '../middlewares';
import UserController from '../controllers/User/UserController';
import multerInstance from '../shared/multerInstance';

const userRoutes = express.Router();
const upload = multerInstance.init('userAvatar').getMulterUpload();

userRoutes.get('/user', checkAuth, UserController.getUser);
userRoutes.get('/user/:email', UserController.getUserByEmail);

userRoutes.post(
    '/user/register',
    registerValidation,
    validateErrors,
    UserController.register
);
userRoutes.post(
    '/user/login',
    loginValidation,
    validateErrors,
    UserController.login
);
userRoutes.post('/user/logout', UserController.logout);
userRoutes.post('/user/refreshAccessToken', UserController.refreshAccessToken);
userRoutes.post(
    '/user/userAvatar',
    checkAuth,
    upload.single('avatar'),
    (req: any, res) => {
        res.json({
            url: `uploads/userAvatar/${req.file.filename}`,
        });
    }
);

userRoutes.patch('/user/updateUser', checkAuth, UserController.updateUser);
userRoutes.patch('/user/follow/:email', checkAuth, UserController.followUser);

userRoutes.delete('/user/userAvatar/:fileName', checkAuth, (req: any, res) => {
    const filePath = path.join(__dirname, `uploads/${req.params.fileName}`);

    fs.unlink(filePath, (err) => {
        if (err) {
            res.status(500).json({
                message: 'Something went wrong',
            });
            return;
        }

        res.json({
            message: 'File deleted',
        });
    });
});

export default userRoutes;
