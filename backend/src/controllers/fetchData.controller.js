import { Incident } from "../models/systemComplaint.js";
import {employee} from "../models/employee.model.js"
async function getAllIncidents(req,res) {
    console.log("getAllIncidents");
    try {
        const allIncidents = await Incident.find();
        return res.status(200).json({ allIncidents });
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function fetchStaffDetails(req,res) {
    console.log("getAllStaff");
    try {
        const allStaff = await employee.find();
        return res.status(200).json( {allStaff} );
    } catch (err) {
        console.error(err);
        return null;
    }
    
}
export {getAllIncidents,fetchStaffDetails} 