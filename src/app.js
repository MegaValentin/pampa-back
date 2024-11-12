import  express  from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import userRouters from "./routes/user.routes.js"
import articleRouters from "./routes/article.routes.js"
import booksRouters from "./routes/books.routes.js"
import eventRouters from "./routes/events.routes.js"
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors({
    origin: process.env.REACT_URL_DES,
    credentials:true
}))

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', userRouters)
app.use('/api', articleRouters)
app.use('/api', booksRouters)
app.use('/api', eventRouters)

export default app