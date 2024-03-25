import { Router, Request, Response, NextFunction } from "express"
import moment from "moment"

const router = Router()

/*
    handler -> function 
    handler terbagi 2 jenis : 
    1. middleware router endpoint -> punya 3 paramter -> req , res, next 
        didalam handler middleware harus menjalankan next() untuk masuk ke 
        handler berikutnya 
    2. proses bisnis / business logic / last handler / controller 


*/

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    console.log("Middleware endpoint 1")
    const err = false
    if (err) {
        res.send({
            message: "error"
        })
    } else {
        next()
    }

}, (req: Request, res: Response, next: NextFunction) => {
    console.log("Middleware endpoint 2")
    next()
}, (req: Request, res: Response, next: NextFunction) => {
    console.log("Middleware endpoint 3")
    next()
}, (req: Request, res: Response) => {
    const users = ["user 1", "user 2"]
    res.send({
        message: "get users success",
        data: users
    })
})

router.get("/me", (req: Request, res: Response) => {
    res.send({
        name: "Aries Dimas",
        last_check: moment().format('MMMM Do YYYY, h:mm:ss a')
    })

})

export default router