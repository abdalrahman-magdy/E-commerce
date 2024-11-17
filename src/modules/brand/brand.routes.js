import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { validate } from "../../middleware/validate.js";
import { cloudUpload } from "../../utils/multer-cloud.js";
import { addBrand, deleteBrand, getAllBrands, getBrand, updateBrand } from "./brand.controllers.js";
import { addBrandVal, updateBrandVal } from "./brand.validation.js";
import { authenticate } from "../../middleware/authentication.js";
import { authorize } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enums.js";

const brandRouter = Router()

brandRouter.route('/')
    .post(
        authenticate(),
        authorize([roles.ADMIN,roles.SELLER]),
        cloudUpload().single("logo"),
        validate(addBrandVal),
        asyncHandler(addBrand)
    )
    .get(
        asyncHandler(getAllBrands)
    )

brandRouter.route('/:id')
    .patch(
        authenticate(),
        authorize([roles.ADMIN,roles.SELLER]),
        cloudUpload().single('logo'),
        validate(updateBrandVal),
        asyncHandler(updateBrand)
    )
    .get(
        asyncHandler(getBrand)
    )
    .delete(
        authenticate(),
        authorize([roles.ADMIN,roles.SELLER]),
        asyncHandler(deleteBrand)
    )

export default brandRouter
