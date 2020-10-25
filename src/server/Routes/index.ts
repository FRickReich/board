import express = require('express');

import { testRoute } from './Test/Test';
import { userGetByUsernameRoute } from './User/GetByUsername';
import { userRegisterRoute } from './User/Register';
import { userSinginRoute } from './User/Signin';
import { userVerifyRoute } from './User/Verify';
import { getBoardInfo } from './Board/GetBoardInfo';
import { getBoardIndex } from './Board/GetBoardIndex';
import { getSubCategoryIndex } from './Board/GetSubCategoryIndex';
import { getThreadIndex } from './Board/GetThreadIndex';

const router = (app: express.Application) =>
{
    // Test routes
    app.get('/api/test', testRoute);

    // User routes
    app.post('/api/user/register', userRegisterRoute);
    app.post('/api/user/signin', userSinginRoute);
    app.get('/api/user/verify', userVerifyRoute);
    app.get('/api/user/get/username/:username', userGetByUsernameRoute);

    // Board routes
    app.get('/api/board/info', getBoardInfo);
    app.get('/api/board/index', getBoardIndex);
    app.get('/api/board/subCategory/:slug', getSubCategoryIndex);
    app.get('/api/board/thread/', getThreadIndex);
};

export { router };
