import { Router } from "express"
import { IList } from "../../db/schemas/list"
import config from "../../configs"
export interface IService {
    createList: (listInfo: IList) => Promise<IList>
    getAllList: () => Promise<IList[]>
    updateIsSuccess: (id: string) => Promise<IList | null>
    deleteList: (id: string) => Promise<IList | null>
    getListWithPagenation: (perPage: number, page: number) => Promise<any>
}
export class ListRouter {
    private service: IService
    public listRouter

    constructor(service) {
        this.service = service
        this.listRouter = Router()
        this.routes()
    }

    private createList = async (req, res, next):Promise<void> => {
        try {
            const { description } = req.body
            const newListInfo: IList = {
                description,
            }
            const newList = await this.service.createList(newListInfo)
            
            req.responseObject = newList; 
            req.statusCode = 201
            return next()

        } catch (error) {
            next(error)
        }
    }

    private getAllList = async (req, res, next):Promise<void> => {
        try {
            const lists = await this.service.getAllList()
            if (process.env.NODE_ENV === 'production') {
                req.responseObject = lists; 
                return next()

            } else {
                const userInfo = {name: config.NAME, birth: config.BIRTH}
                req.responseObject = { lists, userInfo }; 
                return next()
            }
            
        } catch (error) {
            next(error)
        }
    }

    private getListWithPagenation = async (req, res, next) => {
        try {
            const page = Number(req.query.page || 1); // 값이 없다면 기본값으로 1 사용
            const perPage = Number(req.query.perPage || 10);

            const pagenatedList = await this.service.getListWithPagenation(page, perPage)

            req.responseObject = pagenatedList
            return next()

        } catch (error) {
            next(error)
        }
    }

    private updateIsSuccess = async (req, res, next):Promise<void> => {
        try {
            const id = req.params.id
            const udpatedIsSuccess = await this.service.updateIsSuccess(id)

            req.responseObject = udpatedIsSuccess
            return next()
        } catch (error) {
            next(error)
        }
    }

    private deleteList = async (req, res, next):Promise<void> => {
        try {
            const id = req.params.id
            const deletedList = await this.service.deleteList(id)

            req.responseObject = deletedList
            return next()
        } catch (error) {
            next(error)
        }
    }

    private routes () {
        this.listRouter.post("/", this.createList)
        this.listRouter.get("/pagenate", this.getListWithPagenation)
        this.listRouter.get("/", this.getAllList)
        this.listRouter.patch("/:id", this.updateIsSuccess)
        this.listRouter.delete("/:id", this.deleteList)
    }
}