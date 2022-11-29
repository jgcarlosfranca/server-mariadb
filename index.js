const express = require("express")
const cors = require('cors')
const routes = require("./routes/routes")
const cookieParser = require("cookie-parser")
const { SERVER_PORT_BACKEND, FRONT_ENDPOINT } = require("./utils/constants")

const app = express()

app.use(cors({
    origin: [FRONT_ENDPOINT],
    method: ["GET", "POST", "PUT", "PATCH"],
    credentials: true
}))

app.use(express.json())


app.use(cookieParser())

app.use("/", routes)

app.listen(SERVER_PORT_BACKEND, () => {
    console.log(`Server UP na porta ${SERVER_PORT_BACKEND}`)
})