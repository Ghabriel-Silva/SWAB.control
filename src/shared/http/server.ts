import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import { AppDataSource } from "../database/data-source"
import errorMiddleware from './middlewares/errorMiddleware'
import routes from './routes'

const app = express()


app.use(cors())

app.use(express.json())


app.use(routes)
app.use(errorMiddleware)

AppDataSource.initialize().then(async () => {
    console.log('DataBase start')

    app.listen(process.env.PORT || 8080, () => {
        console.log('Server Started!') 
    })
})

