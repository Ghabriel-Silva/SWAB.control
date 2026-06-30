import { Request, Response } from "express";
import { successResponse } from "../../../shared/responses/success";
import UserService from "../service/user.service";

class UserController {
    constructor(private userService: UserService) { }
    getUser = (req: Request, res: Response) => {

        res.json(
            successResponse(
                null,
                'Usuario  aqui '
            )
        )
    }
}
export default UserController