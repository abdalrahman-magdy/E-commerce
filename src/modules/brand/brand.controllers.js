import slugify from "slugify"
import { Brand } from "../../../database/index.js"
import { messages } from "../../utils/constant/messages.js"
import cloudinary from "../../utils/cloud.js"
import { AppError } from "../../utils/appError.js"

export const addBrand = async (req, res, next) => {
    let { name } = req.body

    name = name.toLowerCase()

    const exists = await Brand.findOne({ name })
    

    if (exists)
        return next(new AppError(messages.brand.alreadyExists, 409))

    
    
    
    let brand = new Brand()
    
    
    const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path,
        {
            folder: `E-commerce/brands`
        }
    )
    req.failImage = { secure_url, public_id }
    
    
    brand.name=name
    
    const slug = slugify(name)
    brand.slug = slug
    

    brand.logo = { secure_url, public_id }

    brand.createdBy = req.authUser._id

    const createdBrand = await brand.save()



    if (!createdBrand) {
        return next(new AppError(messages.brand.failToCreate, 500))
    }

    return res.status(201).json({
        message: messages.brand.createdSuccessfully,
        success: true,
        data: createdBrand
    })

}



export const updateBrand = async (req, res, next) => {
    const { id } = req.params

    let { name } = req.body


    name = name.toLowerCase()


    const brandExists = await Brand.findById(id)
    if (!brandExists) {
        return next(new AppError(messages.brand.notFound, 404))
    }

    const nameExists = await Brand.findOne({ name, _id: { $ne: id } })
    if (nameExists)
        return next(new AppError(messages.brand.alreadyExists, 400))

    if (name) {
        brandExists.name = name
        const slug = slugify(name)
        brandExists.slug = slug
    }
    const oldFile = brandExists.logo.public_id

    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(
            req.file.path,
            {
                public_id: oldFile,
                invalidate: "true"
            }
        )
        brandExists.logo = { secure_url, public_id }
        req.body.failImage = { secure_url, public_id }
    }



    const updatedBrand = await brandExists.save()
    if (!updatedBrand) {
        return next(new AppError(messages.brand.notFound), 404)
    }
    return res.status(200).json({ message: messages.brand.updatedSuccessfully, success: true, data: updatedBrand })
}




export const getAllBrands = async (req, res, next) => {
    const brands = await Brand.find()
    res.status(200).json({ success: true, data: brands })
}


export const getBrand = async (req, res, next) => {
    const brand = await Brand.findById(req.params.id)

    if (brand) {
        return next(new AppError(messages.brand.notFound), 404)
    }

    return res.status(200)
        .json({
            success: true,
            data: brand
        })
}


export const deleteBrand = async (req, res, next) => {
    const brand = await Brand.findByIdAndDelete(req.params.id)

    await cloudinary.uploader.destroy(brand.logo.public_id)
    if (!brand)
        return next(new AppError(messages.brand.notFound, 404))

    return res.status(200)
        .json({
            message: messages.brand.deletedSuccessfully,
            success: true,
            data: brand
        })

}