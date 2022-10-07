import { IService } from "../api/routes/listRouter"
import { IList } from "../db/schemas/list"
import { IPassword } from "../db/schemas/password"

type pagenation = {
    lists: IList[],
    totalPage: number
}
export interface IListModel {
    createList: (listInfo: IList) => Promise<IList>
    getAllList: () => Promise<IList[]>
    updateIsSuccess: (id: string) => Promise<IList | null>
    deleteList: (id: string) => Promise<IList | null>
    getListWithPagenation: (perPage: number, page: number) => Promise<pagenation>
}

export interface IPasswordModel {
    createPassword: (password: string) => Promise<IPassword>
    comparePassword: (password: string) => Promise<boolean>
}

export class ListService implements IService {
    public listModel: IListModel
    public passwordModel: IPasswordModel
    constructor(listModel, passwordModel) {
        this.listModel = listModel
        this.passwordModel = passwordModel
    }

    public createList = async (listInfo: IList): Promise<IList> => {
        const newList = await this.listModel.createList(listInfo)
        return newList
    }

    public getAllList = async (): Promise<IList[]> => {
        const lists = await this.listModel.getAllList()

        return lists
    }

    public getListWithPagenation = async (page, perPage) => {
        const pagenatedList = await this.listModel.getListWithPagenation(page, perPage)
        
        return pagenatedList
    }

    public updateIsSuccess = async (id: string): Promise<IList | null>  => {
        const updatedIsSuccess = await this.listModel.updateIsSuccess(id)

        return updatedIsSuccess
    }

    public deleteList = async (id: string, password: string): Promise<IList | null> => {
        const isPassword = await this.passwordModel.comparePassword(password)
        if (isPassword === true) {
            const deletedList = await this.listModel.deleteList(id)

            return deletedList
        } else {
            throw new Error ("비밀번호가 일치하지 않습니다.")
        }
    }
}