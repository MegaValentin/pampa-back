import { Router } from "express"
import { authRequired } from "../middleware/validator.token.js"
import {
    getBooks,
    getBook,
    addBooks,
    deleteBooks,
    updatedBooks
} from "../controllers/books.controller.js"


const router = Router()

router.get("/books", getBooks)

router.get("/book/:id", getBook)

router.post("/addbook", authRequired, addBooks)

router.delete("/books/:id", authRequired, deleteBooks)

router.put("/books/:id", authRequired, updatedBooks)

export default router