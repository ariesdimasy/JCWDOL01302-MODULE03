import { NextFunction, Request, Response } from "express";
import { transporter } from "../helpers/nodemailer";
import prisma from "./../prisma"
import path from "path";
import fs from "fs"
import handlebars from "handlebars";

export default class SampleController {
    async getSampleData(req: Request, res: Response, next: NextFunction) {
        try {
            const sampleData = await prisma.sample.findMany()

            return res.status(200).send({
                message: "success",
                data: sampleData
            })
        } catch (error) {
            next(error)
        }
    }

    async createSampleData(req: Request, res: Response, next: NextFunction) {
        try {

            const { name, code } = req.body

            const newSampleData = await prisma.sample.create({
                data: {
                    name, code
                }
            })

            return res.status(200).send({
                message: "success",
                data: newSampleData
            })
        } catch (error) {
            next(error)
        }

    }

    async addNewImage(req: Request, res: Response, next: NextFunction) {
        try {

            const { file } = req

            if (!file) throw new Error("No File Uploaded")

            return res.status(200).send({
                message: `File ${file?.filename} successfully uploaded`,

            })

        } catch (error) {
            next(error)
        }
    }

    async addNewImages(req: Request, res: Response, next: NextFunction) {
        try {

            const { files } = req

            if (!files?.length) throw new Error("No File Uploaded")

            return res.status(200).send({
                message: `Files successfully uploaded`,

            })

        } catch (error) {
            next(error)
        }
    }

    async sendEmail(req: Request, res: Response, next: NextFunction) {
        try {

            const templatePath = path.join(__dirname, "../templates", "template.hbs")
            const templateSource = await fs.readFileSync(templatePath, "utf-8")
            const compiledTemplate = handlebars.compile(templateSource)
            const html = compiledTemplate({ name: "Aries Dimas" })

            await transporter.sendMail({
                from: "aries@purwadhika.com",
                to: "riwefof134@dacgu.com",
                subject: "Hello riweh",
                html: html
            })

            return res.status(200).send({
                message: `send email success`,

            })

        } catch (error) {
            next(error)
        }
    }
}