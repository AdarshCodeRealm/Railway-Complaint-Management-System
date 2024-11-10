import { Router } from "express";
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
import { audiototext } from "../controllers/model.controller.js";
import { imagetotext } from "../utils/model/image.js";
import { grievanceRegister, testingControl } from "../controllers/register.controller.js";
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
router.route("/audio").post(upload.single("location"), audiototext);
router.route("/image").post(upload.single("location"), imagetotext);
router.route("/grievanceRegister").post(upload.single("attachment"), grievanceRegister);
router.route("/test").post(testingControl);
export default router;
