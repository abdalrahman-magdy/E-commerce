
import { model, Schema, Types } from "mongoose"

const brandSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: [true, 'name is required'],
        lowercase: true,
        trim: true
    }, slug: {
        type: String,
        required: true,
        unique: [true, 'name is required'],
        lowercase: true,
        trim: true
    }, logo: {
        secure_url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    },
    createdBy: {
        type: Types.ObjectId,
        ref: "User",
        required:  true
    }

}, { timestamps: true })

export const Brand = model('Brand', brandSchema)