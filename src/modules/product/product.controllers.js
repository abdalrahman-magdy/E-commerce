import slugify from "slugify"
import { Brand, Product, Subcategory } from "../../../database/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/messages.js"
import cloudinary, { deleteCloudImage } from "../../utils/cloud.js"
import { ApiFeature } from "../../utils/apiFeature.js"

export const addProduct = async (req, res, next) => {
    const {
        name,
        description,
        stock,
        price,
        discount,
        discountType,
        colors,
        sizes,
        category,
        subcategory,
        brand,
    } = req.body

    const brandExists = await Brand.findById(brand)

    if (!brandExists)
        return next(new AppError(messages.brand.notFound, 404))


    const subcategoryExists = await Subcategory.findById(subcategory)

    if (!subcategoryExists)
        return next(new AppError(messages.subcategory.notFound, 404))

    const slug = slugify(name)

    const { secure_url, public_id } = await cloudinary.uploader.upload(req.files.mainImage[0].path, {
        folder: `E-commerce/products/mainImage`
    })
    req.failImages = []
    const mainImage = { secure_url, public_id }
    req.failImages.push(public_id)


    let subImages = []
    for (const file of req.files.subImages) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
            folder: `E-commerce/products/subImages`
        })
        subImages.push({ secure_url, public_id })
        req.failImages.push(public_id)
    }

    const product = new Product({
        name,
        slug,
        description,
        stock,
        price,
        discount,
        discountType,
        colors: JSON.parse(colors),
        sizes: JSON.parse(sizes),
        category,
        subcategory,
        brand,
        mainImage,
        subImages,
        createdBy: req.authUser._id,
        updatedBy: req.authUser._id
    })


    const createdProduct = await product.save()

    if (!createdProduct) {
        return next(new AppError(messages.product.failToCreate, 500))
    }

    return res.status(201).json({ message: messages.product.createdSuccessfully, success: true, data: createdProduct })
}

export const getProducts = async (req, res, next) => {

    const apiFeature = new ApiFeature(Product.find(), req.query)
        .pagination()
        .sort()
        .select()
        .filter()

    const products = await apiFeature.mongooseQuery

    res.status(200).json({ success: true, data: products })
}


export const getProduct = async (req, res, next) => {
    const { id } = req.params

    const product = await Product.findById({ _id: id })

    if (!product)
        return next(new AppError(messages.product.notFound, 404))

    return res.status(200).json({ success: true, data: product })
}



export const updateProduct = async (req, res, next) => {
    let {
        name,
        description,
        stock,
        price,
        discount,
        discountType,
        colors,
        sizes,
        category,
        subcategory,
        brand,
    } = req.body
    const { id } = req.params

    const product = await Product.findOne({ _id: id, createdBy: req.authUser._id })
    if (!product)
        return next(new AppError(messages.product.notFound, 404))

    const oldFile = product.mainImage.public_id

    req.failImages = []
    let mainImage = product.mainImage
    if (req.files.mainImage) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.files.mainImage[0].path, {
            public_id: oldFile,
            invalidate: "true"
        })
        mainImage = { secure_url, public_id }
        req.failImages.push(public_id)
    }

    let subImages = product.subImages

    if (req.files.subImages) {
        for (const file of req.files.subImages) {
            const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
                folder: `E-commerce/products/subImages`
            })
            subImages.push({ secure_url, public_id })
            req.failImages.push(public_id)
        }
    }
    if (name)
        product.slug = slugify(name)
    product.name = name || product.name
    product.description = description || product.description
    product.stock = stock || product.stock
    product.price = price || product.price
    product.discount = discount || product.discount
    product.discountType = discountType || product.discountType
    product.colors = JSON.parse(colors) || product.colors
    product.sizes = JSON.parse(sizes) || product.sizes
    product.category = category || product.category
    product.subcategory = subcategory || product.subcategory
    product.brand = brand || product.brand
    product.updatedBy = req.authUser._id
    product.mainImage = mainImage
    product.subImages = [...subImages]

    const updatedProduct = await product.save()

    return res.status(200).json({ message: messages.product.updatedSuccessfully, success: true, data: updatedProduct })
}


export const deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    const authUser = req.authUser;

    const product = await Product.findOneAndDelete({ _id: id, createdBy: authUser._id });

    if (!product) {
        return next(new AppError(messages.product.notFound, 404));
    }

    await deleteCloudImage(product.mainImage.public_id);

    for (const subImage of product.subImages) {
        await deleteCloudImage(subImage.public_id);
    }

    return res.status(200).json({ message: messages.product.deletedSuccessfully, success: true, data: product });
};