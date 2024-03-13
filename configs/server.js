'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
// import userRoutes from '../src/user/user.routes.js';
// import authRoutes from '../src/auth/auth.routes.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/business/v1/users';
        this.authPath = '/business/v1/auth';

        this.middlewares();
        this.connectDB();
        this.routes();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    async connectDB(){
        await dbConnection();
    }

    routes(){
        // this.app.use(this.userPath, userRoutes);
        // this.app.use(this.authPath, authRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

export default Server;