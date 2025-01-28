import mongoose from "mongoose";
const incidentSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    Severity: {
        type: String,
        required: true
    },
    Department: {
        type: String,
        required: true,
        enum: ['Train Operations', 'Commercial', 'Engineering', 'RPF', 'Passenger Amenities', 'IRCTC']
    },
    Description: {
        type: String,
        required: true
    },
    DateTime: {
        type: Date, 
        default: Date.now
    },
    Status: {
        type: String,
        required: true, 
        enum: ['Pending', 'Open', 'Closed']
    },
    ForwardedToHelpDesk: {
        type: Date
    },
    StaffAssigned: {
        type: {
            Staff: String,
            Time: Date
        }
    }
});

export  const Incident = mongoose.model('Incident', incidentSchema);

