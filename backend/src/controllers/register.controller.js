import { Grievance } from "../models/grievance.model.js";
import { uploadfile } from "../utils/cloudinary.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "adarshramgirwar1@gmail.com",
    pass: "mcfvcldbhfttmlln",
  },
});
async function sendMail(grievanceId = 100, grievantName = "user") {
  try {
    const info = await transporter.sendMail({
      from: '"RailMadad complaint management" <adarshramgirwar1@gmail.com>',
      to: "mirza54727@gmail.com",
      subject: " Your Grievance has been Registered Successfully.",
      text: `
      Dear ${grievantName},<br><br>
      We acknowledge the receipt of your grievance with reference number ${grievanceId}.<br><br>
      Your concern has been duly noted and is currently under review. We are committed to resolving your issue promptly and efficiently.<br><br>
      You may track the status of your grievance by visiting our website or contacting our customer service department at [Customer Service Contact Information].<br><br>
      Thank you for bringing this matter to your attention.<br><br>
      Sincerely,<br>
      [Your Organization's Name]<br>
      [Your Organization's Address]<br>
      [Your Organization's Contact Information]
      `,
      html: `
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.2;
    }
    p {
      margin: 5px 0;
    }
  </style>
  
  <p>Dear ${grievantName},<br>
  We acknowledge the receipt of your grievance with reference number <b>#${grievanceId}</b>, Your concern has been duly noted and is currently under review. We are committed to resolving your issue promptly and efficiently. You may track the status of your grievance by visiting our website or contacting our customer service department number 139.<br/>Thank you for bringing this matter to your attention.</p>
  <p>Sincerely,<br/>RailMadad,<br/>Indian Railways Complaints & Suggestion Portal<br/>railmadad.indianrailways.gov.in</p>
`,
    });
    console.log("Message sent: %s", info);
    return info;
  } catch (error) {
    console.error("failed to send message : ", error);
    throw error;
  }
}
const grievanceRegister = async (req, res) => {
  try {
    console.log(req.body);
    let attachmentUrl = null;
    if (req.file && req.file.path) {
      const attachmentPath = req.file.path;
      attachmentUrl = await uploadfile(attachmentPath);
    }

    const requiredFields = [
      "mobileNo",
      "journeyDetails",
      "grievanceDescription",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const newGrievance = new Grievance({
      mobileNo: req.body.mobileNo,
      journeyDetails: req.body.journeyDetails,
      grievanceDescription: req.body.grievanceDescription,
    });
    if (attachmentUrl != null) {
      newGrievance.attachment = attachmentUrl.url;
    }
    const savedGrievance = await newGrievance.save();
    const nodeMailerInfo = await sendMail(savedGrievance._id);
    return res.status(201).json({
      message: "Grievance saved successfully!",
      data: savedGrievance,
      hasAttachment: !!attachmentUrl,
      nodeMailerInfo: {
        envelop: nodeMailerInfo.envelope,
        id: nodeMailerInfo.messageId,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "registration failed.", error: err });
  }
};
const testingControl = async (req, res) => {
  console.log("testing control");
  return res.status(200).json({ message: "testing control" });
};

export { grievanceRegister, sendMail ,testingControl};
