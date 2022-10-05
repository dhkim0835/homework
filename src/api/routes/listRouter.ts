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

            res.status(200).json(newList)
        } catch (error) {
            next(error)
        }
    }

    private routes () {
        this.listRouter.post("/", this.createList)
    }
}