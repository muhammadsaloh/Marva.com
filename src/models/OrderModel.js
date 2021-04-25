const {Schema, model} = require('mongoose')

const orderSchema = new Schema({
  products: [
    {
      product: {
        type: Object,
        required: true
      },
      count: {
        type: Number,
        required: true
      }
    }
  ],
  user: {
    name: String,
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
})


module.exports = model('Order', orderSchema)