import { Router } from "express";
import authRoutes from "../../modules/auth/auth.routes"
import userRoutes from "../../modules/user/user.routes";

const routes = Router()

routes.use('/auth', authRoutes) //Rota de autenticação e rotas/métodos
routes.use('/users', userRoutes ) //Rota de metodos para usuários

export default routes