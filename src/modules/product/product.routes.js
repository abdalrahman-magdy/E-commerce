import { Router } from "express";
import { cloudUpload } from "../../utils/multer-cloud.js";
import { validate } from "../../middleware/validate.js";
import { addProductVal, updateProductVal } from "./product.validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from "./product.controllers.js";
import { authenticate } from "../../middleware/authentication.js";
import { authorize } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enums.js";

const productRouter = Router()


productRouter.route('/')
    .post(
        authenticate(),
        authorize(roles.ADMIN, roles.SELLER),
        cloudUpload()
            .fields(
                [{
                    name: 'mainImage',
                    maxCount: 1
                },
                {
                    name: 'subImages',
                    maxCount: 5
                }]
            ),
        validate(addProductVal),
        asyncHandler(addProduct)
    )
    .get(asyncHandler(getProducts))

productRouter.route('/:id')
    .patch(
        authenticate(),
        authorize(roles.ADMIN, roles.SELLER),
        cloudUpload()
            .fields(
                [{
                    name: 'mainImage',
                    maxCount: 1
                },
                {
                    name: 'subImages',
                    maxCount: 5
                }]
            ),
        validate(updateProductVal),
        asyncHandler(updateProduct)
    )
    .get(asyncHandler(getProduct))
    .delete(
        authenticate(),
        authorize(roles.ADMIN, roles.SELLER),
        asyncHandler(deleteProduct)
    )

export default productRouter