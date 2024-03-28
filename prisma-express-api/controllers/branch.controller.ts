import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const createBranch = async (req: Request, res: Response) => {

    const transactionResult = await prisma.$transaction(async (prisma) => {
        try {

            const branch = await prisma.branch.create({
                data: req.body
            })

            return res.status(201).send({
                status: 201,
                success: true,
                message: "branch created",
                data: branch
            })

        } catch (error) {
            console.log(error)
            return res.status(500).send({
                status: 500,
                success: true,
                message: JSON.stringify(error),

            })
        }
    })

    return transactionResult
}

export const getBranches = async (req: Request, res: Response) => {
    try {

        interface FilterQuery {
            page?: number;
            id?: number;
            name?: string;
        }

        const { id, name, page } = req.query
        const filterData: FilterQuery = {}

        if (id) {
            filterData.id = parseInt(id as string)
        }

        if (page) {
            filterData.page = parseInt(page as string)
        }

        if (name) {
            filterData.name = name as string
        }

        /*
            1 = 0
            2 = 10
            3 = 20
            4 = 30

        */

        const result = await prisma.branch.findMany({
            skip: filterData.page ? (filterData.page * 10) - 10 : 0,
            take: 10,
            include: {
                Manager: true
            },
            where: {
                id: filterData.id,
                name: {
                    contains: filterData.name
                }
            }
        })

        return res.status(200).send({
            page: page,
            status: 200,
            success: true,
            message: "get all branch success",
            data: result
        })

    } catch (error) {
        console.log(error)
    }
}

// api/branch/1
export const getBranchDetail = async (req: Request, res: Response) => {
    try {

        const result = await prisma.branch.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                Class: true,
                Manager: true
            },
        })

        let status = 200
        let message = "get branch detail success"

        if (!result) {
            status = 404
            message = "branch not found "
        }

        return res.status(status).send({
            status: status,
            success: true,
            message: message,
            data: result
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            status: 500,
            success: true,
            message: JSON.stringify(error),

        })

    }
}

export const updateBranch = async (req: Request, res: Response) => {
    try {


        const { id } = req.params

        let result = await prisma.branch.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        let status = 200
        let message = "get branch detail success"

        if (!result) {
            status = 404
            message = "branch not found "
        } else {
            result = await prisma.branch.update({
                where: { id: parseInt(id) },
                data: req.body
            })
        }

        return res.status(status).send({
            status: status,
            success: true,
            message: message,
            data: result
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            status: 500,
            success: true,
            message: JSON.stringify(error),

        })

    }
}

export const deleteBranch = async (req: Request, res: Response) => {
    try {

        const { id } = req.params

        const result = await prisma.branch.delete({
            where: { id: parseInt(id) },
        })

        return res.status(200).send({
            status: 200,
            success: true,
            message: "delete success",
            data: result
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            status: 500,
            success: true,
            message: JSON.stringify(error),

        })

    }
}

export const getBranchStats = async (req: Request, res: Response) => {
    try {

        const branchStats = await prisma.branch.aggregate({
            _count: {
                _all: true
            },
            _min: {
                createdAt: true
            },
            _max: {
                createdAt: true
            }
        })

        console.log("Total Branches created : ", branchStats._count._all)
        console.log("Earliest creation time : ", branchStats._min.createdAt)
        console.log("Latest creation time : ", branchStats._max.createdAt)

        return res.status(200).send({
            status: 200,
            success: true,
            data: branchStats
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            status: 500,
            success: true,
            message: JSON.stringify(error),

        })
    }
}

