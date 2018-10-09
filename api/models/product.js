const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
}, {
    versionKey: '0.0.1 Beta'
})

module.exports = mongoose.model('Product', productSchema)