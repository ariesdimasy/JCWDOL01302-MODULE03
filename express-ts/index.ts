import express, { Request, Response, NextFunction, Application } from 'express'
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

import productRoute from "./router/productRoute"

const PORT = 8000

const app: Application = express()

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("time : ", Date.now())
    next()
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)
    res.status(500).send("Something error")
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/api/product", (req: Request, res: Response, next: NextFunction) => {
    console.log("route level middleware")
    next()
}, productRoute)

app.get("/", (req: Request, res: Response) => {
    return res.send({
        hello: "world"
    })
})

app.post("/", (req: Request, res: Response) => {

    const { name, age } = req.body

    return res.send({
        name: name,
        age: age
    })
})

app.put("/", (req: Request, res: Response) => {

    const { name, age } = req.body

    return res.send({
        name: name,
        age: age
    })
})

app.delete("/:id", (req: Request, res: Response) => {

    const { id } = req.params

    return res.send({
        massage: "data " + id + " sucessful delete "
    })
})

app.listen(PORT, () => {
    console.log("application run on port = ", PORT)
})