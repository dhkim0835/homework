import mongoose from "mongoose";
import config from "../configs";

mongoose
  .connect(config.MONGO_URL)
  .then(() => console.log(`${config.MONGO_URL} 연결 성공`))
  .catch(() => console.log("몽고 디비 연결 실패 ㅠㅠ"));