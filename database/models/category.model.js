import { model, Schema, Types } from "mongoose"

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: [true, 'name is required']
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
    slug: {
        type: String,
        lowercase: true,
        unique: [true, 'slug is required']
    },
    createdBy:{
        type: Types.ObjectId,
        ref:'User',
        required:true

    }
    

}, { timestamps: true, versionKey: false })

export const Category = model('Category', categorySchema)