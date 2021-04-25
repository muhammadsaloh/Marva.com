const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    img: String,
    type: String,
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

ProductSchema.method('toClient', function() {
    const product = this.toObject()
    product.id = product._id
    delete product._id
    return product
})

module.exports = model ('product', ProductSchema)