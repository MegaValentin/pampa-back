import { Router } from "express"
import {
    login,
    addUser,
    logout,
    deleteUser,
    getUser,
    getUsers,
    profile,
    verifyToken
} from "../controllers/user.controller.js"
import { authRequired } from "../middleware/validator.token.js"
import { registerSchemas, loginShema } from "../schemas/auth.schema.js"
import { validateSchema } from "../middleware/validator.middleware.js"
const router = Router()


router.post('/login',validateSchema(loginShema), login)
router.post('/logut', logout)
router.get('/profile', authRequired, profile)
router.get('/verify', verifyToken)
router.post('/adduser', validateSchema(registerSchemas), addUser)
router.get('/users', authRequired, getUsers)
router.get('/user',authRequired, getUser)
router.delete('/user/:id',authRequired, deleteUser)


export default router