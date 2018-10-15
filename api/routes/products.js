const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// mongoose.Promise = require('bluebird')

const Product = require("../models/product");

router.get("/", (req, res, next) => {
    Product.find().then(result => {
        var products = [];
        result.forEach(function (item) {
            var item = item.toObject();
            item.access_link = {
                uri: "/products/" + item._id,
                method: ["GET", "PATCH", "PUT", "DELETE"],
                headers: {
                    accept: 'application/json',
                    authorization: 'Bearer tokenn'
                }
            };
            products.push(item);
        });
        res.status(200).json({
            error: false,
            message: 'Product list.',
            create_link: {
                uri: '/products',
                method: ["POST"],
                headers: {
                    accept: 'application/json',
                    authorization: 'Bearer token'
                },
                body: ['name', 'price']
            },
            product_list: products
        });
    });
});

router.post("/", (req, res, next) => {
    var product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product.save()
        .then(product => {
            var result = product.toObject();
            result.access_link = {
                url: "/products/" + result._id,
                method: ["GET"],
                headers: {
                    accept: 'application/json',
                    authorization: 'Bearer token'
                }
            }
            console.log(result);
            res.status(201).json({
                error: false,
                message: "Product created.",
                crated_product: result
            });
        })
        .catch(err => console.log(err));
});

router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            var doc = doc.toObject();
            doc.access_link = {
                uri: "/products/" + doc._id,
                method: ["PATCH", "PUT", "DELETE"],
                headers: {
                    accept: "application/json",
                    authorization: "Bearer token"
                }
            };
            res.status(200).json({
                error: false,
                message: "Product detail.",
                product: doc,
                // sdf: req.headers
            });
        })
        .catch(err => {
            res.status(500).json({
                error: true,
                message: err
            });
        });
});

router.patch("/:productId", (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        message: "Updated product.",
        id: id
    });
});

router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        message: "Deleted product.",
        id: id
    });
});

module.exports = router;