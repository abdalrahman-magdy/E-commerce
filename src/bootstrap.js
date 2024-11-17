import dotenv from "dotenv";
import path from "path";
import { globalErrorHandler } from "../src/middleware/globalErrorHandler.js";
import { authRouter, brandRouter, cartRouter, categoryRouter, couponRouter, orderRouter, productRouter, reviewRouter, subcategoryRouter } from "./modules/index.js";
import wishlistRouter from "./modules/wishlist/wishlist.routes.js";

export const bootstrap = (app, express) => {
    dotenv.config({ path: path.resolve('./config/.env') })


    app.use('/uploads', express.static('uploads'));

    app.use(express.json())



    app.use('/api/auth', authRouter)
    app.use('/api/categories', categoryRouter)
    app.use('/api/subcategories', subcategoryRouter)
    app.use('/api/brands', brandRouter)
    app.use('/api/products', productRouter)
    app.use('/api/wishList', wishlistRouter)
    app.use('/api/coupon', couponRouter)
    app.use('/api/cart', cartRouter)
    app.use('/api/order', orderRouter)
    app.use('/api/review', reviewRouter)




    app.use(globalErrorHandler)

}