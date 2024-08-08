module.exports = app => {
    const ordersController = require('./controllers/orderController');
    const lossessController = require('./controllers/losses.controller');
    
    //#region Orders

    app.post('/orders', ordersController.createData); // Create Data

    //#endregion Orders

    //#region Losses

    app.post('/losses', lossessController.createData); // Create Data

    //#endregion Losses
};