const mongoose=require("mongoose");

const Schema= mongoose.Schema;
const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    registeredAt:{
        type:String,
        required:true
    },
    issuedBook:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book",
        required:false
    },
    issuedDate:{
        type:String,
        required:false
    },
    returnDate:{
        type:String,
        required:false
    },
    SubscriptionType:{
        type:String,
        required:true
    },
    SubscriptionDate:{
        type:String,
        required:true
    }
}, {timestamps:true});

module.exports=mongoose.model("User", userSchema)