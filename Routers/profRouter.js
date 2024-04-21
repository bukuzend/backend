const express = require('express');
const router = express.Router();

const upload = require('../Helper/File');

const  profController = require("../Controllers/profController");

router.get("/",profController.getInfProfile);
router.get("/icon", profController.getDownIcon);
router.get("/catched",profController.getCatchedProfile);

router.get("/unauth", profController.getUnAuth)


router.post("/send",upload.single("image"),profController.postSendStatistic);

module.exports = router;
