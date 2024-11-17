import { User } from "../../database/index.js"
import { AppError } from "../utils/appError.js"
import { status } from "../utils/constant/enums.js"
import { messages } from "../utils/constant/messages.js"
import { verifyToken } from "../utils/token.js"

export const authenticate = () => {
    return async (req, res, next) => {

        const { token } = req.headers


        const payload = verifyToken({ token })
        if (payload.message)
            return next(new AppError(messages.user.notAuthorized, 401))

        const user = await User.findOne({ _id: payload._id, status: status.VERIFIED })
        if (!user)
            return next(new AppError(messages.user.notAuthorized, 400))

        req.authUser = user
        next()
    }
}