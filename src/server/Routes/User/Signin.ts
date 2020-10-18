import { Request, Response } from 'express';
import { generateToken, getCleanUser } from '../../utils';

const mockUser =
{
    _id: '12345',
    password: 'test',
    name: 'F. Rick Reich',
    email: 'test@test.com',
    username: 'frickreich',
    isAdmin: true
};

export const userSinginRoute = (req: Request, res: Response) =>
{
    const email = req.body.email;
    const pwd = req.body.password;

    if (!email || !pwd)
    {
        return res.status(400).json({
            error: true,
            message: 'Username or Password required.'
        });
    }

    if (email !== mockUser.email || pwd !== mockUser.password)
    {
        return res.status(401).json({
            error: true,
            message: 'Username or Password is Wrong.'
        });
    }

    const token = generateToken(mockUser);
    const userObj = getCleanUser(mockUser);

    return res.json({ user: userObj, token });
}
