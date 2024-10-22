import { Router } from "express";
import { getArticle, 
    getArticles, 
    addArticle, 
    deleteArticle, 
    updatedArticle } from "../controllers/article.controller";

const router = Router()

router.get("/articles", getArticles)

router.get("/article/:id", getArticle)

router.post("/addarticle", addArticle)

router.delete("/article/:id", deleteArticle)

router.put("/article/:id", updatedArticle) 

export default router