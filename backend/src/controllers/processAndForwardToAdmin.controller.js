import { Grievance } from "../models/grievance.model.js";
import { Complaint } from "../models/complaint.model.js";

async function processGrievances(req, res) {
  try {
    const grievances = await Grievance.find({ status: "pending" });
    return res.status(200).json({ grievances });
  } catch (error) {
    console.error("Error fetching grievances:", error);
    throw error;
  }
}

async function addDummyComplaints() {
  try {
    const dummyComplaints = [
      {
        ID: "CMP001",
        Type: "Track Delay",
        Status: "Open",
        Severity: "Medium",
        Date: new Date(),
        Description: "Train delayed due to signal failure",
        AssignedStaff: "John Doe",
      },
      {
        ID: "CMP002",
        Type: "Luggage Loss",
        Status: "In Progress",
        Severity: "High",
        Date: new Date(),
        Description: "Passenger lost luggage during transit",
        AssignedStaff: "Jane Smith",
      },
      {
        ID: "CMP003",
        Type: "Food Quality Issue",
        Status: "Closed",
        Severity: "Low",
        Date: new Date(),
        Description: "Passenger complained about cold food",
        AssignedStaff: "Bob Johnson",
      },
    ];

    const insertedComplaints = await Complaint.create(dummyComplaints);
    console.log(`Inserted ${insertedComplaints.length} dummy complaints`);
    console.log(insertedComplaints);
  } catch (error) {
    console.error("Error inserting dummy complaints:", error);
    throw error;
  }
}

import { fetchGeminiResponse } from "./model.controller.js";
import { fetchPNR } from "../utils/fetchPNR.js";
import { processGrievance } from "../models/processedGrievance.model.js";
import { fetchStaffDetails } from "./fetchData.controller.js";
import { employee } from "../models/employee.model.js";
async function checkOpenGrievances() {
  try {
    let openGrievancearr = (await Grievance.find()).filter(
      (grievance) => grievance.openGrievance === true
    );
    const fetchWorker = await employee.find();
    for (let i = 0; i < openGrievancearr.length; i++) {
      const grievance = openGrievancearr[i];
      const geminiResponse = await fetchGeminiResponse(
        grievance.grievanceDescription,
        grievance.attachment
      );
      const trainDetails = await fetchPNR("9531575878");
      
     
      await processGrievance.create({
        grievance,
        geminiResponse,
        trainDetails,
        assignedStaff: fetchWorker[Math.floor(Math.random() * 11)],
      });
      await grievance.updateOne({ openGrievance: false });
      console.log("grievance ID : " + grievance._id + " processed");
    }
  } catch (error) {
    console.error("Error checking open grievances:", error);
  }
}

export { processGrievances, checkOpenGrievances };
