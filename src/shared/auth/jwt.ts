import jwt, {SignOptions} from 'jsonwebtoken'
import dotenv from 'dotenv'
import AppError from '../errors/AppError'
import { verify } from 'node:crypto'


dotenv.config()

const SECRET = process.env.JWT_SECRET

if(!SECRET){
     throw new AppError(401, "JWT_SECRET não definido")
}

const jwtDefaultConfig:SignOptions = {
    algorithm:'HS256',
    expiresIn:'2h'
}

export const jwtConfig = jwtDefaultConfig
export const jwtSecret = SECRET

export const jwtProvider = {
    sign:(payloud:Object, options?:SignOptions) =>{
        return jwt.sign(payloud, jwtSecret, options || jwtConfig)
    }, 
    
    verify:(token:string)=>{
        return jwt.verify(token, jwtSecret)
    }
}