import mongoose, { Schema } from "mongoose";

const workerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 15,
    },
    avatar: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    stationRef: {
        //location
        type: Schema.Types.ObjectId,
        ref: "Station",
        
    },
    workingTime: {
      type: String,
      enum: ["morning", "evening", "night"],
      required: true,
    },
    workingStatus: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
      required: true,
    },
    yearsOfExperience: {
      type: Number,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

export const RailwayWorker = mongoose.model("RailwayWorker", workerSchema);
