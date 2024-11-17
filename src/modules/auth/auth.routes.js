import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { validate } from "../../middleware/validate.js";
import { login, signup, verifyAccount } from "./auth.controllers.js";
import { loginVal, signupVal } from "./auth.validation.js";

const authRouter = Router()


authRouter.post('/signup',
    validate(signupVal),
    asyncHandler(signup)
)

authRouter.post('/login',
    validate(loginVal),
    asyncHandler(login)
)

authRouter.get('/verify/:token', asyncHandler(verifyAccount))

export default authRouter