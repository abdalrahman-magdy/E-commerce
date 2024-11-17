import { Router } from "express";
import { authenticate } from "../../middleware/authentication.js";
import { authorize } from "../../middleware/authorization.js";
import { validate } from "../../middleware/validate.js";
import { addCouponVal, CouponIdVal, updateCouponVal } from "../../modules/coupon/coupon.validation.js";
import { roles } from "../../utils/constant/enums.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addCoupon, allCoupons, deleteCoupon, getCoupon, updateCoupon } from "./coupon.controllers.js";

const couponRouter = Router()

couponRouter.route('/')
    .post(
        authenticate(),
        authorize(roles.ADMIN),
        validate(addCouponVal),
        asyncHandler(addCoupon)
    )
    .get(
        asyncHandler(allCoupons)
    )

couponRouter.route('/:id')
    .patch(
        authenticate(),
        authorize(roles.ADMIN),
        validate(updateCouponVal),
        asyncHandler(updateCoupon)
    )
    .get(
        validate(CouponIdVal), 
        asyncHandler(getCoupon)
    )
    .delete(
        authenticate(),
        authorize(roles.ADMIN),
        validate(CouponIdVal),
        asyncHandler(deleteCoupon)
    )


export default couponRouter