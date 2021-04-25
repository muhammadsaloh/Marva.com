const { Router } = require('express')
const UserMiddleware = require('../middlewares/UserMiddlewares')
const { findUser } = require('../models/UserModel')
const { findProduct, findByIdP } = require('../models/ProductModel')

const router = Router()
router.use(UserMiddleware)


router.get('/', UserMiddleware, async (request, response) => {
    let user = await findUser(request.user.phone)
    
    let products = await findProduct()
        // .populate('userId')
    response.render('index', {
        title: "Homepage",
        user,
        products
    })
})

router.get('/:id', UserMiddleware, async (request, response) => {
    let products = await findByIdP(request.params.id)
    response.render('product', {
        title: "Products",
        products
    })
})

module.exports = {
    path: "/home",
    router: router
}