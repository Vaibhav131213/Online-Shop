const mongoose = require('mongoose');
const user = require('./user');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products:[{
        productData: {type: Object, required:true},
        quantity:{type: Number, required: true}
    }],
    user:{
        name:{
            type:String,
            required: true
    },
       userId:{
            type: Schema.Types.ObjectId,
            required: true,
            ref: user
    }
    },
    
})

module.exports = mongoose.model("Order",orderSchema);