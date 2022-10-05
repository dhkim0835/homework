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

    private getAllList = async (): Promise<IList[]> => {
        const lists = await this.model.getAllList()

        return lists
    }

    private updateIsSuccess = async (id: string): Promise<IList | null>  => {
        const updatedIsSuccess = await this.model.updateIsSuccess(id)

        return updatedIsSuccess
    }

    private deleteList = async (id: string): Promise<IList | null>  => {
        const deletedList = await this.model.deleteList(id)

        return deletedList
    }
}