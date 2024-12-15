import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
const apiKey = "AIzaSyAlMnfSJArVX8z9iBeNGayWomUxFR3ce1c";
const genAI = new GoogleGenerativeAI(apiKey);

const schema = {
  description: "List of incidents",
  type: SchemaType.OBJECT,
  properties: {
    ID: {
      type: SchemaType.STRING,
      description: "Unique identifier for the incident",
      nullable: false,
    },
    Type: {
      type: SchemaType.STRING,
      description: "Category of the incident",
      nullable: false,
    },
    Severity: {
      type: SchemaType.STRING,
      description: "Level of urgency for the incident",
      nullable: false,
    },
    Department: {
      type: SchemaType.STRING,
      description: "Department responsible for handling the incident, ",
      nullable: false,
      enum: [
        "Train Operations",
        "Commercial",
        "Engineering",
        "RPF",
        "Passenger Amenities",
        "IRCTC",
      ],
    },

    Description: {
      type: SchemaType.STRING,
      description: "Detailed description of the incident ",
      nullable: false,
    },
  },
  required: ["ID", "Type", "Severity", "Description", "Department"],
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
});

import { Incident } from "../models/systemComplaint.js";

export async function generateAndStoreIncident(req, res) {
  try {
    const result = await model.generateContent(req.body.description);
    const parsedResult = JSON.parse(result.response.text());
    console.log(parsedResult);
    const incidentData = {
      ID: parsedResult.ID || Math.random().toString(36).substr(2, 9),
      Type: parsedResult.Type || "Unknown",
      Severity: parsedResult.Severity || "Low",
      Department: parsedResult.Department || "Train Operations",
      Description: parsedResult.Description || "",
      Status: "Pending",
    };

    const incident = new Incident(incidentData);
    await incident.save();

    console.log("Incident stored successfully:", incident._id);
    return res.status(200).json({ incident });
  } catch (error) {
    console.error("Error generating or storing incident:", error);
    throw error;
  }
}

export default generateAndStoreIncident;
