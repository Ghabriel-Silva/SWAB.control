import { User } from "../../../../shared/database/entities/User";

export  type userSafe = Pick<User, 'name' | 'email' | 'id'>