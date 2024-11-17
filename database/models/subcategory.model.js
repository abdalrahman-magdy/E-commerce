import {  model, Schema, Types } from "mongoose"

const subcategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        secure_url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    },
    category: {
        type: Types.ObjectId,
        ref: 'Category',
        required:true
    },
    slug: {
        type: String,
        lowercase: true
    },
    createdBy:{
        type: Types.ObjectId,
        ref:'User',
        required:true

    }

}, { timestamps: true, versionKey: false })

export const Subcategory = model('Subcategory', subcategorySchema)