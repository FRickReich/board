import { Request, Response } from 'express';
import BoardSubCategory, { IBoardSubCategory } from '../../Models/BoardSubCategory';

export const getSubCategoryIndex = (req: Request, res: Response)  =>
{
    const { slug } = req.params;

    BoardSubCategory.findOne({ slug }).populate({
        path: 'threads',
        populate:
        [
            {
                path: 'authorId',
                select: 'profile.userName _id slug'
            },
            {
                path: 'parent',
                select: 'title _id slug'
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
    }).exec((err: Error, subCategory: IBoardSubCategory) =>
    {
        if(err) return res.status(401).json({ success: false, error: true, message: err.message });
        if (subCategory) return res.send({ success: true, subCategory });
    });
};
