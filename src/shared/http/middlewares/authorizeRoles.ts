import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/AppError";
import { UserRole } from "../../../modules/user/domain/role.enum";


const roleHierarchy: Record<UserRole, number> = {
    [UserRole.OWNER]: 3,
    [UserRole.ADMIN]: 2,
    [UserRole.LAB]: 1,
};

const authorizeRoles = (...allowedRoles: UserRole[]) => { 
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.user?.role

        if (!userRole) {
            throw new AppError(403, "Acesso negado")
        }

        if(!allowedRoles.includes(userRole)){
            throw new AppError(403, "Sem permição")
        }
        next();
    }
};

export default authorizeRoles