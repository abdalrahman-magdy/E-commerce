import { Order, Product } from "../../../database/index.js"
import { Review } from "../../../database/models/review.model.js"
import { AppError } from "../../utils/appError.js"
import { status } from "../../utils/constant/enums.js"
import { messages } from "../../utils/constant/messages.js"

export const addReview = async (req, res, next) => {
    const { comment, rate } = req.body
    const { product } = req.params
    const authUser = req.authUser

    const productExist = await Product.findById(product)
    if (!productExist)
        return next(new AppError(messages.product.notFound, 404))

    const orderExist = await Order.findOne({ user: authUser._id, "products.productId": product })

    const reviewExist = await Review.findOneAndUpdate({ user: authUser._id, product }, { rate, comment }, { new: true })
    let data = reviewExist
    if (!reviewExist) {

        const review = new Review({
            comment,
            rate,
            user: authUser._id,
            product,
            isVerified: orderExist ? true : false
        })
        const createdReview = await review.save()
        if (!createdReview) {
            return next(new AppError(messages.review.failToCreate, 500))
        }
        data = createdReview
    }
    const reviews = await Review.find({ product })
    let rateSum = reviews.reduce((acc, review) => acc + review.rate, 0)
    rateSum /= reviews.length
    await Product.findByIdAndUpdate(product, { rate: rateSum })

    return res.status(201).json({ message: messages.review.createdSuccessfully, success: true, data })
}

export const updateReview = async (req, res, next) => {
    const { comment, rate } = req.body
    const { reviewId } = req.params
    const authUser = req.authUser

    const reviewExist = await Review.findOne({ user: authUser._id, _id: reviewId })
    if (!reviewExist)
        return next(new AppError(messages.review.notFound, 404))

    reviewExist.comment = comment ? comment : reviewExist.comment
    reviewExist.rate = rate ? rate : reviewExist.rate

    const updatedReview = await reviewExist.save()
    if (!updatedReview)
        return next(new AppError(messages.review.failToUpdate, 500))

    return res.status(201).json({ message: messages.review.updatedSuccessfully, success: true, data: updatedReview })

}


export const getAllReviews = async (req, res, next) => {
    const { product } = req.params

    const reviews = await Review.find({ product });
    if (!reviews) {
        return next(new AppError(messages.product.notFound, 404))
    }

    res.status(200).json({
        success: true,
        data: reviews
    });
}


export const getSpecificReview = async (req, res, next) => {
    const { reviewId, product } = req.params

    const reviewExist = await Review.findOne({ _id: reviewId, product });
    if (!reviewExist) {
        return next(new AppError(messages.review.notFound, 404))
    }


    return res.status(200).json({
        success: true,
        data: reviewExist
    });
}

export const deleteReview = async (req, res, next) => {
    const { reviewId, product } = req.params

    const reviewExist = await Review.findOneAndDelete({ _id: reviewId, product });
    if (!reviewExist) {
        return next(new AppError(messages.review.notFound, 404))
    }


    return res.status(200).json({
        success: true,
        data: reviewExist
    });
}