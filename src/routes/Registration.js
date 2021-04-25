let { Router } = require('express')
const Joi = require('joi')
const { createUser } = require('../models/UserModel')
const { generateCrypt } = require('../modules/bcrypt')
const AuthMiddleware = require('../middlewares/AuthMiddlewares')

let router = Router()
router.use(AuthMiddleware)

const RegistrationValidation = new Joi.object({
    name: Joi.string()
        .min(3)
        .max(32)
        .error(new Error("Name is incorrect"))
        .required(),
    phone: Joi.number()
        .min(10000)
        .max(999999999999)
        .error(new Error("Phone number is incorrect"))
        .required(),
    password: Joi.string()
        .min(6)
        .max(32)
        .error(new Error("Password is incorrect"))
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    gender: Joi.string()
        .required()
        .error(new Error("Gender is incorrect"))
})


router.get('/', (request, response) => {
    response.render('registration', {
        title: "Sign Up Page"
    })
})

router.post('/', async (request, response) => {
    try {
        const { name, phone, password, gender } = await RegistrationValidation.validateAsync(request.body)
        await createUser( name, phone, generateCrypt(password), gender )
        response.redirect('/login')
    } catch (e) {
        if(String(e).includes("duplicate key")){
            e = "Phone is not available"
        }
        response.render('registration', {
            title: "Sign up",
            error: e + ""
        })
    }
})

module.exports = {
    path: '/signup',
    router: router
}