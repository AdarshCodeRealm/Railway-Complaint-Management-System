import { Router } from "express";
import {fetchStaffDetails} from "../controllers/fetchData.controller.js";
import { checkOpenGrievances } from "../controllers/processAndForwardToAdmin.controller.js";
const router = Router();


router.route("/checkOpenGrievances").get(checkOpenGrievances);
router.route("/fetchAllStaff").get(fetchStaffDetails);




export default router;