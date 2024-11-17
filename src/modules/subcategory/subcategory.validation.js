import joi from 'joi'
import { generalFields } from '../../middleware/validate.js'

export const addSubCatVal = joi.object({
    name: generalFields.name.required(),
    category: generalFields.objectId.required()
})


export const updateSubCatVal = joi.object({
    name: generalFields.name,
    id: generalFields.objectId.required(),
    category: generalFields.objectId
})