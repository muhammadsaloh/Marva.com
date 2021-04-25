const { Router } = require('express')
const UserMiddleware = require('../middlewares/UserMiddlewares')
const { findUsers } = require('../models/UserModel')

const router = Router()
router.use(UserMiddleware)

router.get('/', UserMiddleware, async (request, response) => {
    let users = await findUsers()
    response.render('users', {
        title: 'Users page',
        users
    })
})


module.exports = {
    path: "/users",
    router: router
}