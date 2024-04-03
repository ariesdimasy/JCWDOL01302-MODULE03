import express, { Application, Response, Request } from "express";
import bodyParser from "express"
import cors from "cors"
import dotenv from "dotenv"

import authRouter from "./router/auth.router"
import userRouter from "./router/user.router"
import postRouter from "./router/post.router"

dotenv.config()

const app: Application = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/posts", postRouter)

const PORT = 6570

app.get("/", (req: Request, res: Response) => {
    res.send({
        message: "REST API sosmed"
    })
})

app.listen(PORT, () => {
    console.log("application run on port : ", PORT)
})