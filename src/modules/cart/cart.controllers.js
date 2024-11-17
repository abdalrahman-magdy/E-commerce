import { Product,Cart } from "../../../database/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/messages.js"

export const addToCart = async (req, res, next) => {
    const { productId, quantity } = req.body
    const authUser = req.authUser

    const productExists = await Product.findById(productId)
    if (!productExists)
        return next(new AppError(messages.product.notFound, 404))

    if (!productExists.inStock(quantity))
        return next(new AppError(messages.product.outOfStock, 409))

    const existsInCart = await Cart.findOneAndUpdate({
        user: authUser._id,
        "products.productId": productId
    }, {
        $set: {
            "products.$.quantity": quantity
        }
    }, {
        new: true
    })
    let data = existsInCart
    if (!existsInCart) {
        const addedProduct = await Cart.findOneAndUpdate({ user: authUser._id },
            {
                $push: { products: { productId, quantity } }
            },
            { new: true }
        )

        data = addedProduct
    }

    if (!data)
        return next(new AppError(messages.product.failToUpdate, 404))


    return res.status(200).json({
        message: messages.product.addedToCart,
        success: true,
        data: data.products
    })
}

export const allCartProducts = async (req, res, next) => {
    const user = req.authUser._id;
    const cart = await Cart.findOne({ user }).populate('products.productId', 'name price');
    return res.status(200).json({
        success: true,
        data: cart
    })
}


export const deleteFromCart = async (req, res, next) => {
    const { productId } = req.params
    const user = req.authUser._id
    const productinCartExist = await Cart.findOne({ user, "products.productId": productId })
    if (!productinCartExist) {
        return next(new AppError(messages.product.notExistInCart, 404));
    }

    const updatedCart = await Cart.findOneAndUpdate(
        { user },
        { $pull: { products: { productId } } },
        { new: true }
    );

    return res.status(200).json({
        message: messages.product.deletedFromCart,
        success: true,
        data: updatedCart
    })

}