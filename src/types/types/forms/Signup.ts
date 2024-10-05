import mongoose from "mongoose";

interface ISignup {
  email: string,
  password: string,
};

interface ISignupFromDB extends mongoose.Document {
  email: string,
  password: string,
}

export type {
  ISignup,
  ISignupFromDB
};