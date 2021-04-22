const client = require('../modules/mongo')
const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        index: true,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    basket: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'product',
                    required: true
                }
            }
        ]
    }
})

async function UserModel () {
    let db = await client()
    return await db.model('users', UserSchema)
}

async function createUser(name, phone, password, gender) {
    const db = await UserModel()
    return await db.create({
        name, phone, password, gender
    })
}

async function findUser(login) {
    let object = { phone: login }
    const db = await UserModel()
    return await db.findOne(object)
}

async function findAdmin( phone, password ) {
    let object = { phone: phone, password: password }
    const db = await UserModel()
    return await db.findOne(object)
}


UserSchema.methods.addToBasket = function (products) {
    const items = [...this.basket.items]
    const idx = items.findIndex( c => {
        return c.productId.toString() === products._id.toString()
    })

    if (idx >= 0) {
        items[idx].count = items[idx].count + 1
    } else {
        items.push({
            productId: products._id,
            count: 1
        })
    }

    this.basket = {items}
    return this.save()
}


module.exports = {
    createUser,
    findUser,
    findAdmin
}
module.exports = model('users', UserSchema)