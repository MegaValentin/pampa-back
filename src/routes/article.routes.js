import { Router } from "express";
import {
    getArticle,
    getArticles,
    addArticle,
    deleteArticle,
    updatedArticle,
    changeStatus,
    
} from "../controllers/article.controller.js";
import { authRequired } from "../middleware/validator.token.js"
import multer from "multer";

const router = Router()

const upload = multer({ storage: multer.memoryStorage() });

router.get("/articles", getArticles)

router.get("/article/:id", getArticle)

router.post("/addarticle", authRequired, upload.array("images"), addArticle)

router.delete("/article/:id", authRequired, deleteArticle)

router.put("/article/:id", authRequired, updatedArticle)

router.patch("/article/:id/status", authRequired, changeStatus)



export default router