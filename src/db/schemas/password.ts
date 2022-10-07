import mongoose, { Document, Model, model, Schema } from "mongoose";
export interface IPassword{
  password: string
}

// Model을 통해 생성되는 아이가 다큐먼트이다.
// PasswordSchema Method로 생성되는 아이의 타입이 들어가는 곳
interface IPasswordDocument extends IPassword, Document {

}

// Model을 통해 생성되는 아이가 다큐먼트이다.
// PasswordSchema statics로 생성되는 아이의 타입이 들어가는 곳
    interface IPasswordModel extends Model<IPasswordDocument> {
        findPassword:() => Promise<IPassword>
}

const passwordSchema: Schema<IPasswordDocument> = new Schema(
  {
    password: {
        type: String,
        required: true,
    }
  },
  {
      timestamps: true,
  },
);

passwordSchema.statics.findPassword = function () { return this.find({})}

export const passwordModel = mongoose.model<IPasswordDocument, IPasswordModel>("Password", passwordSchema)
