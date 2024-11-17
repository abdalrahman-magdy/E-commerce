import joi from "joi";
import { generalFields } from "../../middleware/validate.js";


const addBrandVal = joi.object({
    name:generalFields.name.required(),
    
})


const updateBrandVal = joi.object({
    name:generalFields.name,
    id: generalFields.objectId.required()
})

export {addBrandVal,updateBrandVal}
