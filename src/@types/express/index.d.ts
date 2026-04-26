import { MyJwtPayload } from "../../shared/auth/types/auth.types";

declare global {
    namespace Express {
        interface Request {
            user?: MyJwtPayload;
        }
    }
}

export { };