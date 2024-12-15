import { Schema ,mongoose} from "mongoose";
const employeeSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contact: {
    type: Number,
    required: true
  },
  shiftTiming: {
    type: String,
    required: true
  },
  request:{
    type: Number,
    default: 0
  },
  department: {
    type: String,
    enum: ['Railway Departments', 'Railway Staff'],
    default: 'Railway Departments'
  },
  role: {
    type: String,
    enum: ['Engineer', 'Conductor', 'Station Master', 'Ticket Inspector', 'Other'],
    default: 'Other'
  }
}, {
  timestamps: true
});
export const employee = mongoose.model('Employee', employeeSchema);