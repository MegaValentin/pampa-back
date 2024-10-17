import  express  from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import userRouters from "./routes/user.routes.js"
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', userRouters)



export default app