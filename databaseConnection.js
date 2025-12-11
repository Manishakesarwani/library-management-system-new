const mongoose=require("mongoose");

function DbConnection(){
    const DB_URL =process.env.MONGO_URI;
    mongoose.connect(DB_URL)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));
    const db=mongoose.connection;
    db.on("error", console.error.bind(console, "Connection Error"));
    db.once("open", function(){
        console.log("Db Connection Successfull....");
    });
}

module.exports=DbConnection;