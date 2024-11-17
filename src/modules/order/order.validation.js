import joi from "joi";
import { generalFields } from "../../middleware/validate.js";


export const createOrderVal = joi.object({
    phone: generalFields.phone.required(),
    street: generalFields.street.required(),
    paymentMethod: generalFields.paymentMethod,
    coupon: generalFields.code
})

export const getOrdersVal = joi.object({
    productId:generalFields.objectId.required()
})