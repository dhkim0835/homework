import { Router } from "express"
import { IList } from "../../db/schemas/list"

export class ListRouter {
    private service
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
            
            res.status(201).json(newList)
        } catch (error) {
            next(error)
        }
    }

    private getAllList = async (req, res, next):Promise<void> => {
        try {
            const lists = await this.service.getAllList()

            res.status(200).json(lists)
        } catch (error) {
            next(error)
        }
    }

    private updateIsSuccess = async (req, res, next):Promise<void> => {
        try {
            const id = req.params.id
            const udpatedIsSuccess = await this.service.updateIsSuccess(id)

            res.status(200).json(udpatedIsSuccess) 
        } catch (error) {
            next(error)
        }
    }

    private deleteList = async (req, res, next):Promise<void> => {
        try {
            const id = req.params.id
            const deletedList = await this.service.deleteList(id)

            res.status(200).json(deletedList)
        } catch (error) {
            next(error)
        }
    }

    private routes () {
        this.listRouter.post("/", this.createList)
        this.listRouter.get("/", this.getAllList)
        this.listRouter.patch("/:id", this.updateIsSuccess)
        this.listRouter.delete("/:id", this.deleteList)
    }
}