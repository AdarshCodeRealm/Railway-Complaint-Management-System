import mongoose, { Schema } from "mongoose";
import { RailwayWorker } from "./worker.model.js";

const grievanceSchema = new Schema(
  {
    mobileNo: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
    },
    journeyDetails: {
      type: Object,
      required: true,
      properties: {
        pnrNo: {
          type: String,
          required: true,
        },
        type: {
          type: String,
        },
        subType: {
          type: String,
        },
        incidentDate: {
          type: Date,
        },
      },
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: RailwayWorker,
    },
    grievanceDescription: {
      type: String,
      required: true,
    },
    registerAt: {
      type: Date,
      default: Date.now(),
    },
    attachment: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'resolved'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export const Grievance = mongoose.model("Grievance", grievanceSchema);