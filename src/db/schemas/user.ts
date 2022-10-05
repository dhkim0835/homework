import { Model, model, Schema } from "mongoose";
export interface IUser{
    username: string
    email: string
    list: string
    country: string
}
export const userSchema = new Schema(
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

export const userModel = model<IUser>("User", userSchema)

