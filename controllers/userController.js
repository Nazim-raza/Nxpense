import userModel from "../models/userModel.js";

export const createUserController = async(req, res)=>{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
       return res.status(400).json("Please fill all details");
    }

    try {
        //create user instance
        const user = await userModel.create(req.body);

        //save user to the database
        await user.save();

        // Respond with the created user
        res.status(201).json({
            user
        });

    } catch (error) {
        console.log({message: "Error in creating user", error})
        res.status(500).json( {message: "server error", error})
    }
};

//Get All users
export const getAllUsersController = async(req, res) =>{

    try {
        const users = await userModel.find({});

    res.status(200).send({
        success: true,
        message: "All Users",
        users
    })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in getting users",
            error: error.message
        })
    }
    

}

//getUserById
export const getUserById = async(req,res)=>{
    const user = await userModel.findById(req.params.id);

    res.status(201).send({
        success: true,
        message: "User found",
        user
    })
}