import mongoose from 'mongoose';
import Schema = mongoose.Schema;
import Document = mongoose.Document;

export interface IBoardCategory extends Document
{
    title: string;
    parent: Schema.Types.ObjectId;
    subCategories: Schema.Types.ObjectId[];
}

const schema: Schema = new Schema({
    title:
    {
        type: String,
        required: true,
        unique: true
    },
    parent: { type: Schema.Types.ObjectId, ref: 'Board' },
    subCategories: [{ type: Schema.Types.ObjectId, ref: 'BoardSubCategory' }],
}, { timestamps: true });

export default mongoose.model<IBoardCategory>('BoardCategory', schema, 'BoardCategories', true);
