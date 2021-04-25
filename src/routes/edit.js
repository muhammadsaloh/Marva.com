const { Router } = require('express')
const UserMiddleware = require('../middlewares/UserMiddlewares')
const { editProduct, deleteProduct } = require('../models/ProductModel')

const router = Router()
router.use(UserMiddleware)

router.get('/:id', UserMiddleware, async (request, response) => {
    let productId =  request.params.id
    response.render('edit', {
        title: "Edit page",
        productId
    })
})


router.post('/', UserMiddleware, async (request, response) => {
    try {
        const { id } = request.body
        delete request.body.id
        await editProduct(id, request.body)
        response.redirect('/home')
    } catch (e) {
        response.status(400).send({
            ok: false,
            message: "Bad request"
        })
    }
})

router.post('/remove', UserMiddleware, async (request, response) => {
    try {
        let { id } = request.body
        await deleteProduct( id )
        response.redirect('/home')
    } catch (e) {
        response.status(400).send({
            ok: false,
            message: "Bad request"
        })
    }
})

module.exports = {
    path: "/edit",
    router: router
}