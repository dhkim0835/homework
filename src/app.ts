import express, { Request, Response } from "express"

import cors from "cors"
import morgan from "morgan"
import mongoose from "mongoose"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import favicon from "serve-favicon"
import path from "path"

import { ListRouter } from "./api"
import { ListService } from "./services/listService"
import { MongoListModel } from "./db/moedels/List"


import { errorMiddleware } from "./api"
import {responseFormatterMiddleware} from "./api"

import config from "./configs"
import { MongoPasswordModel } from "./db/moedels/Password"

export class Server {
    private app
    private listRouter

    constructor() {
        this.app = express()
        this.listRouter = new ListRouter(
            new ListService(
                new MongoListModel(), new MongoPasswordModel()
            )
        )
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
        this.app.use(helmet())

        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 100
        })
        this.app.use(limiter)

        if (process.env.NODE_ENV === 'production') {
        this.app.use(favicon(path.join(__dirname, '../src/public', 'DW.jpg')))
        } else {
        this.app.use(favicon(path.join(__dirname, 'public', 'DW.jpg')))
        }


        this.setRouters()

        this.app.use(responseFormatterMiddleware)
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
            .catch(() => console.log(`${config.MONGO_URL} 연결 실패`));
    }
}