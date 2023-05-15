const Order = require('../models/order.model');

module.exports.findAllOrders = (req, res) => {
    Order.find()
    .then((allOrder) => {
        res.json({ order: allOrder})
    })
    .catch((err) => {
        res.json({ message: 'Something went wrong', error: err})
    })
}

module.exports.findOrderById = (req, res) => {
    Order.findOne({ _id: req.params.id })
        .then(oneOrder => {
            res.json({ order: oneOrder })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

module.exports.addNewOrder = (req, res) => {
    Order.create(req.body)
        .then(newOrder => {
            res.json({ order: newOrder })
        })
        .catch((err) => {
            res.status(400).json(err)
        });}

module.exports.updateOrderById = (req, res) => {
    Order.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedOrder => {
            res.json({ order: updatedOrder })
        })
        .catch((err) => {
            res.status(400).json(err)
        });}

module.exports.deleteOrder = (req, res) => {
    Order.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}