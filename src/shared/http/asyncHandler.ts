import { NextFunction, Request, Response } from "express"

export const asyncHandler = (fn: any) => {
     return (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = fn(req, res, next)

            Promise.resolve(result).catch((err) => {
                next(err)
            })
        } catch (err) {
            next(err)
        }
    }
}