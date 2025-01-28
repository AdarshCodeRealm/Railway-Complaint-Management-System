import mongoose , { Schema } from "mongoose";

const processGrievanceSchema = new Schema({
    grievance: {
        type: Object,
        ref: 'grievance',
        required: true
    },
    geminiResponse: {
        type: Object,
        required: true
    },
    trainDetails: {
        type: Object,
        required: true
    },
    assignedStaff: {
        type: Object,
        default: null
    }
 
});

export const processGrievance = mongoose.model('processGrievance', processGrievanceSchema);
 