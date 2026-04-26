import { NextFunction, Request, Response } from "express"
import { successResponse } from "../../../shared/responses/success"
import { userMessages } from "../constants/user"
import { MyJwtPayload } from "../../../shared/auth/types/auth.types"
import CreateUserUseCase from "../useCase/create"

class UserController {
    constructor(private userService: CreateUserUseCase) { }

    register = async (req: Request, res: Response, next: NextFunction) => {
        const payloud = req.user as MyJwtPayload
        const result = this.userService.register(req.body, payloud)
        res.json(
            successResponse(result, userMessages.create.success)
        )
        
    }
}
export default UserController