import bcrypt from "bcrypt"
import { User } from "../../../database/index.js"
import { AppError } from "../../utils/appError.js"
import { status } from "../../utils/constant/enums.js"
import { messages } from "../../utils/constant/messages.js"
import { sendMail } from "../../utils/sendEmail.js"
import { generateToken, verifyToken } from "../../utils/token.js"
import { Cart } from "../../../database/models/cart.model.js"
export const signup = async (req, res, next) => {
    let { name, email, password, DOB, phone } = req.body

    const userExists = await User.findOne({ $or: [{ email }, { phone }] })
    if (userExists)
        return next(new AppError(messages.user.alreadyExists, 409))

    DOB = new Date(DOB)

    password = bcrypt.hashSync(password, 8)

    let user = new User({
        name,
        email,
        password,
        phone,
        DOB
    }
    )

    const createdUser = await user.save()
    const token = generateToken({ payload: { _id: createdUser._id, email } })

    await sendMail({ to: email, subject: `click the link to verify your account`, html: `<p><a href="${req.protocol}://${req.headers.host}/api/auth/verify/${token}">link</p>` })

    res.status(201).json({ message: messages.user.createdSuccessfully, success: true, data: createdUser })

}


export const verifyAccount = async (req, res, next) => {
    const { token } = req.params

    const payload = verifyToken({ token })

    const verifiedUser = await User.findOneAndUpdate({ email: payload.email, status: status.PENDING }, { status: status.VERIFIED }, { new: true })

    if (!verifiedUser)
        return next(new AppError(messages.user.notFound, 404))

    await Cart.create({ user: payload._id, products: [] })

    res.status(200).json({ message: messages.user.verifiedSuccessfully, success: true, data: verifiedUser })
}



export const login = async (req, res, next) => {
    const { email, phone, password } = req.body

    const user = await User.findOne({ $or: [{ email }, { phone }], status: status.VERIFIED })
    if (!user)
        return next(new AppError(messages.user.invalidCredentials, 400))

    if (!bcrypt.compareSync(password, user.password))
        return next(new AppError(messages.user.invalidCredentials, 400))

    const token = generateToken({ payload: { _id: user._id, email } })

    res.status(200).json({ message: messages.user.loggedinSuccessfully, success: true, data: token })
}