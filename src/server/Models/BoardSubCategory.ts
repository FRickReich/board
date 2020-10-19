import mongoose from 'mongoose';
import Schema = mongoose.Schema;
import Document = mongoose.Document;

export interface IBoardSubCategory extends Document
{
    title: string;
}

const schema: Schema = new Schema({
    title:
    {
        type: String,
        required: true,
        unique: true
    }
});

export default mongoose.model<IBoardSubCategory>('BoardSubCategory', schema, 'BoardSubCategories', true);
