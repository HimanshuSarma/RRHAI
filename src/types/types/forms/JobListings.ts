import mongoose from "mongoose";

interface IJobListing {
  title: string,
  description: string,
  requirements: Array<string>,
  salary: number,
  location: string
};

interface IJobListingFromDB extends mongoose.Document {
  title: string,
  description: string,
  requirements: Array<string>,
  salary: number,
  location: string
}

export type {
  IJobListing,
  IJobListingFromDB
};