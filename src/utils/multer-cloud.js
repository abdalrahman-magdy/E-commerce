import multer from "multer"
import { AppError } from "./appError.js"
export const cloudUpload = () => {
    const storage = multer.diskStorage({})

    const fileFilter = (req, file, cb) => {
        if (file.size > 5500000) {
            return cb(new AppError('file must be under 5 MB', 401), false)

        }
        if (!file.mimetype.startsWith('image'))
            return cb(new AppError('images only please', 401), false)
        cb(null, true)
    }

    const upload = multer({
        storage, fileFilter,
        limits: { fileSize: 10 * 1024 * 1024 }
    })
    return upload
}



// export const allowedFilesTypes = {
//     image:  ['image/png','image/webp','image/svg+xml','image/jpeg','image/apng']
// }