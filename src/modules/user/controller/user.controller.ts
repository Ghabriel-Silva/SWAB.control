import { NextFunction, Request,Response} from "express"
import CreateUserUseCase from "../useCase/create/create-user.usecase"
import { successResponse } from "../../../shared/responses/success"

class UserController {
    constructor(private userService: CreateUserUseCase) {}

    register = async (req:Request , res:Response, next:NextFunction) => {
        const result = this.userService.register(req.body)
       res.json(
        successResponse(null, 'dados recebidos')
       )
    }
}
export default UserController