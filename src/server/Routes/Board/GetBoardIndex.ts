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
                        select: 'profile.userName _id slug'
                    },
                    {
                        path: 'posts',
                        populate:
                        [
                            {
                                path: 'authorId',
                                select: 'profile.userName _id updatedAt slug'
                            },
                            {
                                path: 'parent',
                                select: '_id updatedAt title slug'
                            }
                        ]
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
