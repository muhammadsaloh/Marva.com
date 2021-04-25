const { Router } = require('express')
const UserMiddleware = require('../middlewares/UserMiddlewares')
const Product = require('../models/ProductModel')
const uuid = require('uuid').v4

const router = Router()
router.use(UserMiddleware)


router.get('/', UserMiddleware, async (request, response) => {
    response.render('add', {
        title: "Add Page"
    })
})

router.post('/', UserMiddleware, async (request, response) => {
    try {
        let  user_id  = request.user._id
        let { name, price, title, img, type } = request.body
        const product = new Product({
            name: name,
            price: price,
            title: title,
            img: img,
            type: type,
            user_id: user_id
        })
        await product.save()
        response.redirect('/home')
    } catch (e) {
        response.status(400).send({
           ok: false,
           message: "Bad request"
       }) 
    }
})

module.exports = {
    path: "/add",
    router: router
}