const express = require("express");
const { contactUsController, submitApplication } = require("../controllers/contact");
const router = express.Router();
;

router.post("/contact", contactUsController);


router.post('/career', submitApplication);

module.exports = router;