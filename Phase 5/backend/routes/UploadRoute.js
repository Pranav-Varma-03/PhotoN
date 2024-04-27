const express = require('express');
const {Router} = require('express')
const UploadModel = require("../models/UploadModel");
const router = Router();
const bodyParser = require('body-parser');
const app = express();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
app.use(bodyParser.json())

const genAI = new GoogleGenerativeAI("AIzaSyBg2hgX3mnoh4vd0JqCTDnIqkFndNHc2hU");

async function run_text_tags(description) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const str2 = "' .Based on the text Given as input, generate the top 5 most significant keywords separated by spaces. Suppose if the tags of a text are 'girl', 'boy', 'teacher', 'class', 'bench' then the output must and should be only 'girl boy teacher class bench', the output shouldn't be like 'The best description of the text is: girl boy teacher class bench' and the output should not even be of the type 'The top 5 most significant keywords for this text are: girl boy teacher class bench', I only the response to just contains 5 words thats it. Guranteely ensure that the response message has only 5 words in it noting more nothing less I don't want any useless information I just want the 5 keywords separated with spaces that's it."
  const str1 = "Text for which Tags are to be generated: '" ;
  const prompt = str1 + description + str2 ;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  // console.log(text);
  return text
}

function fileToGenerativePart(base64, mimeType) {
  return {
    inlineData: {
      data: base64,
      mimeType
    },
  };
}

async function run_image_tags(base64, mimeType) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = "Based on the image, generate the top 5 most significant keywords separated by spaces. Suppose if the tags of an image are 'girl', 'boy', 'teacher', 'class', 'bench' then the output must and should be only 'girl boy teacher class bench', the output shouldn't be like 'The best description of the image is: girl boy teacher class bench' and the output should not even be of the type 'The top 5 most significant keywords for this image are: girl boy teacher class bench', I only the response to just contains 5 words thats it. Guranteely ensure that the response message has only 5 words in it noting more nothing less I don't want any useless information I just want the 5 keywords separated with spaces that's it.";

  const imageParts = [
    fileToGenerativePart(base64,mimeType), 
  ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const keywords = response.text().trim();
    console.log("Waiting for response")
    
    return response.text() ;
}

router.get("/api/getTagsPhotoSearch", async (req, res)=>{
  const searchText = req.query.search;
  // console.log(searchText) 
  const response = await run_text_tags(searchText)
  // console.log(response)

  const arrayTags = response.split(' ').slice(0,5)
  console.log(arrayTags)
  res.send(arrayTags);

}) 


router.get("/api/get", async (req, res) => {
  const {username} = req.query;

  try { 
    const allPhotos = await UploadModel.find({ binFlag: 0, hiddenFolderFlag: 0,ownerUserId:username }).sort({ createdAt: "descending" });
    // console.log(allPhotos);
    const photosData = allPhotos.map(photo => ({
      _id: photo._id,
      dateTime: photo.dateTime,
      resolution: photo.resolution,
      size: photo.size,
      gpsData: photo.gpsData,
      type: photo.type,
      data: photo.photo,
      binFlag: photo.binFlag,
      hiddenFolderFlag: photo.hiddenFolderFlag,
      favoritesFlag: photo.favoritesFlag,
      tags: photo.tags
    }));
    
    res.send(photosData);               
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching photos.");
  }
});

function extractFirstFiveWords(inputString) {
  const words = inputString.split(',');
  const firstFiveWords = words.map(word => word.trim()).slice(0, 5);

  return firstFiveWords;
}

function removeSubstringUntilFirstComma(inputString) {
  const index = inputString.indexOf(',');
  if (index !== -1) {
      return inputString.substring(index + 1);
  }

  return inputString;
}

router.post("/api/save", async(req,res)=>{
  const {photo, ownerUserId,resolution,size,type, gpsData} = req.body
  const gptstr = await removeSubstringUntilFirstComma(photo)
  console.log(gpsData,"Helooooooooooooooooooo")
  const a = await run_image_tags(gptstr, type)
  const tag_array = extractFirstFiveWords(a)
  const tags = tag_array[0].split(' ');
  const firstFiveTags = tags.slice(0, 5);
  try {
    UploadModel.create({ 
      ownerUserId,
      dateTime: new Date(),
      resolution,
      size,
      type,
      photo, 
      tags: firstFiveTags,
      gpsData: gpsData, 
    })
      .then((data) => {
        console.log("Photo Uploaded Successfully");
        res.status(201).send(data);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    
  }
})

module.exports = router

