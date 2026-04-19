import { NextFunction, Request, Response } from "express"
import AppError from "../../errors/AppError"
import * as yup from "yup"

const validateMiddleware = (schema: any, property: 'body' | 'params' | 'query') => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            req[property] = await schema.validate(req[property], {
                abortEarly: false
            })
            next()
        } catch (err:any) {
            if (err instanceof yup.ValidationError) {
                next(new AppError(400, err.errors.join(",")))
            }
            else {
                next(err)
            }
        }
    }
}
export default validateMiddleware