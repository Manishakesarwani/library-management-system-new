const express=require("express");
const app=express();
const port=3000;

app.use(express.json());

app.get("/",(req, res)=>{
    res.status(200).json({
        message:"Home Page!"
    });
})

// app.all("*",(req, res)=>{
//     res.status(500).json({
//         message:"Not Built!"
//     });
// })

app.listen(port,()=>{
    console.log(`Server is up and running on the port http://localhost:${port}`);
})