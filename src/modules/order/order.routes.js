import { Router } from "express";
import { authenticate } from "../../middleware/authentication.js";
import { authorize } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enums.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { createOrderVal, getOrdersVal } from "./order.validation.js";
import { creatOrder, getAllOrders, myOrders } from "./order.controllers.js";

const orderRouter = Router()

orderRouter.route('/')
    .post(
        authenticate(),
        authorize(roles.USER, roles.ADMIN),
        validate(createOrderVal),
        asyncHandler(creatOrder)
    )
    .get(
        authenticate(),
        asyncHandler(myOrders)
    )
    orderRouter.get('/:productId',
        validate(getOrdersVal),
        asyncHandler(getAllOrders)
    )


export default orderRouter;