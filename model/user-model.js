import mongoose from "mongoose";
import bcrypt from "bcrypt";

var Schema = mongoose.Schema;
let UserModelSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type:String,
    required: true,
  },
  role : {
    type:String,
    required:true,
    default: "user",
    enum: ["admin", "user"]
  }
});

UserModelSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model("User_Model", UserModelSchema);