import joi from "joi";
import { generalFields } from "../../middleware/validate.js";

export const WishlistVal = joi.object({
    productId:generalFields.objectId
})