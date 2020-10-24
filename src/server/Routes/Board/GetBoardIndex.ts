import { Request, Response } from 'express';
import Board from './../../Models/Board';

export const getBoardIndex = (req: Request, res: Response)  =>
{
    Board.find({}).populate({
        path: 'categories',
        populate:
        {
            path: 'subCategories',
            populate:
            {
                path: 'threads',
                populate:
                [
                    {
                        path: 'authorId',
                        select: 'profile.userName _id'
                    },
                    {
                        path: 'posts',
                        populate: 'authorId',
                        select: 'profile.userName _id'
                    }
                ]
        }}})
        .populate({
            path: 'adminUser',
            select: 'profile.userName _id'
        }).exec((err, board) =>
    {
        if(err) return res.status(401).json({ success: false, error: true, message: err.message });
        if(board) return res.send({ success: true, board });
    });
};
