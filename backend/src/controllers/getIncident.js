import { Incident } from "../models/systemComplaint.js";
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
export {getAllIncidents} 