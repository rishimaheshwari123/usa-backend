const express = require("express");
const { contactUsController, submitApplication } = require("../controllers/contact");
const { loginCtrl, registerCtrl } = require("../controllers/authCtrl");
const router = express.Router();
;

router.post("/contact", contactUsController);

// Authentication endpoints
router.post("/register", registerCtrl);
router.post("/login", loginCtrl);
router.post('/career', submitApplication);

module.exports = router;