require('dotenv').config({
    path: process.env.NODE_ENV === "teste" ? ".env.testing" : ".env"
})
const express = require("express")
const cors = require('cors')
const routes = require("./routes/routes")
const cookieParser = require("cookie-parser")
const { FRONT_ENDPOINT } = require("./utils/constants")

const app = express()

app.use(cors({
    origin: [FRONT_ENDPOINT],
    method: ["GET", "POST", "PUT", "PATCH"],
    credentials: true
}))

app.use(express.json())


app.use(cookieParser())

app.use("/", routes)

app.listen(process.env.PORT, () => {
    console.log(`Server UP na porta ${process.env.PORT}`)
})


/**
 * 
require('dotenv').config({  
  path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
})
 */