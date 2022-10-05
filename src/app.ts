import express, { Request, Response } from "express"

import cors from "cors"
import morgan from "morgan"
import mongoose from "mongoose"


import config from "./configs"

export class Server {
    private app
    constructor() {
        this.app = express()
    }
    setRouters() {
        this.app.get('/', (req:Request, res:Response) => {
            res.send("Hello World!!")
        })
    }

    setMiddlewares() {
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(morgan("dev"))

        this.setRouters()
    }

    initialize(port) {
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