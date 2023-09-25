const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/uploadRoutes");
const mongoose = require("mongoose");
const app = express();
const port = 4000;
const { v2 } = require("cloudinary");
const getDataUri = require("./utils/dataUri");

v2.config({
  cloud_name: "dml6mry1w",
  api_key: "921613158867974",
  api_secret: "vu48YnmFWxZ9ZJrPl2t4BjdBjbg",
});

app.use(cors());

app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://Rufus:YfQ7Oxqt370QeVDR@cluster0.o6tbuta.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/", (req, res) => {
  res.send("Hello Express");
});

// app.post("/upload", upload, });

app.use("/", userRoutes);
// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
