import mongoose , { Schema } from "mongoose";
const complaintSchema = new Schema({
  ID: {
    type: String,
    required: true,
    unique: true
  },
  Type: {
    type: String,
    required: true
  },
  Status: {
    type: String,
    enum: ['Open', 'In Progress', 'Closed'],
    default: 'Open'
  },
  Severity: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true
  },
  Date: {
    type: Date,
    default: Date.now
  },
  Description: {
    type: String,
    required: true
  },
  AssignedStaff: {
    type: String
  }
});

export const Complaint = mongoose.model('Complaint', complaintSchema);
