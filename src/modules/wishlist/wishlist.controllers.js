import { Product, User } from "../../../database/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/messages.js"

export const addToWishlist = async (req, res, next) => {
    const { productId } = req.params
    const userId = req.authUser._id;

    const productExists = await Product.findById(productId)

    if (!productExists)
        return next(new AppError(messages.product.notFound, 404))

    const updatedWishlist = await User.findByIdAndUpdate(userId, { $addToSet: { wishList: productId } }, { new: true })

    if (!updatedWishlist)
        return next(new AppError(messages.product.notFound, 404))

    return res.status(200).json({
        message: messages.wishlist.added,
        success: true,
        data: updatedWishlist
    })
}

export const getWishlist = async (req, res, next) => {
    const authUser = req.authUser

    const user = await User.findById(authUser._id, { _id: 1, wishList: 1 })
    console.log(user.wishList);
    const wishlist = []
    
    for (const item of user.wishList) {
        wishlist.push(await Product.findById(item))
    }

    const data = { id: user._id, wishlist }

    console.log(wishlist);
    if (!user || !user.wishList || user.wishList.length === 0) {
        return next(new AppError(messages.wishlist.empty, 404));
    }
    return res.status(200).json({
        success: true,
        data
    })

}


export const deleteWishlist = async (req, res, next) => {
    const authUser = req.authUser
    const { productId } = req.params;

    if (!authUser || !authUser.wishList || authUser.wishList.length === 0) {
        return next(new AppError(messages.wishlist.empty, 404));
    }
    const user = await User.findByIdAndUpdate(authUser._id, { $pull: { wishList: productId } }, { new: true })



    return res.status(200).json({
        message: messages.product.deletedSuccessfully,
        success: true,
    })
}