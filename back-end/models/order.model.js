const mongoose = require('mongoose')

const orderDetailsSchema = mongoose.Schema({
    location: { type: String },
    date: {type: Date},
    timeStart: { type: String },
    timeEnd: { type: String },
    description: { type: String }
});

const ordersSchema = mongoose.Schema(
    {
        number: { type: Number },
        name: { type: String },
        city: { type: String },
        date: { type: Date },
        phone: { type: String },
        purchase: { type: Number },
        sale: { type: Number},
        status: { type: String },
        isConfirmed: { type: Boolean },
        orderDetails: orderDetailsSchema,
        cancellationReason: { type: String },
        societeCode: { type: String }
    },
    { timestamps: true }
)


const Order = mongoose.model('Order', ordersSchema);

module.exports = Order;