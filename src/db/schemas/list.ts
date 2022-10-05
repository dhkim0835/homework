import mongoose, { Document, Model, model, Schema } from "mongoose";
export interface IList{
  description: string
  isSuccess?: boolean
}

interface IListDocument extends IList, Document {
  findListById: (id: string) => Promise<IList>
}

interface IListModel extends Model<IListDocument> {

}

const listSchema: Schema<IListDocument> = new mongoose.Schema(
  {
    description: {
        type: String,
        required: true,
    },
    isSuccess: {
        type: Boolean,
        required: true,
        default: false
    }
  },
  {
      timestamps: true,
  },
);

listSchema.statics.findListById = function (id: string){ return this.findById(id) }

export const listModel = mongoose.model<IListDocument, IListModel>("List", listSchema)