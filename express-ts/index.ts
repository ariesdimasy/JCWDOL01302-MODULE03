import express, { Request, Response, NextFunction, Application } from 'express'
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

import db from "./config/database"

import productRoute from "./router/productRoute"
import userRoute from "./router/userRoute"
import { QueryError } from 'mysql2'

const PORT = 8000

const app: Application = express()

// ============ middleware global =====================
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
// ============ middleware global =====================

// ============= router =========================
app.use("/api/products", (req: Request, res: Response, next: NextFunction) => {
    console.log("middleware LEVEL ROUTER")
    next()
}, productRoute)

app.use("/api/users", (req: Request, res: Response, next: NextFunction) => {
    console.log("middleware LEVEL USER ROUTER 1")
    next()
}, (req: Request, res: Response, next: NextFunction) => {
    console.log("middleware LEVEL USER ROUTER 2")
    next()
}, userRoute)
// ============= router ==========================

app.get("/", (req: Request, res: Response) => {
    interface IStudent {
        id: number
        name: string
        marks: number
        class: string
    }

    db.query("select * from students", (err: QueryError, result: IStudent[]) => {
        if (err) {
            return res.status(500).send(err)
        }

        return res.status(200).send({
            message: "success",
            data: result
        })
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

db.getConnection((err, connection) => {
    if (err) {
        return console.log(err)
    }
    console.log("Success Connection", connection.threadId)
})

app.listen(PORT, () => {
    console.log("application run on port = ", PORT)
})