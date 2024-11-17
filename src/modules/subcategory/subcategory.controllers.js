import slugify from "slugify"
import { Category, Subcategory } from "../../../database/index.js"
import { AppError } from "../../utils/AppError.js"
import cloudinary from "../../utils/cloud.js"
import { messages } from "../../utils/constant/messages.js"


export const addSubcategory = async (req, res, next) => {

    let { name, category } = req.body

    const categoryExists = await Category.findById(category)
    if (!categoryExists)
        return next(new AppError(messages.category.notFound, 404))

    name = name.toLowerCase()

    const slug = slugify(name)

    req.body.slug = slug

    const checkName = await Subcategory.findOne({ name })
    if (checkName) {

        return next(new AppError(messages.subcategory.alreadyExists, 409))
    }
    let subcategory = new Subcategory()

    const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path,
        {
            folder: `E-commerce/subcategories`
        }
    )
    const image = { secure_url, public_id }
    subcategory.name = name
    subcategory.slug = slug
    subcategory.image = image
    subcategory.category = category
    subcategory.createdBy = req.authUser._id



    const createdSubCategory = await subcategory.save()

    if (!createdSubCategory) {
        req.body.failImage = { secure_url, public_id }
        return next(new AppError(messages.subcategory.failToCreate, 500))
    }

    res.status(201).json({ message: messages.subcategory.createdSuccessfully, success: true, data: createdSubCategory })
}

export const allSubcategories = async (req, res, next) => {
    const subcategories = await Subcategory.find()

    res.status(200).json({ message: 'success', success: true, data: subcategories })

}

export const getSubcategory = async (req, res, next) => {
    const subcategory = await Subcategory.findOne({ slug: req.params.id })

    res.status(200).json({ message: 'success', success: true, data: subcategory })

}

export const updateSubcategory = async (req, res, next) => {

    let { name, category } = req.body
    const id = req.params.id
    name = name.toLowerCase()



    let subcategory = await Subcategory.findOne({ _id: id })

    if (!subcategory)
        return next(new AppError(messages.subcategory.notFound, 404))

    const checkName = await Subcategory.findOne({ newName: name })
    if (checkName)
        return next(new AppError(messages.subcategory.alreadyExists, 409))

    if (name) {
        const slug = slugify(name)
        subcategory.slug = slug
        subcategory.name = name
    }


    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path,
            {
                public_id: subcategory.image.public_id,
                invalidate: true
            })
        subcategory.image = { secure_url, public_id }
        req.failImage = { secure_url, public_id }
    }

    if(category){
        const categoryExists = await Category.findById(category)
        if (!categoryExists)
            return next(new AppError(messages.category.notFound,404))
    }

    const updatedSubcategory = await subcategory.save()

    res.status(200).json({ message: 'category updated successfully', success: true, data: updatedSubcategory })

}


export const deleteSubcategory = async (req, res, next) => {
    let deletedSubcategory = await Subcategory.findByIdAndDelete({ name: req.params.id })
    if (!deletedSubcategory)
        return next(new AppError('category not found', 404))

    await cloudinary.uploader.destroy(deletedSubcategory.image.public_id)

    res.status(200).json({ message: 'category deleted successfully', success: true, data: deletedSubcategory })

}
