module.exports = app => {
    const ordersController = require('./controllers/orderController');

    //#region Orders

    app.post('/orders', ordersController.createData); // Create Data

    //#endregion Orders
};