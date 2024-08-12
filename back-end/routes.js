module.exports = app => {
    const ordersController = require('./controllers/orderController');
    const lossessController = require('./controllers/losses.controller');
    const purchasesController = require('./controllers/purchase.controller');
    
    //#region Orders

    app.post('/orders', ordersController.createData); // Create Data

    //#endregion Orders

    //#region Losses

    app.post('/losses', lossessController.createData); // Create Data

    //#endregion Losses

    //#region Purchase

    app.post('/purchases', purchasesController.createData); // Create Data

    //#endregion Purchase


};