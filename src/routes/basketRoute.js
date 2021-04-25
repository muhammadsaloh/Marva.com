const { Router } = require('express')
const UserMiddleware = require('../middlewares/UserMiddlewares')
const { findUser } = require('../models/UserModel')
const { findByIdP } = require('../models/ProductModel')


const router = Router()
router.use(UserMiddleware)

router.post('/add', UserMiddleware, async (request, response) => {
    try {
        const product = await findByIdP(request.body.id);
        let one = await request.user.addTocart(product)
        console.log(one)
        response.redirect('/basket')
    } catch (e) {
        console.log(e)
        response.status(400).send({
            ok: false,
            message: "Bad request",
        })
    }
})


router.get('/', UserMiddleware, async (request, response) => {
    // const { phone } = request.params
    // let user = await findUser(phone)
    // let products = await findProduct({})
    
    response.render('basket', {
        title: "Basket Page"
    })
})




module.exports = {
    path: "/basket",
    router: router
}