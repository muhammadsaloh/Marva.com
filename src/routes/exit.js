const { Router } = require('express')

const router = Router()

router.get('/', async (request, response) => {
    response.clearCookie('token').redirect('/login')
    
    response.render('index')
})


module.exports = {
    path: "/exit",
    router: router
}