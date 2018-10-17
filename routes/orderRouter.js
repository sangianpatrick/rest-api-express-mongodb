const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders were fetched'
    })
})

router.post('/', (req, res, next) => {
    const order = {
        product_id: req.body.product_id,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: 'Orders was created',
        order: order
    })
})

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId
    res.status(200).json({
        message: 'Detail of order',
        id: id
    })
})

router.patch('/:orderId', (req, res, next) => {
    const id = req.params.orderId
    res.status(200).json({
        message: 'Order was updated',
        id: id
    })
})

router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId
    res.status(200).json({
        message: 'Order was deleted',
        id: id
    })
})

module.exports = router