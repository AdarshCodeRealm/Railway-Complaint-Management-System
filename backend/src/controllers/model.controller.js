import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  import { GoogleAIFileManager } from "@google/generative-ai/server";
  import { textextraction } from "../utils/model/text.js";
  
  const apiKey = "AIzaSyAlMnfSJArVX8z9iBeNGayWomUxFR3ce1c";
  const genAI = new GoogleGenerativeAI(apiKey);
  const fileManager = new GoogleAIFileManager(apiKey);
  
  
  async function uploadToGemini(path, mimeType) {
    const uploadResult = await fileManager.uploadFile(path, {
      mimeType,
      displayName: path,
    });
    const file = uploadResult.file;
    console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
    return file;
  }
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
//   const audiototext = async(req,res)=> {
//     const location = req.file.path;
//     console.log(location);
//     const files = [
//       await uploadToGemini("src/controllers/trial.mp3", "audio/mp3"),
//       await uploadToGemini("src/controllers/test.mp3", "audio/mp3"),
//       await uploadToGemini(location,"audio/mp3")
//     ];
  

//     const parts = [
//       {text: "input: "},
//       {
//         fileData: {
//           mimeType: files[0].mimeType,
//           fileUri: files[0].uri,
//         },
//       },
//       {text: "output: The washroom is very unclean please clean it up"},
//       {text: "input: "},
//       {
//         fileData: {
//           mimeType: files[1].mimeType,
//           fileUri: files[1].uri,
//         },
//       },
//       {text: "output: Hello how are you doing I am fine How are you Hey"},
//       {text: "input: "},
//       {
//         fileData: {
//           mimeType: files[2].mimeType,
//           fileUri: files[2].uri,
//         },
//       },
//       {text: "output: "},
//     ];
  
//     const result = await model.generateContent({
//       contents: [{ role: "user", parts }],
//       generationConfig,
//     });
    
//     // console.log(result.response.text());
//     const jsonResponse = {
//         text : result.response.text(),
//         files: files.map(file => ({
//             displayName: file.displayName,
//             uri: file.uri,
//             mimeType: file.mimeType,
//         }))};
    
//     console.log(jsonResponse)
//     return jsonResponse
    

// }


let filesUploaded = false;
let uploadedFiles = [];

const audiototext = async (req, res) => {
  const location = req.file.path;
  console.log(location);

  // Check if the files have been uploaded already
  if (!filesUploaded) {
    // Upload the initial files
    uploadedFiles = [
      await uploadToGemini("src/controllers/trial.mp3", "audio/mp3"),
      await uploadToGemini("src/controllers/test.mp3", "audio/mp3"),
    ];
    filesUploaded = true; // Set the flag to true after uploading
  }

  // Upload the new file from the request
  const newFile = await uploadToGemini(location, "audio/mp3");
  uploadedFiles.push(newFile); // Add the new file to the uploaded files array

  const parts = [
    { text: "input: " },
    {
      fileData: {
        mimeType: uploadedFiles[0].mimeType,
        fileUri: uploadedFiles[0].uri,
      },
    },
    { text: "output: The washroom is very unclean please clean it up" },
    { text: "input: " },
    {
      fileData: {
        mimeType: uploadedFiles[1].mimeType,
        fileUri: uploadedFiles[1].uri,
      },
    },
    { text: "output: Hello how are you doing I am fine How are you Hey" },
    { text: "input: " },
    {
      fileData: {
        mimeType: newFile.mimeType,
        fileUri: newFile.uri,
      },
    },
    { text: "output: " },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
  });

  const jsonResponse = {
    text: result.response.text(),
    files: uploadedFiles.map(file => ({
      displayName: file.displayName,
      uri: file.uri,
      mimeType: file.mimeType,
    })),
  };

  const message = textextraction(result.response.text());
  // console.log(jsonResponse);
  return jsonResponse;
};


export { audiototext 
         
};


//   const  lo = "src/controllers/trail.mp3"
//   audiototext(lo)
  

