import { Router, Request, Response } from "express";
import axios from "axios"
import fs from "fs"

const router = Router()

router.get("/", async (req: Request, res: Response) => {

    const { _start, _end, category, date_gte, date_lte } = req.query

    const result = await axios.get("http://localhost:4440/expenses", {
        params: {
            category: category,
            date_gte: date_gte,
            date_lte: date_lte,
            _start: _start,
            _end: _end
        }
    })

    let total = 0
    result.data.forEach((element: any) => {
        total += element.nominal
    });

    res.send({
        message: "success",
        data: result.data,
        total: total
    })

})

router.get("/fs", (req: Request, res: Response) => {

    const readF = fs.readFileSync("./db.json", "utf-8")
    const result = JSON.parse(readF)
    res.send({
        data: result.expenses
    })

})

router.post("/", async (req: Request, res: Response) => {

    const { name, nominal, category, date } = req.body

    const result = await axios.post("http://localhost:4440/expenses", {
        name, nominal, category, date
    })

    res.status(201).send({
        message: "success",
        data: result.data
    })

})

router.post("/fs", (req: Request, res: Response) => {

    const { name, nominal, category, date } = req.body

    const readF = fs.readFileSync("./db.json", "utf-8")
    const expensesJSON = JSON.parse(readF)?.expenses

    const newData = {
        name: name, nominal: nominal, category: category, date, id: expensesJSON[expensesJSON.length - 1].id + 1
    }

    expensesJSON.push(newData)

    fs.writeFileSync("./db.json", JSON.stringify({ expenses: expensesJSON }))

    res.status(201).send({
        message: "created",
        data: newData
    })

})

export default router