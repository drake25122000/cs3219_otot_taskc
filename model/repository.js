import UserModel from "./user-model.js";
import "dotenv/config";

import mongoose from "mongoose";

let mongoDB =
  process.env.ENV == "PROD"
    ? process.env.DB_CLOUD_URI
    : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Successfully connected to MongoDB"));

export async function getAllUser() {
  return await UserModel.find({}, "username email");
}

// CREATE FUNCTION
export async function createUser(params) {
  return await UserModel.create({
    username: params.username,
    email: params.email,
    password: params.password
  });
}

// READ FUNCTION
export async function getUser(params) {
    const user = await UserModel.findOne({ username: params.username }, "username email");
    return user;
}

export async function changeEmail(params) {
    const user = await UserModel.findOne({ username: params.username});
    if (user) {
        const updated = await UserModel.updateOne(
            { username: params.username },
            { $set: { email: params.newEmail } }
        );
        return updated;
    }
}

// DELETE FUNCTION
export async function deleteUser(username) {
  const user = await UserModel.findOne({ username: username });
  if (user) {
    const deleted = await UserModel.deleteOne({ username: username });
    return deleted.acknowledged;
  }
}