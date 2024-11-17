import Router from "express"
import { addCategory, allCategories, deleteCategory, getCategory, updateCategory } from "./category.controllers.js"
import { fileUpload } from "../../utils/multer.js"
import { validate } from "../../middleware/validate.js"
import { addCat, updateCat } from "./category.validation.js"
import { asyncHandler } from "../../middleware/asyncHandler.js"
import { cloudUpload } from "../../utils/multer-cloud.js"
import { authenticate } from "../../middleware/authentication.js"
import { authorize } from "../../middleware/authorization.js"
import { roles } from "../../utils/constant/enums.js"
const categoryRouter = Router()


categoryRouter
    .route('/')
    .post(
        authenticate(),
        authorize(roles.ADMIN),
        cloudUpload().single('image'),
        validate(addCat),
        asyncHandler(addCategory))
    .get(asyncHandler(allCategories))
    

categoryRouter
    .route('/:id')
    .get(asyncHandler(getCategory))
    .patch(
        authenticate(),
        authorize(roles.ADMIN,roles.SELLER),
        fileUpload('categories').single('categoryImage'),
        validate(updateCat),
        asyncHandler(updateCategory))
    .delete(asyncHandler(deleteCategory))



export default categoryRouter