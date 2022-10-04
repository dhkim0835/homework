import { app } from "../app"
import config from "../configs/index"


const port = config.port

app.listen(port, () => {
    console.log(`${port} server on`)
})