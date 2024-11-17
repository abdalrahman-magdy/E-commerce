import joi from 'joi'
import { generalFields } from '../../middleware/validate.js'

const addCat = joi.object({
    name:generalFields.name.required()
})
const updateCat = joi.object({
    id: generalFields.objectId.required
})
export {updateCat,addCat}