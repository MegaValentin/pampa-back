import jwt  from "jsonwebtoken";
import User from "../models/user.model.js";


export const authRequired = async (req, res, next) => {
    const {token} = req.cookies
    
    if(!token) return res.status(401).json({ message: 'Unauthorized'})

    try {
        const decoded = jwt.verify(token)
        const user = await User.findById(decoded.id)

        if(!user) return res.status(401).json({
            message:"Anauthorized"
        })

        req.user = user
        console.log("User in VerifyToken: ", req.user);
        next()
    } catch (error) {
        return res.status(401).json({ message:"Unauthorized"})
    }
}