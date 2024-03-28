import express, { Application, Request, Response } from "express"
import bodyParser from "body-parser"

import branchRouter from "./routers/branch.router"

const app: Application = express()

const PORT = 5670

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/api/branch", branchRouter)

app.get("/", (req: Request, res: Response) => {
    res.status(200).send({
        message: "success",
        data: []
    })
})

app.listen(PORT, () => {
    console.log("application running on port ", PORT)
})