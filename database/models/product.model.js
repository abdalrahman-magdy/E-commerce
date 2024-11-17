
import { model, Schema, Types } from "mongoose"
import { discountTypes } from "../../src/utils/constant/enums.js";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    stock: {
        type: Number,
        min: 0,
        default: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discount: {
        type: Number,
        min: 0
    },
    discountType: {
        type: String,
        enum: Object.values(discountTypes),
        default: discountTypes.FIXED
    },
    colors: [String],

    sizes: [String],
    rate: {
        type: Number,
        min: 1, max: 5,
        default: 5
    },

    mainImage: {
        secure_url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    },
    subImages: [{
        secure_url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    }],
    category: {
        type: Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subcategory: {
        type: Types.ObjectId,
        ref: 'Subcategory',
        required: true
    },
    brand: {
        type: Types.ObjectId,
        ref: 'Brand',

    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User',
        required: true

    },
    updatedBy: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },

}, { timestamps: true, versionKey: false })

productSchema.methods.inStock = function (quantity) {
    return this.stock >= quantity
}

productSchema.virtual('finalPrice').get(function () {
    if (this.discountType == discountTypes.PERCENTAGE)
        return this.price - (this.price * ((this.discount || 0) / 100))
    else
        return this.price - (this.discount || 0)

})


export const Product = model('Product', productSchema,)