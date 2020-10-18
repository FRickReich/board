import { Request, Response } from 'express';

export const testRoute = (req: Request, res: Response) =>
{
    if (!req['user']) return res.status(401).json({ success: false, message: 'Invalid or no User with access specified.' });
    res.send({ success: true });
};
