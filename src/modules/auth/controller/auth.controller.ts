import { Request, Response } from "express";
import { successResponse } from "../../../shared/responses/success";
import { authMessages } from "../constants/auth.message";
import AuthService from "../service/auth.service";
import { UserRole } from "../../user/domain/role.enum";

class AuthController {
    constructor(private authService: AuthService) {}
    
    login = async (req: Request, res: Response) => {
        const { email, password } = req.body

        const payload = {
            id: "123",
            email: email || "teste@email.com",
            role: UserRole.ADMIN,
            isActive: true
        }

        const result = this.authService.generateToken(payload)

        res.json(
            successResponse(result, authMessages.login.success)
        )
    }
}
export default AuthController