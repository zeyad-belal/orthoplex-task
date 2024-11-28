import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const { Schema } = mongoose;

const userSchema = new Schema({
  first_name:{
    type: String,
    required:true
  },
  last_name:{
    type: String,
    required:true
  },
  email:{
    type: String,
    required:true,
    unique:true
  },
  password:{
    type: String,
    required:true,
    select:false
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
})

//hashing password in  mongoose middleware before saving user in db(document middleware)
userSchema.pre('save', async function(){
  const currentUser = this;
  if(currentUser.isModified('password')){
    const hashedPassword = await bcrypt.hash(currentUser.password,10)
    currentUser.password = hashedPassword
  }
})


const User = mongoose.model('User',userSchema);
module.exports =User;
