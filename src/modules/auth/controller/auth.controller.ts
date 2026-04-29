import { Request, Response } from "express";
import { successResponse } from "../../../shared/responses/success";
import { authMessages } from "../constants/auth.message";
import AuthService from "../service/auth.service";
import { MyJwtPayload } from "../../../shared/auth/types/auth.types";
import { userSafe } from "../dto/types/userSafe";

class AuthController {
    constructor(private authService: AuthService) { }

    login = async (req: Request, res: Response) => {
        const result  = await this.authService.login(req.body)

        res.json(
            successResponse(result, authMessages.login.success)
        )
    }

    register = async (req: Request, res: Response) => {
        const payload = req.user as MyJwtPayload

        const result:userSafe = await this.authService.register(req.body, payload)
        res.json(
            successResponse(result, authMessages.register.success)
        )
    }
}
export default AuthController