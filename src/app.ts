import express, { Request, Response } from "express"

import cors from "cors"
import morgan from "morgan"
import mongoose from "mongoose"

import { ListRouter } from "./api"
import { ListService } from "./services/listService"
import { MongoListModel } from "./db/moedels/List"

import { errorMiddleware } from "./api"

import config from "./configs"

export class Server {
    private app
    private listRouter

    constructor() {
        this.app = express()
        this.listRouter = new ListRouter(new ListService(new MongoListModel))
    }

    setRouters() {
        this.app.get('/', (req:Request, res:Response) => {
            res.send("Hello World!!")
        })

        this.app.use("/list", this.listRouter.listRouter)
    }

    setMiddlewares() {
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(morgan("dev"))

        this.setRouters()
        this.app.use(errorMiddleware)
    }

    initialize(port) {
        this.setMiddlewares()
        mongoose
            .connect(config.MONGO_URL)
            .then(() => {
                console.log(`${config.MONGO_URL} 연결 성공`)
                this.app.listen(port, () => {
                    console.log(`${port} server on`)
                })
            })
            .catch(() => console.log("몽고 디비 연결 실패 ㅠㅠ"));
    }
}