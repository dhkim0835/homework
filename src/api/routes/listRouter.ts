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
        try{
            const { email, description, username, country } = req.body
            const newListInfo: IList = {
                email,
                description,
                username,
                country
            }
            const newList = await this.service.createList(newListInfo)

            res.status(201).json(newList)
        } catch (error) {
            next(error)
        }
    }

    private getAllList = async (req,res,next) => {
        try {
            const lists = await this.service.getAllList()

            res.status(200).json(lists)
        } catch (error) {
            next(error)
        }
    }

    private routes () {
        this.listRouter.post("/", this.createList)
        this.listRouter.get("/", this.getAllList)
    }
}