import express from 'express';
import multer from 'multer';
import * as path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import * as fs from 'fs';

import Database from './db';

import UserController from './controllers/User/UserController';
import {
    registerValidation,
    loginValidation,
    validateErrors,
    checkAuth,
} from './middlewares';

const app = express();
dotenv.config();

const db = Database.getConnection();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'src/uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post(
    '/api/hf/register',
    registerValidation,
    validateErrors,
    UserController.register
);
app.post(
    '/api/hf/login',
    loginValidation,
    validateErrors,
    UserController.login
);
app.post('/api/hf/logout', UserController.logout);
app.get('/api/hf/user', checkAuth, UserController.getUser);
app.post('/api/hf/refreshAccessToken', UserController.refreshAccessToken);

app.patch('/api/hf/userUpdate', checkAuth, UserController.updateUser);
app.post(
    '/api/hf/userAvatar',
    checkAuth,
    upload.single('avatar'),
    (req: any, res) => {
        res.json({
            url: `uploads/${req.file.filename}`,
        });
    }
);
app.delete('/api/hf/userAvatar/:fileName', checkAuth, (req: any, res) => {
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

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
    console.log(`Error starting server: ${err.message}`);
});
