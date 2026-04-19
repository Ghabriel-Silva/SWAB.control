import { jwtProvider } from "../../../shared/auth/jwt";
import { MyJwtPayload } from "../../../shared/auth/types/auth.types";
import AppError from "../../../shared/errors/AppError";
import { authMessages } from "../constants/auth.message";


class AuthService {
    
    public generateToken(payloud: MyJwtPayload) {
        return jwtProvider.sign(payloud)
    }

    public authenticateToken(token: string):MyJwtPayload {
        if (!token) {
            throw new AppError(401, authMessages.login.tokenNotFound)
        }
        try {
            return jwtProvider.verify(token) as MyJwtPayload
        } catch (err) {
            throw new AppError(401, "Token inválido ou expirado")
        }
    }
}

export default AuthService