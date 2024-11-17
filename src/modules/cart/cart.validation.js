import joi from "joi";
import { generalFields } from "../../middleware/validate.js";

export const addToCartVal = joi.object({
    productId: generalFields.objectId.required(),
    quantity: generalFields.quantity.required()
})
export const deleteFromCartVal = joi.object({
    productId: generalFields.objectId.required(),
})