const client = require('../modules/mongo')
const { Schema } = require('mongoose')


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
    cart: {
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

UserSchema.methods.addTocart = function (product) {
    const items = [...this.cart.items]
    const idx = items.findIndex(c => {
        return c.productId.toString() === product._id.toString()
    })
    if (idx >= 0) {
        items[idx].count = items[idx].count + 1
    } else {
        items.push({
            productId: product._id,
            count: 1
        })
    }

    this.cart = {items}
    return this.save()
}

async function UserModel () {
    let db = await client()
    return await db.model('users', UserSchema)
}

async function createUser(name, phone, password, gender) {
    const db = await UserModel()
    return await db.create({
        name, phone, password, gender, cart: {items: []}
    })
}

async function findUser(login) {
    let object = { phone: login }
    const db = await UserModel()
    return await db.findOne(object)
}

async function findUsers () {
    const db = await UserModel()
    return await db.find()
}


module.exports = {
    createUser,
    findUser,
    findUsers
}
