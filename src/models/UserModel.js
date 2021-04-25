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

UserSchema.methods.removeFromCart = function(id) {
  let items = [...this.cart.items]
  const idx = items.findIndex(c => c.productId.toString() === id.toString())

  if (items[idx].count === 1) {
    items = items.filter(c => c.productId.toString() !== id.toString())
  } else {
    items[idx].count--
  }

  this.cart = {items}
  return this.save()
}

UserSchema.methods.clearCart = function() {
  this.cart = {items: []}
  return this.save()
}

module.exports = model('users', UserSchema) 
