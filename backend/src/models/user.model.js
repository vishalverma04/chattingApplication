import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema=new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' // default avatar URL
  },
},{timestamps:true})

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();
  this.password=await bcrypt.hash(this.password,10)
  next()  
})

userSchema.methods.isPasswordCorrect= async function(password){
return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=function(){
    return  jwt.sign(
          {
              _id:this._id,
              email:this.email,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
              expiresIn:process.env.ACCESS_TOKEN_EXPIRY
          }
      )
  }

const User=mongoose.model("User",userSchema)
export {User}
