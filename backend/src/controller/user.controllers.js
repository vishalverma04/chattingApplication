import { asyncHander } from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js";
import mongoose from 'mongoose';

const options={
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
     }

const RegisterUser = asyncHander(async (req, res) => {
  try {
    const { fullName, email, mobile, password, description } = req.body;

    // Check required fields
    if (!fullName || !email || !mobile || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if email or mobile already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Email or mobile already registered' });
    }

    // Create new user
    const user = await User.create({
      fullName,
      email,
      mobile,
      password,
      description,
    });

    // Generate token
    const token = user.generateAccessToken();

    // Remove password before sending response
    const { password: _, ...userData } = user.toObject();

    // Send response
    res.status(201).cookie("token", token, options).json({
      success: true,
      message: 'User registered successfully',
      user: userData,
      token,
    });

  } catch (error) {
    console.error('Register Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

const LoginUser = asyncHander(async (req, res) => {
  const {email,password}=req.body
  
   try {
    
    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    
    const user=await User.findOne({email})
    
    if(!user){
        return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid=await user.isPasswordCorrect(password)
  
    if(!isPasswordValid){
        return res.status(401).json({ message: 'Invalid password' });
    }
  
    const jwttoken = user.generateAccessToken();
 
    const loggedInUser={
       fullName:user.fullName,
       email:user.email,
       userId:user._id,
       mobileNumber:user.mobileNumber,
       joinDate:user.createdAt.toISOString().split('T')[0]
    }
  
     
     //send response
        res.status(200).cookie("token",jwttoken,options).json({
        success:true,
        message:"user logged in successfully",
        user:loggedInUser,
        token:jwttoken
        });

   } catch (error) {
        res.status(error.statusCode).json({ message: error.message });
   } 
 });

 const getAllUsers = asyncHander(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error('Get All Users Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

const searchedUsers = asyncHander(async (req, res) => {
  const { search } = req.query;
    try {
        if (!search) {
        return res.status(400).json({ message: 'Search query is required' });
        }
    
        const users = await User.find({
        $or: [
            { fullName: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
        ],
        });
    
        res.status(200).json({
        success: true,
        users,
        });
    } catch (error) {
        console.error('Search Users Error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
}
);


export { 
    RegisterUser, 
    LoginUser,
    getAllUsers,
    searchedUsers
};