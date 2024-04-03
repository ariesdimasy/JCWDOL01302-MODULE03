import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { compare, genSalt, hash } from "bcrypt"
import { sign } from "jsonwebtoken"

type User = {
    email: string;
    username: string
    name: string;
    password: string;
    role: string;
}

type UserModel = {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

const prisma = new PrismaClient()

export const register = async (req: Request, res: Response) => {
    try {

        const body: User = req.body

        const salt = await genSalt(10)
        const hashedPassword = await hash(body.password, salt)

        const existingUser = await prisma.user.findFirst({
            where: {
                email: body.email
            }
        })

        if (existingUser) {
            return res.status(400).send({
                message: "email already exists",
            })
        }

        const register = await prisma.user.create({
            data: {
                username: body.username,
                name: body.username,
                email: body.email,
                password: hashedPassword
            }
        })

        return res.send({
            message: "success",
            data: register
        })

    } catch (err) {
        return res.send({
            message: JSON.stringify(err),
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {

        const body: User = req.body

        const user: (UserModel | null) = await prisma.user.findFirst({
            where: {
                email: body.email,
            }
        })

        if (!user) {
            return res.status(404).send({
                message: "invalid email or password ",
            })
        }

        const isValidPassword = await compare(body.password, user.password)

        if (!isValidPassword) {
            return res.status(400).send({
                message: JSON.stringify("bad request"),
            })
        }

        const jwtPayload = { email: user.email, name: user.name, username: user.username, role: user.role }
        const token = sign(jwtPayload, String(process.env.JWT_TOKEN), { expiresIn: "1h" })

        return res.send({
            message: "success",
            data: user,
            token: token
        })


    } catch (err) {
        return res.send({
            message: JSON.stringify(err),
        })
    }
}