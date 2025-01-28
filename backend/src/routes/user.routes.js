import { Router } from "express";
import { getAllIncidents } from "../controllers/fetchIncidents.controller.js";
import { upload } from "../middlewars/multer.middleware.js";

import   generateAndStore from "../controllers/model.controller.js";
import { grievanceRegister, testingControl,sendMail } from "../controllers/registerGrievance.controller.js";
import { processGrievances } from "../controllers/processAndForwardToAdmin.controller.js";
const router = Router();




router.route("/grievanceRegister").post(upload.single("attachment"), grievanceRegister);
router.route("/sendMail").post(sendMail);
router.route("/generateAndStoreIncident").post(generateAndStore);
router.route("/getAllIncidents").get(getAllIncidents);


import { deleteEmployee, addEmployee, getEmployees } from "../controllers/adminEmployee.controller.js";
router.route("/test").get(testingControl);
router.route("/p").get(processGrievances);
router.route("/addNewStaff").post(addEmployee);
router.route("/getEmployees").get(getEmployees);
router.route("/delete/:id").post(deleteEmployee);
export default router;
