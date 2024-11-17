import multer from "multer"
import { nanoid } from "nanoid"
import { AppError } from "./AppError.js"
import fs from 'fs'
import path from "path"
export const fileUpload = (folder) => {

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const name = req.body.name
            const fullPath = path.resolve(`uploads/${folder}/${name}`)

            fs.mkdirSync(fullPath, { recursive: true })
            cb(null, fullPath)
        },
        filename: (req, file, cb) => {
            cb(null, nanoid() + '-' + file.originalname)
        }
    })

    const fileFilter = (req, file, cb) => {
        if (!file.mimetype.startsWith('image'))
            return cb(new AppError('images only please', 401), false)
        cb(null, true)
    }

    const upload = multer({ storage, fileFilter })
    return upload
}