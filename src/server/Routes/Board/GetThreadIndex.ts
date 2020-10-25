import { Request, Response } from 'express';
import { threadId } from 'worker_threads';
import BoardSubCategory, { IBoardSubCategory } from './../../Models/BoardSubCategory';
import BoardTread, { IBoardThread } from './../../Models/BoardThread';

export const getThreadIndex = (req: Request, res: Response)  =>
{
    const { slug, subCategorySlug } = req.query;

    BoardSubCategory.findOne({ slug: subCategorySlug.toString() }, (err: Error, subCategory: IBoardSubCategory) =>
    {
        BoardTread.findOne({ slug: slug.toString(), parent: subCategory._id }).populate([
            {
                path: 'authorId',
                select: 'profile.userName _id updatedAt slug'
            },
            {
                path: 'parent',
                select: '_id updatedAt title slug'
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
        ]).exec((err: Error, thread: IBoardThread) =>
        {
            if(err) return res.status(401).json({ success: false, error: true, message: err.message });
            if (subCategory) return res.send({ success: true, thread });
        });
    });
};
