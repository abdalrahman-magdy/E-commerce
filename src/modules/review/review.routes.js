import { Router } from "express";
import { authenticate } from "../../middleware/authentication.js";
import { authorize } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enums.js";
import { validate } from "../../middleware/validate.js";
import { addReviewVal, getReviewVal, updateReviewVal } from "./review.validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addReview, getSpecificReview, updateReview, getAllReviews,deleteReview } from "./review.controllers.js";

const reviewRouter = Router()

reviewRouter.route('/:product')
    .post(
        authenticate(),
        authorize(roles.USER, roles.ADMIN),
        validate(addReviewVal),
        asyncHandler(addReview)
    )
    .get(asyncHandler(getAllReviews))

reviewRouter.route('/:product/:reviewId')
    .get(
        validate(getReviewVal),
        asyncHandler(getSpecificReview)
    ).delete(
        authenticate(),
        authorize(roles.USER, roles.ADMIN),
        validate(getReviewVal),
        asyncHandler(deleteReview)
    )

reviewRouter.patch('/:reviewId',
    authenticate(),
    authorize(roles.USER, roles.ADMIN),
    validate(updateReviewVal),
    asyncHandler(updateReview)
)


export default reviewRouter