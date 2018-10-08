const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
// mongoose.Promise = require('bluebird')

const Product = require('../models/product')

router.get('/', (req, res, next) => {
    product = Product.find()
    product.then(result => {
        var products = []
        result.forEach(function (item) {
            var item = item.toObject()
            item.access_link = {
                uri: '/products/' + item._id,
                method: 'GET'
            }
            products.push(item)
        });
        res.status(200).json({
            product_list: products
        })
    })
})

router.post('/', (req, res, next) => {

    var product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })

    product.save()
        .then(product => {
            var result = product.toObject()
            result.url = '/products/' + result._id
            console.log(result)
            res.status(201).json({
                error: false,
                message: 'Product created.',
                crated_product: result
            })
        })
        .catch(err => console.log(err))


})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId
    const product = Product.find({})
        .exec()
    product
        .then((doc) => {
            res.status(200).json({
                product: doc
            })
        })
        .catch((err) => {
            res.status(404).json({
                error: true,
                message: err
            })
        })
})

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId
    res.status(200).json({
        message: 'Updated product.',
        id: id
    })
})

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId
    res.status(200).json({
        message: 'Deleted product.',
        id: id
    })
})


module.exports = router