import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/AppError";
import { MyJwtPayload } from "../../auth/types/auth.types";

declare global {
    namespace Express {
        interface Request {
            user?: MyJwtPayload
        }
    }
}

const authenticateMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token || req.headers.authorization?.replace("Bearer ", "")

    if(!token) {
        throw new AppError(401, 'Token não encontrado')
    }
    try {

    } catch (err) {

    }
}

export default authenticateMiddleware