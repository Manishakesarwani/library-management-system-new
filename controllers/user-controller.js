const {userModel, BooksModel, UserModel} = require("../models");

// router.get("/",(req, res)=>{
//     res.status(200).json({
//         success: true,
//         userList: users
//     });
// });
exports.getAllUsers=async(req, res)=>{
    const users=await UserModel.find();

    if(!users || users.length===0){
        return res.status(404).json({
            success: false,
            message: "No users found in the system!"
        });
    }
    res.status(200).json({
        success: true,
        UsersList: users
    });
}

// router.get("/:id",(req, res)=>{

//     const {id}=req.params;
//     const user=users.find((each)=>each.id===id)

//     if(!user){
//         return res.status(404).json({
//             success:false,
//             message: `User - ${id} not found!`
//         });
//     }
//     res.status(200).json({
//         success:true,
//         data:user
//     });
// });

exports.getUsersByTheirId=async(req, res)=>{
    const {id}=req.params;
    const user=await UserModel.findById(id);
    if(!user){
        return res.status(404).json({
            success:false,
            message: `User - ${id} not found!`
        })
    }
    res.status(200).json({
        success: true,
        User: user
    });
}

// router.post("/",(req, res)=>{

// const {id, name, email,age, role, isActive, address, registeredAt} = req.body;

// if(!id || !name || !email || !age || !role || !isActive || !address || !registeredAt){
//     return res.status(404).json({
//         success: false,
//         message: "Please provide details for all the fields."
//     });
// }

// const user = users.find((each)=>each.id===id);

// if(user){
//     return res.status(409).json({
//         success: false,
//         message: `User - ${id} already exists!`
//     });
// }

// users.push({
//     id,
//     name,
//     email,
//     age,
//     role,
//     isActive,
//     address,
//     registeredAt
// })

// res.status(201).json({
//     success:true,
//     message: `User - ${id} added succesfully`
// })

// });

exports.createUser=async (req, res)=>{

    const {data}=req.body;

    if(!data || Object.keys(data).length===0){
        return res.status(404).json({
            success:false,
            message: "Please provide data for all the fields!"
        });
    }
    
    await UserModel.create(data);

    const getUsers = await UserModel.find();

    res.status(200).json({
        success: true,
        message: "User Created Successfully!",
        UsersList: getUsers
    });
}

// router.put("/:id", (req,res)=>{
//     const {id}=req.params;
//     const user=users.find((each)=>each.id===id);

//     const {data}=req.body;

//     if(!user){
//         return res.status(404).json({
//             success: false,
//             message:`User - ${id} does not exists!`
//         });
//     }

//     const UpdatedUser = users.map((item)=>{
//         if(item.id===id){
//             return {
//                 ...item,
//                 ...data
//             };
//         }
//             return item;
//     })

//     res.status(200).json({
//         success: true,
//         message:`User ${id} updated succesfully!`,
//         data: UpdatedUser
//     });
// });

exports.UpdateUserByTheirId=async(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;


    if(!data || Object.keys(data).length===0){
        return res.status(400).json({
            success:false,
            message: "Please provide data for the fields to be updated."
        });
    }

    const getUser=await UserModel.findOneAndUpdate({_id:id},data, {new:true});
    if(!getUser){
        return res.status(400).json({
            success: false,
            message: `User - ${id} not found!`
        })
    }

    res.status(200).json({
        success:true,
        message:"User updated successfully!",
        UsersList: getUser
    });
}

// router.delete("/:id",(req,res)=>{
//     const {id}=req.params;
//     const user=users.find((each)=>each.id===id);

//     if(!user){
//         return res.status(404).json({
//             success: false,
//             message: `User - ${id} not found!`
//         });
//     }
//     const updatedUsers = users.filter((each)=>each.id !== id);

//     res.status(202).json({
//         success: true,
//         message: `User - ${id} removed successfully!`,
//         data: updatedUsers
//     });
// });

exports.DeleteUserByTheirId=async (req,res) =>{
    const {id}=req.params;
    const user = await UserModel.findById(id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: `User - ${id} not found!`
        });
    }

    await UserModel.findByIdAndDelete(id)

    const getUsers=await UserModel.find();

    res.status(200).json({
        success: true,
        message: "User removed successfully!",
        UsersList: getUsers
    });
}

// router.get("/subscription-details/:id", (req, res)=>{
//     const {id}=req.params;

//     const user=users.find((each)=>each.id===id);

//     if(!user){
//         return res.status(404).json({
//             success: false,
//             message:`User - ${id} not found!`
//         });
//     }
//     //Extract the subscription details
//     const getDateInDays = (data="")=>{
//         let date;
//         if(data){
//             date = new Date(data);
//         }
//         else{
//             date=new Date();
//         }
//     }

//     const subscriptionType=(date)=>{
//         if(user.subscriptionType==="Basic"){
//             date=date+90;
//         }
//         else if(user.subscriptionType==="Standard"){
//             date=date+180;
//         }
//         else if(user.subscriptionType==="Premium"){
//             date=date+365;
//         }
//         return Date;
//     }


//     let returnDate=getDateInDays(user.returnDate);
//     let currentDate = getDateInDays();
//     let subscriptionDate = getDateInDays(user.SubscriptionDate);
//     let subscriptionExpiration = subscriptionType(subscriptionDate);

//     const data={
//         ...user,
//         subscriptionExpired: subscriptionExpiration<currentDate,
//         subscriptionDaysLeft: subscriptionExpiration-currentDate,
//         daysLeftForExpiration: returnDate-currentDate,
//         returnDate: returnDate<currentDate? "Book is Overdue":returnDate,
//         fine: returnDate<currentDate ? subscriptionExpiration<=currentDate ? 200 : 100 : 0
//     }
//     res.status(200).json({
//         success: true,
//         data
//     })
// });

exports.subscriptionDetailsById = async (req, res)=>{
    const {id} = req.params;
    const user=await UserModel.findById(id);

    if(!user){
        return res.status(404).json({
            success:false,
            message: `User - ${id} not found!`
        });
    }

    //Extract the subscription details
    const getDateInDays = (data="")=>{
        let date;
        if(data){
            date = new Date(data);
        }
        else{
            date=new Date();
        }
        return Math.floor(date/(1000 * 60 * 60 * 24));
    }

    const subscriptionType=(date)=>{
        if(user.SubscriptionType==="Basic"){
            date=date+90;
        }
        else if(user.SubscriptionType==="Standard"){
            date=date+180;
        }
        else if(user.SubscriptionType==="Premium"){
            date=date+365;
        }
        return date;
    }

    let returnDate=getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.SubscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data={
        ...user,
        subscriptionExpired: subscriptionExpiration<currentDate,
        subscriptionDaysLeft: subscriptionExpiration-currentDate,
        daysLeftForExpiration: returnDate-currentDate,
        returnDate: returnDate<currentDate? "Book is Overdue":returnDate,
        fine: returnDate<currentDate ? subscriptionExpiration<=currentDate ? 200 : 100 : 0
    }
    res.status(200).json({
        success: true,
        data
    })

}