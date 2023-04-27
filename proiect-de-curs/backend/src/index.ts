import express from 'express';
import multer from 'multer';
import * as path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';

import Database from './db';

import UserController from './controllers/UserController';
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
        cb(null, 'uploads');
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

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
    console.log(`Error starting server: ${err.message}`);
});
