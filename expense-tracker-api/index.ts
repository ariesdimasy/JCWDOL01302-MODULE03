import express, { Application, Request, Response } from "express"
import bodyParser from "body-parser"

import expenseRoute from "./routers/expenseRoute"

const app: Application = express()

const PORT = 8081

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/expenses", expenseRoute)

app.get("/", (req: Request, res: Response) => {
    res.send({
        message: "expense tracker"
    })
})

app.listen(PORT, () => {
    console.log("application run on port = ", PORT)
})