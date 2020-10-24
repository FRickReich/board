import mongoose from 'mongoose';
import BoardCategory, { IBoardCategory } from './../Models/BoardCategory';
import ObjectId = mongoose.Types.ObjectId;

interface INewCategory { title: string; parent: ObjectId; }

type newCategoryCallback = ( result?: IBoardCategory )  => void;

export const createNewCategory = (category: INewCategory, callback: newCategoryCallback) =>
{
    const newCategory = new BoardCategory(category);

    newCategory
        .save()
        .then(savedCategory => callback(savedCategory))
        .catch(err => new Error(err));
};
