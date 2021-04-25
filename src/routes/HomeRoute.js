const { Router } = require('express')
const UserMiddleware = require('../middlewares/UserMiddlewares')
const User = require('../models/UserModel')
const Product = require('../models/ProductModel')
const Path = require('path')
require('dotenv').config({ path: Path.join(__dirname, ".env")})



const router = Router()
router.use(UserMiddleware)

const PHONE = process.env.PHONE
const ADMIN = process.env.ADMIN


router.get('/', UserMiddleware, async (request, response) => {
    let phone = request.user.phone
    let user = await User.findOne({phone: phone})
    
    let products = await Product.find()
        .populate('user_id', 'name phone')
        .select('price name img type title')
    
    response.render('index', {
        title: "Homepage",
        user,
        products,
        PHONE,
        ADMIN
    })
})

router.get('/:id', UserMiddleware, async (request, response) => {
    let products = await Product.findById(request.params.id)
    response.render('product', {
        title: "Products",
        products
    })
})

module.exports = {
    path: "/home",
    router: router
}