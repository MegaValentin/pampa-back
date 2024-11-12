import { Router } from "express";
import { getArticle, 
    getArticles, 
    addArticle, 
    deleteArticle, 
    updatedArticle } from "../controllers/article.controller.js";
import { authRequired } from "../middleware/validator.token.js"

const router = Router()

router.get("/articles", getArticles)

router.get("/article/:id", getArticle)

router.post("/addarticle", authRequired, addArticle)

router.delete("/article/:id", authRequired, deleteArticle)

router.put("/article/:id", authRequired, updatedArticle) 

export default router