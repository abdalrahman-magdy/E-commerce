import { Coupon } from "../../../database/index.js"
import { ApiFeature } from "../../utils/apiFeature.js";
import { AppError } from "../../utils/appError.js";
import { discountTypes } from "../../utils/constant/enums.js";
import { messages } from "../../utils/constant/messages.js";

export const addCoupon = async (req, res, next) => {
    let { code, discountAmount, discountType, toDate, fromDate } = req.body
    const authUser = req.authUser

    const couponExists = await Coupon.findOne({ code });
    if (couponExists)
        return next(new AppError(messages.coupon.alreadyExists, 409));

    if (discountType == discountTypes.PERCENTAGE && discountAmount > 100)
        return next(new AppError(messages.coupon.invalid, 409));

    toDate = new Date(toDate)
    fromDate = new Date(fromDate)
    console.log(fromDate, toDate);

    const coupon = new Coupon({
        code,
        discountAmount,
        discountType,
        toDate,
        fromDate,
        createdBy: authUser._id
    })

    const createdCoupon = await coupon.save();

    if (!createdCoupon) {
        return next(new AppError(messages.coupon.failToCreate, 500));
    }

    return res.status(201).json({
        message: messages.coupon.createdSuccessfully,
        success: true,
        data: createdCoupon
    })

}

export const updateCoupon = async (req, res, next) => {
    let { code, discountAmount, discountType, toDate, fromDate } = req.body
    const { id } = req.params
    const authUser = req.authUser

    const couponExists = await Coupon.findById({ _id: id });
    if (!couponExists)
        return next(new AppError(messages.coupon.notFound, 409));

    if (discountType && discountType == discountTypes.PERCENTAGE && discountAmount > 100)
        return next(new AppError(messages.coupon.invalid, 409));

    couponExists.code = code || couponExists.code
    couponExists.discountAmount = discountAmount || couponExists.discountAmount
    couponExists.discountType = discountType || couponExists.discountType
    couponExists.toDate = new Date(toDate) || couponExists.toDate
    couponExists.fromDate = new Date(fromDate) || couponExists.fromDate



    const updatedCoupon = await couponExists.save();

    if (!updatedCoupon) {
        return next(new AppError(messages.coupon.failToCreate, 500));
    }

    return res.status(201).json({
        message: messages.coupon.updatedSuccessfully,
        success: true,
        data: updatedCoupon
    })

}


export const allCoupons = async (req, res, next) => {
    const apiFeature = new ApiFeature(Coupon.find(), req.query).pagination().sort().select().filter()
    const coupons = await apiFeature.mongooseQuery

    if (!coupons)
        return next(new AppError(messages.coupon.notFound, 404))

    return res.status(200).json({
        success: true,
        data: coupons
    })
}




export const getCoupon = async (req, res, next) => {
    const { id } = req.params
    const coupon = await Coupon.findById(id)

    if (!coupon)
        return next(new AppError(messages.coupon.notFound, 404))

    return res.status(200).json({
        success: true,
        data: coupon
    })
}



export const deleteCoupon = async (req,res,next)=>{
    const{id}=req.params
    const coupon = await Coupon.findByIdAndDelete(id)
    if(!coupon)
        return next(new AppError(messages.coupon.notFound, 404))

    return res.status(200).json({
        message:messages.coupon.deletedSuccessfully,
        success: true,
        data: coupon
    })
}