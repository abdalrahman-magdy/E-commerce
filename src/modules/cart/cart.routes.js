import { Router } from "express";
import { authenticate } from "../../middleware/authentication.js";
import { authorize } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enums.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addToCart, allCartProducts, deleteFromCart } from "./cart.controllers.js";
import { addToCartVal, deleteFromCartVal } from "./cart.validation.js";

const cartRouter = Router()

cartRouter.route('/')
    .post(
        authenticate(),
        authorize(roles.USER, roles.ADMIN,),
        validate(addToCartVal),
        asyncHandler(addToCart)
    )
    .get(
        authenticate(),
        authorize(roles.USER, roles.ADMIN,),
        asyncHandler(allCartProducts)
    )

cartRouter.delete('/:productId',
    authenticate(),
    authorize(roles.USER, roles.ADMIN),
    validate(deleteFromCartVal),
    asyncHandler(deleteFromCart)
)


export default cartRouter