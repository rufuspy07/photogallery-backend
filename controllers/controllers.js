const Image = require("../models/models");
const getDataUri = require("../utils/dataUri");
const { v2 } = require("cloudinary");

const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    const fileUri = getDataUri(file);
    const mycloud = await v2.uploader.upload(fileUri.content);
    const newImage = new Image({
      imgUrl: mycloud.secure_url,
    });

    const result = await newImage.save();
    res.status(200).json({ message: "File received", data: result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

const getImages = async (req, res) => {
  try {
    const count = await Image.find().countDocuments();
    console.log("count", count);
    console.log(req.body);
    const skip = req.body.page * req.body.limit - req.body.limit;
    const result = await Image.find()
      .sort({ createdAt: -1 })
      .limit(req.body.limit)
      .skip(skip);
    res.json({ result, count });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

module.exports = { uploadImage, getImages };
