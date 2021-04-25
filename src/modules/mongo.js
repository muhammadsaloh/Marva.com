const mongoose = require('mongoose')


async function client() {
    return await mongoose.connect('mongodb+srv://new_user-17:beautiful@cluster0.issri.mongodb.net/shop', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
}

module.exports = client