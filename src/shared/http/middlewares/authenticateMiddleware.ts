import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/AppError";
import { MyJwtPayload } from "../../auth/types/auth.types";
import { authMessages } from "../../../modules/auth/constants/auth.message";
import TokenService from "../../../modules/auth/service/token.service";

const tokenService = new TokenService()

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
        throw new AppError(401, authMessages.token.tokenNotFound)
    }

    try {
        const payload: MyJwtPayload = tokenService.authenticateToken(token)
        req.user = payload
        next()

    } catch (err) {
        throw new AppError(401, authMessages.token.tokenInvalid)
    }
}

export default authenticateMiddleware