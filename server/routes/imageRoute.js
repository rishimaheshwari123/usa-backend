const express = require("express")
const { uploadImages } = require("../controllers/imageCtrl")
const router = express.Router()


router.post("/multi", uploadImages)


module.exports = router


