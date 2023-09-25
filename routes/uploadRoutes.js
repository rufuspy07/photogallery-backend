const express = require("express");
const upload = require("../middleware/multerMiddleware");
const {uploadImage,getImages} = require("../controllers/controllers");
const router = express.Router();

router.route("/uploads").post(upload, uploadImage);
router.route("/getImages").post(getImages);

module.exports = router;
