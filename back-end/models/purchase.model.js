const mongoose = require('mongoose')

const purchaseSchema = mongoose.Schema(
    {
        number: { type: Number },
        nameP: { type: String },
        priceP: { type: Number },
        quantityP: { type: Number },
        totalP: { type: Number },
        dateP: { type: Date },
        societeCode: { type: String }
    },
    { timestamps: true }
)


const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;