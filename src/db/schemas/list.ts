import { Model, model, Schema } from "mongoose";
export interface IList{
    username: string
    email: string
    description: string
    country: string
}
export const listSchema = new Schema(
  {
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
        }
  },
  {
      timestamps: true,
  },
);

export const listModel = model<IList>("List", listSchema)

