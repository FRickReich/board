import mongoose from 'mongoose';
import BoardSubCategory, { IBoardSubCategory } from './BoardSubCategory';
import Schema = mongoose.Schema;
import Document = mongoose.Document;

export interface IBoardCategory extends Document
{
    title: string;
    subCategories: IBoardSubCategory[];
}

const schema: Schema = new Schema({
    title:
    {
        type: String,
        required: true,
        unique: true
    },
    subCategories: Array(BoardSubCategory)
});

export default mongoose.model<IBoardCategory>('BoardCategory', schema, 'BoardCategories', true);
