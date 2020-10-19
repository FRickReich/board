import express = require('express');

import { testRoute } from './Test/Test';
import { userRegisterRoute } from './User/Register';
import { userSinginRoute } from './User/Signin';
import { userVerifyRoute } from './User/Verify';

const router = (app: express.Application) =>
{
    // Test routes
    app.get('/api/test', testRoute);

    // User routes
    app.post('/api/user/register', userRegisterRoute);
    app.post('/api/user/signin', userSinginRoute);
    app.get('/api/user/verify', userVerifyRoute);
};

export { router };
