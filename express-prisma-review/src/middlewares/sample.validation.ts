import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator"

export const validateSampleData = [
    body("name").notEmpty().withMessage("Name is Required"),
    body("code").notEmpty().withMessage("code is required").isLength({ max: 3 }).withMessage("code length max 3 chars"),
    //body("code").isLength({ max: 3 }).withMessage("code length max 3 chars"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() })
        }
        next()
    }
]