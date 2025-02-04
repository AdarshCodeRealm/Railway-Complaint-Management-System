import { Router } from "express";
import { getAllIncidents } from "../controllers/getIncident.js";
import {
  changeAvatar,
  changeCoverImage,
  changePassword,
  forgetPasword,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  verifyOTP,
} from "../controllers/user.controller.js";
import { upload } from "../middlewars/multer.middleware.js";
import { verifyJWT } from "../middlewars/auth.middleware.js";
import   generateAndStore from "../controllers/model.controller.js";
import { grievanceRegister, testingControl,sendMail } from "../controllers/register.controller.js";
import { processGrievances } from "../controllers/processGrievances/process.controller.js";
const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router
  .route("/update-avatar")
  .post(verifyJWT, upload.single("avatar"), changeAvatar);
router
  .route("/update-coverImage")
  .post(verifyJWT, upload.single("coverImage"), changeCoverImage);
router.route("/update-password").post(verifyJWT, changePassword);
router.route("/forget-password").post(forgetPasword);
router.route("/sended/:email").post(verifyOTP);
// router.route("/audio").post(upload.single("location"), audiototext);


router.route("/grievanceRegister").post(upload.single("attachment"), grievanceRegister);
router.route("/sendMail").post(sendMail);
router.route("/generateAndStoreIncident").post(generateAndStore);
router.route("/getAllIncidents").get(getAllIncidents);


import { deleteEmployee, addEmployee, getEmployees } from "../controllers/employee.controller.js";
router.route("/test").get(testingControl);
router.route("/p").get(processGrievances);
router.route("/addNewStaff").post(addEmployee);
router.route("/getEmployees").get(getEmployees);
router.route("/delete/:id").post(deleteEmployee);
export default router;
