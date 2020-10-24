import mongoose from 'mongoose';
import BoardSubCategory, { IBoardSubCategory } from './../Models/BoardSubCategory';
import ObjectId = mongoose.Types.ObjectId;

interface INewSubCategory { title: string; parent: ObjectId; }

type newSubCategoryCallback = ( result?: IBoardSubCategory )  => void;

export const createNewSubCategory = (subCategory: INewSubCategory, callback: newSubCategoryCallback) =>
{
    const newSubCategory = new BoardSubCategory(subCategory);

    newSubCategory
        .save()
        .then(savedSubCategory => callback(savedSubCategory))
        .catch(err => new Error(err));
};
