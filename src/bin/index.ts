import { app } from "../app"
import config from "../configs/index"


const port = config.port
import mongoose from "mongoose";

mongoose
  .connect(config.MONGO_URL)
    .then(() => {
        console.log(`${config.MONGO_URL} 연결 성공`)
        app.listen(port, () => {
            console.log(`${port} server on`)
        })
    })
  .catch(() => console.log("몽고 디비 연결 실패 ㅠㅠ"));
