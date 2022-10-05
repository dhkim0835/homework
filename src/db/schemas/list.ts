import { Model, model, Schema } from "mongoose";
export interface IList{
  description: string
  isSuccess?: boolean
}
export const listSchema = new Schema(
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

export const listModel = model<IList>("List", listSchema)

