import { Router, Request, Response, NextFunction } from "express"

const router = Router()

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    console.log("handler 1 ")
    next()
}, (req: Request, res: Response, next: NextFunction) => {
    console.log("handler 2 ")
    //res.send({ message: "no auth" })
    next()
}, (req: Request, res: Response) => {
    return res.status(200).send({
        massage: "get data products sucess",
        data: [
            {
                id: 1,
                name: "RTX 3060",
                price: 6000000
            }
        ]
    })
})

// /api/product/123
router.get("/:id", (req: Request, res: Response) => {
    return res.status(200).send({
        massage: "get detail data products sucess",
        data:
        {
            id: 1,
            name: "RTX 3060",
            price: 6000000
        }

    })
})

router.post("/", (req: Request, res: Response) => {
    return res.send({
        massage: "POST data products sucess",
        data: {
            id: 1,
            name: "RTX 3060",
            price: 6000000
        }

    })
})


export default router