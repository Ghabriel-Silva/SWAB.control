import { Router } from "express";
import authRoutes from "../../modules/auth/auth.routes"
import userRoutes from "../../modules/user/user.routes";
import swabRoutes from "../../modules/swab/swab.routes";

const routes = Router()

routes.use('/auth', authRoutes) //Rota de autenticação e rotas/métodos
routes.use('/users', userRoutes ) //Rota de metodos para usuários
routes.use('/swab', swabRoutes) //Rota responsavel pelos métodos de swab (create, update, delete, read)

export default routes