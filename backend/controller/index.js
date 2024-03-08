import User from "../schema/index.js";
import Hash from "../hash/index.js"
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
    const { name, email, password,course,gender,image, designation,mobile } = req.body;
    try {
        const Exuser = await User.findOne({email:email});
        if(Exuser){
            return res.status(400).json({message:"User already exist"});
        }
        else{
            const user = new User({
                name,
                email,
                password: await Hash.hashpassword(password),
                course,
                mobile,
                gender,
                image,
                designation
        });
        const result = await user.save();
        res.status(201).json({ message: "User created successfully" });
    }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const result = await Hash.hashValidater(password, user.password);
        if (result) {
            const token = jwt.sign({ email: user.email, id: user._id }, "TOKENHIDDEN", { expiresIn: "1h" });
            res.status(200).json({ message: "User login successfully", token: token});
        } else {
            res.status(400).json({ message: "Password not match" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getallemp = async (req,res) =>{
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteemp = async (req,res)=>{
    try {
        // let id = req.body
        await User.findByIdAndDelete({_id:req.body.id});
        res.status(200).json({message:"User deleted"});
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
}

const updateemp = async (req,res)=>{
    try {
        let id = req.params.id;
        let user = await User.findByIdAndUpdate({_id:req.query.id},{$set:req.body},{new:true}); 
        res.status(200).json({message:"User updated"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getoneuser = async (req,res)=>{
    try {
        let user = await User.findById({_id:req.query.id}).select("-password");
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export default { createUser, loginUser, getallemp, deleteemp, updateemp , getoneuser}