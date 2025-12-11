const mongoose=require("mongoose");

const schema=mongoose.Schema;
const bookSchema=new schema({
    title:{
        type:String,
        required: true
    },
    author:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required: true
    },
    price:{
        type:String,
        required:true
    },
    inStock:{
        type:Boolean,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    publisher:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports=mongoose.model("Book", bookSchema);