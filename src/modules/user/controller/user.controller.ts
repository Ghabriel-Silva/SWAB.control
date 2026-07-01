import { Request, Response } from "express";
import { successResponse } from "../../../shared/responses/success";
import UserService from "../service/user.service";
import { MyJwtPayload } from "../../../shared/auth/types/auth.types";

class UserController {
    constructor(private userService: UserService) { }
    getUser = async (req: Request, res: Response) => {
        const paylod = req.user as MyJwtPayload

        const resp = await this.userService.getUser(paylod?.companyId)
        res.json(
            successResponse(
                resp,
                'Usuários encontrados'
            )
        )
    }
}
export default UserController