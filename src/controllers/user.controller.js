import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";


export const login = async (req, res)  => {
    const { username, password } = req.body

    try {
        const userFound = await User.findOne({username})

        if(!userFound) return res.status(400).json(["User not found"])
        
        const isMatch = await bcrypt.compare(password, userFound.password)

        if(!isMatch)return res.status(400).json(["Incorrect password"])

        const token = await createAccessToken({id: userSaved._id})
        
        res.cookie("token", token)
        res.json({
            id: userFound._id,
            username: userFound.username
        })

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const logout = (req, res) => {
    res.cookie('token', "",{
        expire: new Date(0)
    })
    return res.sendStatus(200)
}

export const addUser = async(req, res) => {
    const { username, password } = req.body

    try {
        const userFound = await User.findOne({username})
        
        if(userFound) return res.status(400).json(['The username id already in use'])

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({username, password:hashedPassword })

        const userSaved = await newUser.save()

        res.status(201).json({
            id: userSaved._id,
            username: userSaved.username
        })
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
}

export const profile = async(req, res) =>{
    const userFound = await User.findById(req.user.id)

    if(!userFound) return res.status(400).json({
        message: "User dont found"
    })

    return res.json({
        id: userFound._id,
        username: userFound.username
    })
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)

    } catch (error) {
        return res.status(500).json({
            message:"error al buscar los usuarios"
        })
    }
}

export const getUser = async(req, res) => {
    try {
        const user = await User.find(req.params.id)
        if(!user) return res.status(400).json({message: "User not found"})
        res.json(user)
    } catch (error) {
        return res.status(500).json({message: "Error al buscar los usuarios"})
    }
}

export const deleteUser = async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        if(!deleteUser) return res.status(404).json({
            message:"Usuario no encontrado"
        })
        res.json({
            message:"Usuario eliminado exitosamente",
            deleteUser
        })
    } catch (error) {
        console.error('Error al eliminar usuario: ', error);
        res.status(500).json({
            message:"Error al eliminar usuario"
        })
    }
}

export const verifyToken = async (req,res) => {
    const {token} = req.cookies

    if(!token) return res.status(401).json({
        message:"Unauthorized"
    })

    jwt.verify(token, async (err, user) => {
        if(err) return res.status(401).json({message: "Unauthorized"})

        const userFound = await User.findById(user.id)
        if(!userFound) return res.status(401).json({
            message: "Unauthorized"
        })

        return res.json({
            id: userFound._id,
            username: userFound.username
        })
    } )
}