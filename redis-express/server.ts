import express, { Application, Request, Response } from "express"
import { PostController } from "./controllers/PostController"
import { logErrorHandler } from "./helpers/logging"

const post = new PostController()

const app: Application = express()

app.get("/post", post.getPosts)
app.get("/error", (req: Request, res: Response) => {
    const error = true
    try {
        if (error) {
            throw new Error("Error happened")
        }
    } catch (err: any) {
        console.log(err)
        logErrorHandler(err)
        return res.send({
            error: err
        })
    }
})

app.listen(4567, () => {
    console.log(" application running on port = ", 4567)
})