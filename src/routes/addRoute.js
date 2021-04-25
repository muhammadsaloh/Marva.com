const { Router } = require('express')
const UserMiddleware = require('../middlewares/UserMiddlewares')
const { createProduct } = require('../models/ProductModel')
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
        await createProduct( name, price, title, img, type, user_id )
        
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