import { Router } from "express";

const router = Router();
import { verifyCode, sendOTP } from "../improvement/twilio.controller.js";
router.route("/verifyotp").get(verifyCode);
router.route("/sendotp").post(sendOTP);





export default router;