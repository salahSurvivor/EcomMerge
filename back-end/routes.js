module.exports = app => {
    const ordersController = require('./controllers/orderController');
    const lossessController = require('./controllers/losses.controller');
    const purchasesController = require('./controllers/purchase.controller');
    
    //#region Orders

    app.get('/orders', ordersController.readData); // Read Data

    app.post('/orders', ordersController.createData); // Create Data
    
    app.put('/orders/:id', ordersController.updateData); // Update Data
    
    app.delete('/orders/:id', ordersController.deleteData); // Delete Data

    //#endregion Orders

     //#region Losses
     app.get('/losses', lossessController.readData); // Read Data

     app.post('/losses', lossessController.createData); // Create Data
     
     app.put('/losses/:id', lossessController.updateData); // Update Data
     
     app.delete('/losses/:_id', lossessController.deleteData); // Delete Data
     //#endregion Losses
 
     //#region Purchase
     app.get('/purchases', purchasesController.readData); // Read Data
 
     app.post('/purchases', purchasesController.createData); // Create Data
          
     app.put('/purchases/:id', purchasesController.updateData); // Update Data
          
     app.delete('/purchases/:id', purchasesController.deleteData); // Delete Data
     //#endregion Purchase


};