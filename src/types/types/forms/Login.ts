import mongoose from "mongoose";

interface ILogin {
  email: string,
  password: string,
};

interface ILoginFromDB extends mongoose.Document {
  email: string,
  password: string,
}

export type {
  ILogin,
  ILoginFromDB
};