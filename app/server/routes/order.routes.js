const OrderController = require('../controllers/order.controller');

module.exports = app => {
    app.get('/api/orders', OrderController.findAllOrders);
    app.get('/api/order/:id', OrderController.findOrderById);
    app.put('/api/editOrder/:id', OrderController.updateOrderById);
    app.post('/api/newOrder', OrderController.addNewOrder);
    app.delete('/api/deleteOrder/:id', OrderController.deleteOrder);
}