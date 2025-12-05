const express=require("express");
const users = require("../data/users.json");

const router=express.Router();
/**
 * Route: '/users'
 * method: GET
 * Descriptions: Get all the list of users from the system
 * Acess: public
 * Parameters: none
 */

router.get("/",(req, res)=>{
    res.status(200).json({
        success: true,
        userList: users
    });
});

/**
 * Route: '/users/:id'
 * method: GET
 * Descriptions: Get User by their ID.
 * Acess: public
 * Parameters: id
 */

router.get("/:id",(req, res)=>{

    const {id}=req.params;
    const user=users.find((each)=>each.id===id)

    if(!user){
        return res.status(404).json({
            success:false,
            message: `User - ${id} not found!`
        });
    }
    res.status(200).json({
        success:true,
        data:user
    });
});

/**
 * Route: '/users'
 * method: POST
 * Descriptions: Create/register user by their ID
 * Acess: public
 * Parameters: None
 */

router.post("/",(req, res)=>{

const {id, name, email,age, role, isActive, address, registeredAt} = req.body;

if(!id || !name || !email || !age || !role || !isActive || !address || !registeredAt){
    return res.status(404).json({
        success: false,
        message: "Please provide details for all the fields."
    });
}

const user = users.find((each)=>each.id===id);

if(user){
    return res.status(409).json({
        success: false,
        message: `User - ${id} already exists!`
    });
}

users.push({
    id,
    name,
    email,
    age,
    role,
    isActive,
    address,
    registeredAt
})

res.status(201).json({
    success:true,
    message: `User - ${id} added succesfully`
})

});

/**
 * Route: '/users/:id'
 * method: PUT
 * Descriptions: Updating user by their ID
 * Acess: public
 * Parameters: id
 */

router.put("/:id", (req,res)=>{
    const {id}=req.params;
    const user=users.find((each)=>each.id===id);

    const {data}=req.body;

    if(!user){
        return res.status(404).json({
            success: false,
            message:`User - ${id} does not exists!`
        });
    }

    const UpdatedUser = users.map((item)=>{
        if(item.id===id){
            return {
                ...item,
                ...data
            };
        }
            return item;
    })

    res.status(200).json({
        success: true,
        message:`User ${id} updated succesfully!`,
        data: UpdatedUser
    });
});

/**
 * Route: '/users/:id'
 * method: DELETE
 * Descriptions: Deleting user by their ID
 * Acess: public
 * Parameters: id
 */

router.delete("/:id",(req,res)=>{
    const {id}=req.params;
    const user=users.find((each)=>each.id===id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: `User - ${id} not found!`
        });
    }
    const updatedUsers = users.filter((each)=>each.id !== id);

    res.status(202).json({
        success: true,
        message: `User - ${id} removed successfully!`,
        data: updatedUsers
    });
});

module.exports=router;