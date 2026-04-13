import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import { AppDataSource } from "../database/data-source"

const app = express()


app.use(cors())

app.use(express.json())


AppDataSource.initialize().then(async () => {
    console.log('DataBase start')


    app.listen(process.env.PORT || 3000, () => {
        console.log('Server Started!') 
    })
})

