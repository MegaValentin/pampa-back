import app from "./app.js";
import connectDB from "./bd.js";

const port = 3980

connectDB()
app.listen(port, () => {
    console.log(`servidor en el puerto ${port}`)
})