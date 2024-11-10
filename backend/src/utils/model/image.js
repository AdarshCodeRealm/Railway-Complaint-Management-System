import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  import { GoogleAIFileManager } from "@google/generative-ai/server";
  
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
  

  let filesUploaded = false;
  let uploadedFiles = [];

    const imagetotext = async(req,res) =>{
        const location = req.file.path;
        console.log(location);

  
    if (!filesUploaded) {
        // Upload the initial files
        uploadedFiles = [
            await uploadToGemini("src/utils/model/9.png", "image/png"),
            await uploadToGemini("src/utils/model/10.png", "image/png"),
            await uploadToGemini("src/utils/model/7.png", "image/png"),
            await uploadToGemini("src/utils/model/8.png", "image/png"),
            await uploadToGemini("src/utils/model/2.png", "image/png"),
            await uploadToGemini("src/utils/model/4.png", "image/png"),
        ];
        filesUploaded = true; // Set the flag to true after uploading
      }
    
      // Upload the new file from the request
      const newFile = await uploadToGemini(location, "image/png");
      uploadedFiles.push(newFile); // Add the new file to the uploaded files array

    const parts = [
      {text: "input: "},
      {
        fileData: {
          mimeType: uploadedFiles[0].mimeType,
          fileUri: uploadedFiles[0].uri,
        },
      },
      {text: "output: item : train seat\ncategory : management"},
      {text: "input: "},
      {
        fileData: {
          mimeType: uploadedFiles[1].mimeType,
          fileUri: uploadedFiles[1].uri,
        },
      },
      {text: "output: item : train seat\ncategory : management"},
      {text: "input: "},
      {
        fileData: {
          mimeType: uploadedFiles[2].mimeType,
          fileUri: uploadedFiles[2].uri,
        },
      },
      {text: "output: item : train fan\ncategory: electricity"},
      {text: "input: "},
      {
        fileData: {
          mimeType: uploadedFiles[3].mimeType,
          fileUri: uploadedFiles[3].uri,
        },
      },
      {text: "output: item : train fan\ncategory : electricity"},
      {text: "input: "},
      {
        fileData: {
          mimeType: uploadedFiles[4].mimeType,
          fileUri: uploadedFiles[4].uri,
        },
      },
      {text: "output: item : train toilet\ncategory : cleanliness"},
      {text: "input: "},
      {
        fileData: {
          mimeType: uploadedFiles[5].mimeType,
          fileUri: uploadedFiles[5].uri,
        },
      },
      {text: "output: item : train toilet\ncategory : cleanliness"},
      {text: "input: "},
      {
        fileData: {
          mimeType: uploadedFiles[6].mimeType,
          fileUri: uploadedFiles[6].uri,
        },
      },
      {text: "output: "},
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
    
    console.log(jsonResponse);
    return jsonResponse;
  }



  export {
     imagetotext
  }