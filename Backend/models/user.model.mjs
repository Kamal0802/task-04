import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Enter the user name"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Enter the password"],
  },
  gender:{
    type:String,
    required:true
  },
  profilePic: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
  },
},{timestamps:true});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
});

const userModel = mongoose.model("User", UserSchema);

export default userModel;
