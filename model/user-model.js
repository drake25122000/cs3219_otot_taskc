import mongoose from "mongoose";

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
  }
});

export default mongoose.model("User_Model", UserModelSchema);