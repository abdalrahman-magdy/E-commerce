import joi from "joi";
import { generalFields } from "../../middleware/validate.js";

export const addCouponVal = joi.object({
    code: generalFields.code.required(),
    discountAmount: generalFields.discountAmount.required(),
    discountType: generalFields.discountTypes.required(),
    fromDate: generalFields.fromDate.required(),
    toDate: generalFields.toDate.required()
})
export const updateCouponVal = joi.object({
    id: generalFields.objectId.required(),
    code: generalFields.code,
    discountAmount: generalFields.discountAmount,
    discountType: generalFields.discountTypes,
    fromDate: generalFields.fromDate,
    toDate: generalFields.toDate
})

export const CouponIdVal = joi.object({
    id: generalFields.objectId.required(),
})