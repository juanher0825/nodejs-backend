import mongoose from 'mongoose'
import User from './user.model.js';

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    quantity: {type: Number, required: true},
    brand: {type: String, required: true},
    owner: {type: Object},
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema);

export default Product;