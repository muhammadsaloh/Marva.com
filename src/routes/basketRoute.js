const { Router } = require('express')
const UserMiddleware = require('../middlewares/UserMiddlewares')
const User = require('../models/UserModel')
const Product = require('../models/ProductModel')


const router = Router()
router.use(UserMiddleware)

function mapCartItems(cart) {
  return cart.items.map(c => ({
    ...c.productId._doc,
    id: c.productId.id,
    count: c.count
  }))
}

function computePrice(products) {
  return products.reduce((total, product) => {
    return total += product.price * product.count
  }, 0)
}

router.post('/add', UserMiddleware, async (request, response) => {
    try {
        const product = await Product.findById(request.body.id);
        let user = await User.findById(request.user._id)
        await user.addTocart(product)
        response.redirect('/basket')
    } catch (e) {
        console.log(e)
        response.status(400).send({
            ok: false,
            message: "Bad request",
        })
    }
})

router.delete('/remove/:id', async (request, response) => {
    let user = await User.findById(request.user._id)
    await user.removeFromCart(request.params.id)
    user.populate('cart.items.productId')
    const products = mapCartItems(user.cart)
    const cart = {
        products, price: computePrice(products)
    }
    response.status(200).json(cart)
})

router.get('/', UserMiddleware, async (request, response) => {
    let user = await User.findById(request.user._id)
        .populate('cart.items.productId')

        const products = mapCartItems(user.cart)
        
    response.render('basket', {
        title: "Basket Page",
        products: products,
        price: computePrice(products)
    })
})




module.exports = {
    path: "/basket",
    router: router
}