const Express = require('express')
const mongoose = require('mongoose')
const CookieParser = require('cookie-parser')
const Path = require('path')
const Fs = require('fs')
require('dotenv').config({ path: Path.join(__dirname, ".env")})
const PORT = process.env.PORT
const URL = process.env.URL

// database
async function start () {
    return await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
}

if(!PORT){
    throw new ReferenceError("PORT is not defined")
}
start()

const application = Express()

// Middlewares
application.use(Express.json())
application.use(Express.urlencoded({ extended: true }))
application.use(CookieParser())

// Settings
application.listen(PORT)
application.set('view engine', 'ejs')
application.set('views', Path.join(__dirname, "views"))

application.use(Express.static(Path.join(__dirname, "public")))


// Routes

const RoutesPath = Path.join(__dirname, "routes")

Fs.readdir(RoutesPath, (err, files) => {
    if(err) throw new Error(err)
    files.forEach(route => {
        const RoutePath = Path.join(__dirname, "routes", route);
        const Route = require(RoutePath)
        if(Route.path && Route.router) application.use(Route.path, Route.router)
    })
})

application.get('/', (_, res) => res.redirect('/home'))