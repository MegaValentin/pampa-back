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
const router = Router()


router.post('/login', login)
router.post('/logut', logout)
router.get('/profile', profile)
router.get('/verify', verifyToken)
router.post('/adduser', addUser)
router.get('/users', getUsers)
router.get('/user', getUser)
router.delete('/user/:id', deleteUser)


export default router