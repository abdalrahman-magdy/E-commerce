import Router from "express"
import { asyncHandler } from "../../middleware/asyncHandler.js"
import { validate } from "../../middleware/validate.js"
import { cloudUpload } from "../../utils/multer-cloud.js"
import { addSubcategory, allSubcategories, deleteSubcategory, getSubcategory, updateSubcategory } from "./subcategory.controllers.js"
import { addSubCatVal, updateSubCatVal } from "./subcategory.validation.js"
import { authenticate } from "../../middleware/authentication.js"
import { authorize } from "../../middleware/authorization.js"
import { roles } from "../../utils/constant/enums.js"
const subCategoryRouter = Router()

subCategoryRouter
    .route('/')
    .post(
        authenticate(),
        authorize(roles.ADMIN,roles.SELLER),
        cloudUpload().single('image'),
        validate(addSubCatVal),
        asyncHandler(addSubcategory))
    .get(asyncHandler(allSubcategories))


subCategoryRouter
    .route('/:id')
    .get(asyncHandler(getSubcategory))
    .patch(
        authenticate(),
        authorize(roles.ADMIN,roles.SELLER),
        cloudUpload().single('image'),
        validate(updateSubCatVal),
        asyncHandler(updateSubcategory))
    .delete(asyncHandler(deleteSubcategory))

export default subCategoryRouter