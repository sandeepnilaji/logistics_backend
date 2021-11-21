const mongoose=require("mongoose");

const orderSchema = new mongoose.Schema({
    //id
    from:{type:String,required:true},
    to:{type:String,required:true},
    phoneno:{type:String,required:true},
    status:{type:String,default:false},
    price:{type:Number,default:0},
    paymentmode:{type:String,default:"online"}
    
    // orders:[{type: Schema.Types.ObjectId, ref: 'Ingredient'}]
},{
    versionKey:false,
    timestamps:true
})

const Order = mongoose.model("order",orderSchema)
module.exports= Order;
