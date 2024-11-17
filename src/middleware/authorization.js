import { AppError } from "../utils/appError.js"
import { messages } from "../utils/constant/messages.js"

export const authorize = (...roles)=>{
    return (req,res,next)=>{
        
        const authUser = req.authUser

        if(!roles.includes(authUser.role))
            return next(new AppError(messages.user.notAuthorized,401))

        next()
    }
}