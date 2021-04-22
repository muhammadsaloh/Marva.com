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
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

async function ProductModel () {
    let db = await client()
    return await db.model('product', ProductSchema)
}

async function createProduct (name, price, title, img, type, userId) {
    const db = await ProductModel()
    return await db.create({
        name, price, title, img, type, userId
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

module.exports = { createProduct, findProduct, findByIdP, ProductModel }