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
const ImgModel = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
});

import { Incident } from "../models/systemComplaint.js";

 async function generateAndStoreIncident(req, res) {
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



async function fetchGeminiResponse(prompt, url) {
  let imageResp;
  if (url) {
     imageResp = await fetch(url).then((response) =>
      response.arrayBuffer()
    );
  }
  try {
    const result1 = await ImgModel.generateContent([
      {
        inlineData: {
          data: Buffer.from(imageResp).toString("base64"),
          mimeType: "image/jpeg",
        },
      },
      `
  Analyze the provided image and generate a detailed report about the situation:

  1. Identify the primary issue or problem faced by train passengers.
  2. Determine the severity of the situation (e.g., minor inconvenience, significant disruption, life-threatening emergency).
  3. Describe specific experiences of the passengers.
  4. Estimate the number of people affected.
  5. Consider any safety implications.

  Structure your response as follows:

  1. Begin with a concise summary of the main issue.
  2. Provide 3-5 bullet points detailing specific aspects of the problem.
  3. Clearly state the severity level (e.g., Low, Moderate, High).
  4. Conclude with any recommended actions or next steps.

  Ensure your analysis is both comprehensive and concise. Use language suitable for communicating with anxious or concerned train passengers.
  `,
    ]);

    const combinedPrompt = `
    Analyze the following two prompts and generate a detailed report about passenger grievances on a train:
    
    1. First Prompt:
    ${prompt}
    
    2. Second Prompt:
    ${result1.response.text()}
    
    Instructions:
    1. Combine insights from both prompts.
    2. Identify the main passenger grievances based on these inputs.
    3. Determine the severity level of these grievances (e.g., minor inconvenience, significant disruption, life-threatening emergency).
    4. Suggest necessary components that could help identify and address the problems.
    5. Provide a clear summary of the combined analysis.
    
    Structure your response as follows:
    1. Start with a concise overview of the main passenger grievances.
    2. List 3-5 bullet points detailing specific aspects of the problems.
    3. Clearly state the severity level based on the combined analysis.
    4. Conclude with recommendations for addressing these grievances.
    
    Ensure your analysis is comprehensive yet concise. Use language suitable for communicating with train passengers who may be anxious or concerned about their situation.
    `;

    const result = await model.generateContent(combinedPrompt);
    const parsedResult = JSON.parse(result.response.text());
    return parsedResult;

  } catch (error) {
    return error;
  }
}

export { fetchGeminiResponse , generateAndStoreIncident} ; 
