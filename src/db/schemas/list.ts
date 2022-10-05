import mongoose, { Model, model, Schema } from "mongoose";
export interface IList{
  description: string
  isSuccess?: boolean
}
const ListSchema = new Schema(
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

export const listModel = mongoose.model("List", ListSchema)