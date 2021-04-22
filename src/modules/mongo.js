const mongoose = require('mongoose')


async function client() {
    return await mongoose.connect('mongodb+srv://new_user_17:lebazar@cluster0.issri.mongodb.net/shop?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
}

module.exports = client