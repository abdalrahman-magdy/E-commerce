import slugify from "slugify"
import { Category } from "../../../database/index.js"
import { AppError } from "../../utils/appError.js"
import cloudinary from "../../utils/cloud.js"
import { messages } from "../../utils/constant/messages.js"
const addCategory = async (req, res, next) => {

    let { name } = req.body

    name = name.toLowerCase()

    const slug = slugify(name)


    const checkName = await Category.findOne({ name })
    if (checkName) {
        return next(new AppError(messages.category.alreadyExists, 409))
    }



    const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path,
        {
            folder: `E-commerce/categories`
        }
    )
    const image = { secure_url, public_id }
    const category = new Category({ name, slug, image,createdBy:req.authUser._id })

    const createdCategory = await category.save()

    if (!createdCategory) {
        req.body.failImage = { secure_url, public_id }
        return next(new AppError(messages.category.failToCreate, 500))

    }

    res.status(201).json({ message: messages.category.createdSuccessfully, success: true, data: createdCategory })
}

const allCategories = async (req, res, next) => {
    const categories = await Category.find()

    res.status(200).json({ success: true, data: categories })

}

const getCategory = async (req, res, next) => {
    const category = await Category.findOne({ _id: req.params.id })

    res.status(200).json({ success: true, data: category })

}

const updateCategory = async (req, res, next) => {

    const id = req.params._id
    const name = req.body.name.toLowerCase()

    let category = await Category.findById({ _id: id })

    if (!category)
        return next(new AppError("Category not found", 404))

    const checkName = await Category.findOne({ name, _id: { $ne: id } })
    if (checkName)
        return next(new AppError("Category already exists", 409))

    if (name) {
        const slug = slugify(name)
        category.slug = slug
        category.name = name
    }

    const oldFile = category.image.public_id


    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            public_id: oldFile,
            invalidate: "true"
        })

        category.image = { secure_url, public_id }
        req.body.failImage = { secure_url, public_id }
    }



    const updatedCategory = await category.save()

    if (!updateCategory) {
        return next(new AppError(messages.category.failToUpdate, 500))
    }

    res.status(200).json({ message: 'category updated successfully', success: true, data: updatedCategory })

}


const deleteCategory = async (req, res, next) => {
    let deletedCategory = await Category.findByIdAndDelete({ _id: req.params.id })
    if (!deletedCategory)
        return next(new AppError('category not found', 404))

    await cloudinary.uploader.destroy(deletedCategory.image.public_id)

    res.status(200).json({ message: 'category deleted successfully', success: true, data: deletedCategory })

}

export { addCategory, allCategories, deleteCategory, getCategory, updateCategory }
