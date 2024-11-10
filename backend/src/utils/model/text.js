
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiKey = "AIzaSyAlMnfSJArVX8z9iBeNGayWomUxFR3ce1c";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  const textextraction=async(req) => {
    const message = req
    console.log(message);
    const parts = [
      {text: "input: i am given you category you have to give output accourding to it only cleanliness,electricity,management,corruption"},
      {text: "input: the washroom is very unclean"},
      {text: "output: item : train toilet  category : cleanliness"},
      {text: "input: the washroom is dirty"},
      {text: "output: item : train toilet category : cleanliness"},
      {text: "input: fan is not working"},
      {text: "output: item : train fan  category : electricity"},
      {text: "input: switchboard is not working"},
      {text: "output: item : train fan   category : electricity"},
      {text: "input: seat was torn"},
      {text: "output: item : train seat   category : management"},
      {text: "input: i didn't get good food in pantry service"},
      {text: "output: item : train food   category : management"},
      {text: "input: the coach is unclean"},
      {text: "output: item : train coach    category : management"},
      {text: `input: ${message}`},
      {text: "output: "},
    ];
  
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });
    
    // const jsonResponse = {
    //     text: result.response.text(),
    //   };
    
    //   console.log(jsonResponse);
    //   return jsonResponse;

    const generatedText = result.response.text();

  // Use regex to extract item and category from the generated text
  const regex = /item : (.+?)\s+category : (.+)/;
  const match = generatedText.match(regex);

  let jsonResponse;

  if (match) {
    jsonResponse = {
      item: match[1].trim(),
      category: match[2].trim(),
    };
  } else {
    jsonResponse = {
      item: null,
      category: null,
      text: generatedText
    };
  }
  console.log(jsonResponse);
  return jsonResponse;
  }
  
export {
    textextraction
}

// const me = "Tc is taking the extra money for seat";
// textextraction(me)