import { JwtPayload } from "jsonwebtoken";
import { UserRole } from "../../../modules/user/domain/role.enum";

export interface MyJwtPayload extends JwtPayload {
    id: string;
    email: string;
    role: UserRole;
    isActive: boolean;
    companyId:string;
}