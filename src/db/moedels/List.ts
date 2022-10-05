import { IList, listModel } from "../schemas/list"

export class MongoListModel {
    private listModel = listModel

    private createList = async (listInfo: IList): Promise<IList> => {
        const newList = new this.listModel(listInfo)
        newList.save().then(() => console.log("make list succ"))

        return newList
    }

    private getAllList = async (): Promise<IList[]> => {
        const lists = await this.listModel.find()

        return lists
    }

    private updateIsSuccess = async (id) => {
        const foundList = await this.findListById(id)
        if (!foundList) {
            throw new Error("해당 리스트가 없습니다.")
        } else if (foundList.isSuccess === true) {
            const updatedIsSuccess = await this.listModel.findByIdAndUpdate(id, { isSuccess: false })
            return updatedIsSuccess
        } else {
            const updatedIsSuccess = await this.listModel.findByIdAndUpdate(id, { isSuccess: true })
            return updatedIsSuccess
        }
    }

    private findListById = async (id: string): Promise<IList | null> => {
        const foundList = await this.listModel.findById(id)

        return foundList
    } 
}