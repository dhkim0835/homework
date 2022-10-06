import mongoose, { Document, Model, model, Schema } from "mongoose";
export interface IList{
  description: string
  isSuccess?: boolean
}

// Model을 통해 생성되는 아이가 다큐먼트이다.
// listSchema Method로 생성되는 아이의 타입이 들어가는 곳
interface IListDocument extends IList, Document {

}

// Model을 통해 생성되는 아이가 다큐먼트이다.
// listSchema statics로 생성되는 아이의 타입이 들어가는 곳
interface IListModel extends Model<IListDocument> {
  findListById: (id: string) => Promise<IList>
  getListWithPagenation: (skip: number, limit: number ) => Promise<IList[]>
}

const listSchema: Schema<IListDocument> = new Schema(
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
listSchema.statics.getListWithPagenation = function (page: number, perPage: number) {
  return this
    .find({})
    .sort({ createdAt: 1 })
    .skip(perPage * (page - 1))
    .limit(perPage)
}

export const listModel = mongoose.model<IListDocument, IListModel>("List", listSchema)
