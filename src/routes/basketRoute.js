const { Router } = require('express')
const UserMiddleware = require('../middlewares/UserMiddlewares')
const { findUser } = require('../models/UserModel')
const { findProduct, findByIdP } = require('../models/ProductModel')

const router = Router()
router.use(UserMiddleware)

router.post('/add', UserMiddleware, async (request, response) => {
    let products = await findByIdP(request.body.id)
    await request.user.addToBasket(products)
    response.redirect('/basket')
})

router.get('/', UserMiddleware, async (request, response) => {
    // let user = await findUser(request.user.phone)
    // let products = await findProduct({})
    response.json({test: true})
    // response.render('basket', {
    //     title: "Basket Page",
    //     user,
    //     products
    // })
})


module.exports = {
    path: "/basket",
    router: router
}