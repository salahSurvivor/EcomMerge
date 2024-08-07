const mongoose = require('mongoose')

const ordersSchema = mongoose.Schema(
    {
        number: { type: Number },
        name: { type: String },
        city: { type: String },
        date: { type: Date },
        phone: { type: String },
        purchase: { type: Number },
        sale: { type: Number},
        societeCode: { type: String }
    },
    { timestamps: true }
)


const Order = mongoose.model('Order', ordersSchema);

module.exports = Order;