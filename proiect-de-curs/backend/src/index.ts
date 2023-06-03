import express from 'express';
import * as path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';

import Database from './db';

import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';

const app = express();
dotenv.config();

Database.getConnection();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/hf', userRoutes, postRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
    console.log(`Error starting server: ${err.message}`);
});
