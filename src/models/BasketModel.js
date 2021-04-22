const client = require('../modules/mongo')
const { Schema, model } = require('mongoose')


const BasketSchema = new Schema({
    product: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

async function BasketModel () {
    let db = await client()
    return await db.model('basket', BasketSchema)
}



