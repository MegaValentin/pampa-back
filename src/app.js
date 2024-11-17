import  express  from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import { routesPath } from "./routes/index.js"
import cors from 'cors'
import dotenv from 'dotenv'
import cron from "node-cron"
import { deleteOldEvents } from "./controllers/events.controller.js"
dotenv.config()

const app = express()

app.use(cors({
    origin: process.env.REACT_URL_DES,
    credentials:true
}))

cron.schedule("0 0 * * *", () => {
    console.log("Ejecutando limpieza de eventos antiguos...");
    deleteOldEvents();
});

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

routesPath.forEach(({ path, router }) => {
    app.use(path, router);
});

export default app