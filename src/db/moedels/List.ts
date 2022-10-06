import { IList, listModel } from "../schemas/list"
interface IMongoListModel {
    createList: (listInfo: IList) => Promise<IList>
    getAllList: () => Promise<IList[]>
    updateIsSuccess: (id: string) => Promise<IList | null>
    deleteList: (id: string) => Promise<IList | null>
} 

export class MongoListModel implements IMongoListModel {
    public listModel = listModel
    

    public createList = async (listInfo: IList): Promise<IList> => {
        const newList = new this.listModel(listInfo)
        newList.save().then(() => console.log("make list succ"))
        
        return newList
    }

    public getAllList = async (): Promise<IList[]> => {
        const lists = await this.listModel.find()

        return lists
    }

    public updateIsSuccess = async (id: string): Promise<IList | null> => {
        const foundList = await this.listModel.findListById(id)
        if (!foundList) {
            throw new Error("해당 리스트가 없습니다.")

        } else if (foundList.isSuccess === true) {
            const updatedIsSuccess = await this.listModel.findByIdAndUpdate(id, { isSuccess: false }, { new: true })
            return updatedIsSuccess

        } else {
            const updatedIsSuccess = await this.listModel.findByIdAndUpdate(id, { isSuccess: true }, { new: true })
            return updatedIsSuccess
        }
    }

    public deleteList = async (id: string): Promise<IList | null> => {
        const foundList = await this.listModel.findListById(id)
        if (!foundList) {
            throw new Error("해당 리스트가 없습니다.")
        }
        
        const deletedList = await this.listModel.findByIdAndDelete(id)

        return deletedList
    }
}