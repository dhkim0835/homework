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
}