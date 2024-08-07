const Order = require('../models/order.model.js');

// read data
exports.readData = async(req, res) => {
    try{
        const sCode = req.query.sCode;
        const infos = await Order.find({ societeCode: sCode }).sort({ _id: -1 }).lean();
        res.status(200).json(infos);
    }
    catch(err){
        res.status(500).json(err.message);
    }
};

// add data
exports.createData = async(req, res) => {
    try{
        let lastRecod = await Order.findOne({ societeCode: req.body.societeCode }).sort({'_id': -1});
        req.body.number = lastRecod?.number ? lastRecod.number + 1 : 1;

        await Order.create(req.body);
        res.status(200).json(true);
    }
    catch(err){
        res.status(500).json(err.message);
    }
};

// update data
exports.updateData = async(req, res) => {
    try{
        const {id} = req.params;
        const infos = await Order.findByIdAndUpdate(id, req.body);
    
        if(infos)
            res.status(200).json({message: `Updated with success!!`});               
    }
    catch(err){
        res.status(500).json(err.message);
    }
};

// delete data
exports.deleteData = async(req, res) => {
    try{
        const {id} = req.params;
        const infos = await Order.findByIdAndDelete(id);

        if(infos)
            res.status(200).json({message: `Deleted with success!!`});       
    }
    catch(err){
        res.status(500).json(err.message);
    }
};

// Calcul Profits
exports.calculProfits = async(req, res) => {
    console.log('enter')
    try {
        console.log('calculProfits: ', calculProfits);
        const sCode = req.query.sCode;
        const totalAmounts = await Order.aggregate([
            { $match: { societeCode: sCode } },
            {
              $group: {
                _id: null,
                saleTotal: { $sum: { $toDouble: "$sale" } },
                purchasesTotal: { $sum: { $toDouble: "$purchase" } }
              }
            }
        ]);

        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);
        
        const totalMonthAmounts = await Order.aggregate([
            {
              $match: {
                societeCode: sCode,
                date: {
                  $gte: startOfMonth,
                  $lt: endOfMonth
                }
              }
            },
            {
              $group: {
                _id: null,
                totalSale: { $sum: { $toDouble: "$sale" } },
                purchasesTotal: { $sum: { $toDouble: "$purchase" } }
              }
            },
            {
              $project: {
                _id: 0,
                totalSale: 1,
                purchasesTotal: 1,
                monthPofits: { $subtract: ["$purchasesTotal", "$totalSale"] }
              }
            }
          ]);


          const startOfDay = new Date();
          startOfDay.setHours(0, 0, 0, 0);
          const endOfDay = new Date();
          endOfDay.setHours(23, 59, 59, 999);
          
          const totalDayAmounts = await Order.aggregate([
            {
              $match: {
                societeCode: sCode,
                date: {
                  $gte: startOfDay,
                  $lt: endOfDay
                }
              }
            },
            {
              $group: {
                _id: null,
                totalSale: { $sum: { $toDouble: "$sale" } },
                purchasesTotal: { $sum: { $toDouble: "$purchase" } }
              }
            },
            {
              $project: {
                _id: 0,
                totalSale: 1,
                purchasesTotal: 1,
                dayProfits: { $subtract: ["$purchasesTotal", "$totalSale"] }
              }
            }
          ]);
        
        let totalMoney = totalAmounts[0].purchasesTotal;
        let totalProfits = totalAmounts[0].purchasesTotal - totalAmounts[0].saleTotal;
        let monthProfits = totalMonthAmounts[0].monthPofits;
        let dayProfits = totalDayAmounts[0].dayProfits;

        const data = {
            totalMoney: totalMoney,
            totalProfits: totalProfits,
            monthProfits: monthProfits,
            dayProfits: dayProfits
        }

        if (data)
            res.status(200).json(data);
    }
    catch(err){
        res.status(500).json(err.message);
    }
}