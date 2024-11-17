import { AppError } from "../utils/appError.js"
import joi from "joi";
import { discountTypes, paymentMethods } from "../utils/constant/enums.js";

const parseArray = (value, helper) => {
    let data = JSON.parse(value)
    const schema = joi.array().items(joi.string())
    const { error } = schema.validate(data)
    if (error)
        return helper(error.details)
    return true
}

export const generalFields = {
    name: joi.string().trim().min(2).messages({
        'string.base': 'Name should be a string',
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name should have at least 2 characters'
    }),
    email: joi.string().trim(),

    phone: joi.string().trim().pattern(new RegExp(/^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/)),

    password: joi.string().trim().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)),

    confirmPassword: joi.string().valid(joi.ref('password')),

    DOB: joi.date().less(Date.now() - 8 * 365 * 24 * 60 * 60 * 1000).messages({'date.base':'Date should be in a "yyyy-mm-dd" format'}),

    objectId: joi.string().trim().min(24).hex().messages({
        'string.min': 'ID should have at least 24 digits'
    }),

    description: joi.string().min(1).max(400),

    stock: joi.number().positive(),

    price: joi.number().positive(),

    discount: joi.number(),

    discountTypes: joi.string().valid(...Object.values(discountTypes)),

    discountAmount: joi.number().positive(),

    colors: joi.custom(parseArray),

    sizes: joi.custom(parseArray),

    rate: joi.number().min(1).max(5),

    code: joi.string().max(6),

    fromDate: joi.date().greater(Date.now() - 24 * 60 * 60 * 1000).messages({'date.base':'Date should be in a "yyyy-mm-dd" format'}),

    toDate: joi.date().greater(joi.ref('fromDate')).messages({'date.base':'Date should be in a "yyyy-mm-dd" format'}),

    quantity:joi.number().positive(),

    street: joi.string(),

    paymentMethod: joi.string().valid(...Object.values(paymentMethods))
}
export const validate = (schema) => {
    return async (req, res, next) => {
        let { error } = schema
            .validate({
                ...req.body,
                ...req.params,
                ...req.query
            }, { abortEarly: false })
        if (error) {

            let errMessages = error.details.map(err => err.message)
            return next(new AppError(errMessages, 401))
        }
        next()
    }
}