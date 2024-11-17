import joi from "joi";
import { generalFields } from "../../middleware/validate.js";

export const addReviewVal = joi.object({
    comment: generalFields.description.required(),
    product: generalFields.objectId.required(),
    rate: generalFields.rate.required(),
})
export const updateReviewVal = joi.object({
    reviewId:generalFields.objectId.required(),
    comment: generalFields.description,
    rate: generalFields.rate,
})
export const getReviewVal = joi.object({
    reviewId: generalFields.objectId.required(),
    product: generalFields.objectId.required()
})
