import { IList, listModel } from "../schemas/list"

export class MongoListModel {
    private listModel = listModel

    private createList = async (listInfo: IList): Promise<IList> => {
        const newList = await this.listModel.create(listInfo)

        return newList
    }
}