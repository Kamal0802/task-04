import userModel from "../models/user.model.mjs";

import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";



const RegisterUser = async (req, res) => {
  try {
    console.log(req.body);

    let boyProfile=`https://avatar.iran.liara.run/public/boy?userName=${req.body.userName}`

     let girlProfile=`https://avatar.iran.liara.run/public/girl?userName=${req.body.userName}`

    let newUser={
      userName:req.body.userName,
      password:req.body.password,
      gender:req.body.gender,
      profilePic: req.body.gender == "male"?boyProfile:girlProfile,
      bio:req.body.bio

    }

    let user = await userModel.create(newUser);

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    res.status(201).json({
      status: "user Created",
      token,
      userName: user.userName,
      id:user._id
    });
  } catch (error) {
    console.error(error);

    res.status(500).json(error);
  }
};

const Login = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await userModel.findOne({ userName });

    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const payload = { user: { id: user.id } };

    jwt.sign(payload, "secretToken", { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;

      res.json({
        status: "user login successfully",
        userName: user.userName,
        token,
        id:user._id
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");

    res.json(user);
  } catch (error) {
    console.error(error.message);

    res.status(500).send(error.message);
  }
};

const userForSideBar=async (req,res)=>{

  try {
    
    const {id}=req.user;
    const Filterduser=await userModel.find({_id:{$ne:id}});
    res.status(200).json(Filterduser)
  } catch (error) {
    console.error(error.message);

    res.status(500).send(error.message);
  }
}

const getUserById = async (req,res)=>{

  try {
    
    const id = req.params.id;
    const user = await userModel.findById(id).select("-password")

    if(!user)
      res.status(400).json({messege:"user not found"})

    res.status(200).json(user)
  } catch (error) {
    console.error(error.message);

    res.status(400).send(error.message);
  }
}

export default { RegisterUser, Login, getProfile,userForSideBar,getUserById };
