import { IList } from "../db/schemas/list"

export class ListService {
    private model
    constructor(model) {
        this.model = model
    }

    private createList = async (listInfo: IList): Promise<IList> => {
        const newList = await this.model.createList(listInfo)

        return newList
    }
}