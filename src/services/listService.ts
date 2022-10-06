import { IService } from "../api/routes/listRouter"
import { IList } from "../db/schemas/list"

export interface IModel {
    createList: (listInfo: IList) => Promise<IList>
    getAllList: () => Promise<IList[]>
    updateIsSuccess: (id: string) => Promise<IList | null>
    deleteList: (id: string) => Promise<IList | null>
    getListWithPagenation: (perPage: number, page: number) => Promise<any>
}

export class ListService implements IService {
    public model: IModel
    constructor(model) {
        this.model = model
    }

    public createList = async (listInfo: IList): Promise<IList> => {
        const newList = await this.model.createList(listInfo)
        return newList
    }

    public getAllList = async (): Promise<IList[]> => {
        const lists = await this.model.getAllList()

        return lists
    }

    public getListWithPagenation = async (page, perPage) => {
        const pagenatedList = await this.model.getListWithPagenation(page, perPage)
        
        return pagenatedList
    }

    public updateIsSuccess = async (id: string): Promise<IList | null>  => {
        const updatedIsSuccess = await this.model.updateIsSuccess(id)

        return updatedIsSuccess
    }

    public deleteList = async (id: string): Promise<IList | null>  => {
        const deletedList = await this.model.deleteList(id)

        return deletedList
    }
}