import { Repository } from "typeorm"
import { User } from "../../../shared/database/entities/User"
import { AppDataSource } from "../../../shared/database/data-source"
import { CreateUserType } from "../dto/schemas/create-user.schema"
import { UserRole } from "../../user/domain/role.enum"
import { MyJwtPayload } from "../../../shared/auth/types/auth.types"
import { Company } from "../../../shared/database/entities/Company"
import { userSafe } from "../dto/types/userSafe"


class AuthRepository {
    private userRepository: Repository<User>
    private companyRepository:Repository<Company>
    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
        this.companyRepository = AppDataSource.getRepository(Company)
    }

    login = async (email: string): Promise<User | null> => {
        return await this.userRepository.findOne(
            {
                where: { email },
                relations: ['company']
            }
        )
    }

    register = async (data: CreateUserType, payload: MyJwtPayload): Promise<userSafe> => {
        const company = await this.companyRepository.findOneBy({
            id: payload.companyId
        })

        if (!company) {
            throw new Error("Company não encontrada")
        }

        const userData = this.userRepository.create({
            email: data.email,
            name: data.name,
            password: data.password,
            role: UserRole[data.role],
            company 
        })
        
      const safeUser = await this.userRepository.save(userData)

      return {
         email:safeUser.email, 
         id:safeUser.id, 
         name:safeUser.name
      } as userSafe
       
    }

    emailExist = async (email: string): Promise<boolean> => {
        const existe = await this.userRepository.findOne({
            where: {
                email,
            }
        })
        return existe ? true : false
    }
}

export default AuthRepository