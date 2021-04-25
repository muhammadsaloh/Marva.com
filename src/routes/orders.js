const { Router } = require('express')
const Order = require('../models/OrderModel')
const UserMiddleware = require('../middlewares/UserMiddlewares')
const User = require('../models/UserModel')
const router = Router()

router.get('/', UserMiddleware, async (request, response) => {
  try {
      let user = await User.findById(request.user._id)
    const orders = await Order.find({'user.user_id': request.user._id})
        .populate('user.userId',)
    response.render('orders', {
      title: 'Orders',
      user,
      orders: orders.map(o => {
        return {
          ...o._doc,
          price: o.products.reduce((total, c) => {
            return total += c.count * c.product.price
          }, 0)
        }
      })
    })
  } catch (e) {
    console.log(e)
  }
})


router.post('/', UserMiddleware, async (request, response) => {
  try {
    let user = await User.findById(request.user._id)
      .populate('cart.items.productId')
    const products = user.cart.items.map(i => ({
      count: i.count,
      product: {...i.productId._doc}
    }))

    const order = new Order({
      user: {
        name: request.user.name,
        user_id: request.user
      },
      products: products
    })

    await order.save()
    await user.clearCart()

    response.redirect('/orders')
  } catch (e) {
    console.log(e)
    response.status(400).send({
            ok: false,
            message: "Bad request",
        })
  }
})


module.exports = {
    path: "/orders",
    router: router
}