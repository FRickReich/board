import { Request, Response } from 'express';
import { uuid } from 'uuidv4';
import UserProfile from '../../Models/UserProfile';
import UserSettings from '../../Models/UserSettings';
import User, { IUser } from '../../Models/User';
import userGenerator from 'xm-username-generator';

export const userRegisterRoute = (req: Request, res: Response) =>
{
    const { body } = req;
    const { email, password } = body;

    if (!email || !password)
    {
        return res.status(400).json({
            error: true,
            message: 'Username or Password required.'
        });
    }

    User.find({ email }, (err: Error, previousUsers: IUser[]) =>
    {
        if (err)
        {
            return res.status(400).send({
                error: true,
                success: false,
                message: 'Error: Server error'
            });
        }
        else if (previousUsers.length > 0)
        {
            return res.status(400).send({
                error: true,
                success: false,
                message: 'Error: Account already exist.'
            });
        }

        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.generateHash(password);
        newUser.verificationToken = uuid().toString();
        newUser.profile = new UserProfile();
        newUser.profile.userName = userGenerator.getUsername();
        newUser.settings = new UserSettings();

        newUser.save((err: Error, user: IUser) =>
        {
            if (err) {
                return res.status(400).send({
                    error: true,
                    success: false,
                    message: err.message
                });
            }

            return res.send({
                success: true,
                data: {
                    email: user.email
                }
            });
        });
    });
}
