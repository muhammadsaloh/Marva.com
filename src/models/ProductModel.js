const client = require('../modules/mongo')
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
        ref: 'user'
    }
})


async function ProductModel () {
    let db = await client()
    return await db.model('product', ProductSchema)
}

async function createProduct (name, price, title, img, type, user_id) {
    const db = await ProductModel()
    return await db.create({
        name, price, title, img, type, user_id
    })
}

async function findProduct () {
    const db = await ProductModel()
    return await db.find()
    .populate('userId', 'name phone')
    .select('price name img type title')
}

async function findByIdP (id) {
    const db = await ProductModel()
    return await db.findById(id)
}

async function addProduct (user_id, productId) {
    const db = await ProductModel()
    return await db.create({ user_id: user_id, productId: productId })
}

async function editProduct (id, data) {
    const db = await ProductModel()
    return await db.findByIdAndUpdate(id, data)
}

async function deleteProduct ( id ) {
    const db = await ProductModel()
    return await db.findByIdAndDelete(id)
}

module.exports = { createProduct, findProduct, findByIdP, ProductModel, addProduct, deleteProduct, editProduct }
// module.exports = model ('product', ProductSchema)