import joi from "joi"
import { generalFields } from "../../middleware/validate.js"

export const signupVal = joi.object({
    name: generalFields.name.required(),
    email: generalFields.email.required(),
    phone: generalFields.phone.required(),
    password: generalFields.password.required(),
    confirmPassword: generalFields.confirmPassword.required(),
    DOB: generalFields.DOB
})

export const loginVal = joi.object({
    email:generalFields.email,
    phone:generalFields.phone.when('email',{
        is:joi.exist(),
        then:joi.optional(),
        otherwise:joi.required()
    }),
    password:generalFields.password.required()
})