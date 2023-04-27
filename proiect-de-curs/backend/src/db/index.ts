import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

class Database {
    private static _instance: Database;
    private readonly connection: mongoose.Connection;

    private constructor() {
        mongoose.connect(process.env.MONGOURI as string).then(() => {});

        this.connection = mongoose.connection;
        this.connection.on('error', (err) => {
            console.error('connection error:', err);
        });
        this.connection.once('open', () => {
            console.log('Connected to Database');
        });
    }

    public static getInstance(): Database {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new Database();
        return this._instance;
    }

    public getConnection(): mongoose.Connection {
        return this.connection;
    }
}

export default Database.getInstance();
