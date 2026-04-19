import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/AppError";
import { MyJwtPayload } from "../../auth/types/auth.types";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../../auth/jwt";
import AuthService from "../../../modules/auth/service/auth.service";
import { authMessages } from "../../../modules/auth/constants/auth.message";


declare global {
    namespace Express {
        interface Request {
            user?: MyJwtPayload
        }
    }
}

const authService = new AuthService()

const authenticateMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    let token: string | undefined

    if (req.cookies?.token) {
        token = req.cookies.token
    } else if (authHeader) {
        token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader
    }

    if (!token) {
        throw new AppError(401, authMessages.login.tokenNotFound)
    }

    try {
        const payloud: MyJwtPayload = authService.authenticateToken(token)
        req.user = payloud

        next()

    } catch (err) {
        throw new AppError(401, authMessages.login.tokenInvalid)
    }
}

export default authenticateMiddleware