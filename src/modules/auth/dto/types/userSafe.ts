import { User } from "../../../../shared/database/entities/User";

type userSafe = Pick<User, 'name' | 'email' | 'id'>