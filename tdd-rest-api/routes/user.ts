import { PrismaClient } from "@prisma/client"
import express, { Router, Request, Response } from "express"

const prisma = new PrismaClient()
const router: Router = express.Router()

router.get("/", async function (req: Request, res: Response) {

    try {
        const users = await prisma.user.findMany()
        return res.status(200).send({
            message: "ok",
            users: users
        })
    } catch (err: any) {
        return res.status(200).send({
            message: "ERROR",
            users: JSON.stringify(err)
        })
    }
})

export default router