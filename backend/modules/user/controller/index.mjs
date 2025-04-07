import bcrypt from "bcrypt";
import Model from "../models/index.mjs";
import { ENV } from "../../../constant/index.mjs";
import jwt from 'jsonwebtoken';
import userSchema from "../schema/user.mjs";
import chalk from "chalk";

// ---------create user--------------
const createUser = async (req, res) => {
  console.log(chalk.bgCyan("incoming call to signup api"));
  if (!req.body) {
    return req.status(400).json({ message: "Bad request"});
  }
  try {
    const user = await userSchema.validateAsync(req.body);
    const password = await bcrypt.hash(user.password, 10);
    const newUser = await Model.create({ ...user, password: password });
    await newUser.save();
    const data = newUser.toObject();
    const token = jwt.sign({ email: user.email }, ENV.JWT_SCRET, { expiresIn: '1h' });
    res.status(201).json({message: "User created successfully", user:data, token});
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({
        message: "Duplicate email - Email already exists",
        error
      });
    }
    console.error(chalk.bgRed("Signup Error:"), error);
    res.status(500).json({
      message: "Internal Server Error",
      error
    });
  }
};

// ---------get all users--------------
const getAllUsers = async (req, res) => {
  try {
    const users = await Model.find();
    res.json(users)
  } catch (err) {
    res.status(400).json({ error: err, status: 400 });
  }
};

// -------delete user-----------
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Model.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err, status: 400 });
  }
};

// -------------update user ----------------
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    let user = await Model.findById(id);
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    user = await Model.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ status: 200, message: "User updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: 400, message: "Failed to update user", error: err });
  }
};


// ---------login user--------------
const login = async (req, res) => {
  try{  
    const {email,password} = req.body;
    const user = await Model.findOne({email});
    if(user){
    const checkPassword = bcrypt.compareSync(password,user.password);
    console.log(`password-->${password}   oldpassword-->${user.password}`);
    if(checkPassword){
        const token = jwt.sign({ email: user.email }, ENV.JWT_SCRET, { expiresIn: '1h' });
        res.status(200).json({ status: 200, message: "Login Successfull", user, token });
      } else {
        res.status(401).json({ status: 401, message: "Incorrect Password" });
      }
    } else {
      res.status(404).json({ status: 404, message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err, status: 400 });
  }
};

export {
  login,
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
};


// -------------getLoggedInUser------------
// const getLoggedInUser = async (req, res) => {
//   try {

//     const {userId}= req.user
//     // The tokenVerification middleware already decodes the token and attaches the user's email to `req.user`
//     const user = await Model.findById(userId)

//     if (!user) {
//       return res.status(404).json({ status: 404, message: "User not found" });
//     }

//     res.status(200).json({ status: 200, user });
//   } catch (error) {
//     console.error("Error fetching user details:", error);
//     res.status(500).json({
//       status: 500,
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };
// for admin

// export const isAdmin = async (req, res) => {
//   const { userId } = req.user;
//   const {role} = await User.findById(userId);
  
//   if(role !== "admin"){
//     console.log("❌ user is not an admin")
//    return  res.status(401).json({
//       success:false,
//       message:"❌ user is not an admin",
//       isAdmin :false
//     })
//   }
//   res.status(200).json({
//     success:true,
//     message:"✔ user is  an admin",
//     isAdmin :true
//   })
// console.log("✔ user is  an admin")
// };
