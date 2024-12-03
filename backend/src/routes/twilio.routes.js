import { Router } from "express";
import twilio from "twilio";
const router = Router();
import { verifyCode, sendOTP } from "../controllers/twilio.controller.js";
router.route("/verifyotp").get(verifyCode);
router.route("/sendotp").post(sendOTP);





export default router;