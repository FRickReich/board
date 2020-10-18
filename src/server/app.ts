import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import { router } from './Routes';

class App
{
    app: express.Application;
    serviceName: string;
    servicePort: number;
    buildPath: string;
    database: string;
    jwtSecret: string;

    constructor()
    {
        this.app = express();
        this.serviceName = process.env.SERVICE_NAME || 'template';
        this.servicePort = Number(process.env.SERVICE_PORT) || 3000;
        this.buildPath = process.env.BUILD_PATH || './../build/';
        this.database = process.env.DB_PATH || 'mongodb://207.154.219.225:27017/board';
        this.jwtSecret = process.env.JWT_SECRET || 'secret';
    }

    init = () =>
    {
        this.config();
        this.setApiRoutes();
        this.setReactRoutes();
        this.start();
    }

    config = () =>
    {
        this.app.use(express.static(path.resolve(__dirname, this.buildPath)));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use((req: Request, res: Response, next) =>
        {
            let token = req.headers['authorization'];

            if (!token) return next();

            token = token.replace('Bearer ', '');

            jwt.verify(token, this.jwtSecret, (err: Error, user) =>
            {
                if (err)
                {
                    return res.status(401).json({
                        error: true,
                        message: 'Invalid user.'
                    });
                }
                else
                {
                    req['user'] = user;
                    next();
                }
            });
        });

        mongoose.connect(this.database,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
    }

setApiRoutes = () =>
{
    router(this.app);
}

setReactRoutes = () =>
{
    this.app.get('*', (req, res) =>
    {
        const content = fs.readFileSync(`${path.resolve(__dirname, this.buildPath + '/index.html')}`).toString();

        res.set('content-type', 'text/html');
        res.send(content);
        res.end();
    });
}

start = () =>
{
    this.app.listen(this.servicePort, () =>
    {
        console.log(`Service '${this.serviceName}' listening at http://localhost:${this.servicePort}`);
    });
}
}

export default App;
