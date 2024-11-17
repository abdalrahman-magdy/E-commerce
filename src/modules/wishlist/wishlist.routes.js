import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addToWishlist, deleteWishlist, getWishlist } from "./wishlist.controllers.js";
import { validate } from "../../middleware/validate.js";
import { WishlistVal } from "./wishlist.validation.js";
import { authenticate } from "../../middleware/authentication.js";
import { authorize } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enums.js";

const wishlistRouter = Router()

wishlistRouter.route('/:productId')
    .post(
        authenticate(),
        authorize(roles.USER, roles.ADMIN),
        validate(WishlistVal),
        asyncHandler(addToWishlist)
    )
    .put(
        authenticate(),
        authorize(roles.USER, roles.ADMIN), 
        validate(WishlistVal), 
        asyncHandler(deleteWishlist)
    )


wishlistRouter.get('/',
    authenticate(),
    authorize(roles.USER, roles.ADMIN),
    asyncHandler(getWishlist)
)


export default wishlistRouter