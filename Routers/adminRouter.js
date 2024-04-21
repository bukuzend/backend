const express = require('express');
const router = express();

const adminController = require('../Controllers/adminController');



router.get("/", adminController.getList);
router.get("/:id", adminController.getRequest);

router.post("/:id", adminController.postRequest);

module.exports = router;