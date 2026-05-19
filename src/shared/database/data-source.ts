import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from "dotenv"
import { Company } from "./entities/Company"
dotenv.config()

import { User } from "./entities/User"
import { Laboratory } from "./entities/Laboratory"
import { Operator } from "./entities/Operator"
import { OperatorPosition } from "./entities/OperatorPosition"
import { Swab } from "./entities/Swab"
import { SwabCheck } from "./entities/SwabCheck"
import { Tank } from "./entities/Tank"

//importando migrations
import {CreateCompany1776092268839 } from "./migrations/1776092268839-CreateCompany"
import {CreatedUser1776172843611} from "./migrations/1776172843611-CreatedUser"
import {CreatColumns1776289762426} from "./migrations/1776289762426-CreatColumns"
import { SwabSequence } from "./entities/SwabSequence"


export const AppDataSource = new DataSource({
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Company, User, Laboratory, Operator, OperatorPosition, Swab, SwabCheck, Tank, SwabSequence],
    migrations: [
        CreateCompany1776092268839, //Cria Company
        CreatedUser1776172843611, //Cria usuário e relations com company
        CreatColumns1776289762426 //Migration cria todas outra tabelas do sistema
    ],
    subscribers: [],
})
