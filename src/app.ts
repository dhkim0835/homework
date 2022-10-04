import express, { Request, Response } from "express"

import config from "./configs/index"

const app = express()

app.get('/', (req:Request, res:Response) => {
    res.send("Hello World!!")
})

export { app }