const express=require("express");
const dotenv=require("dotenv");

//import data connection file
const DbConnection=require("./databaseConnection");

const app=express();
const port=3000;


//importing the routers
const users_router=require("./routes/users");
const books_router=require("./routes/books");

dotenv.config();
DbConnection();


app.use(express.json());

app.get("/",(req, res)=>{
    res.status(200).json({
        message:"Home Page!"
    });
});

app.use("/users",users_router);
app.use("/books", books_router);



// app.all("*",(req, res)=>{
//     res.status(500).json({
//         message:"Not Built!"
//     });
// })

app.listen(port,()=>{
    console.log(`Server is up and running on the port http://localhost:${port}`);
})