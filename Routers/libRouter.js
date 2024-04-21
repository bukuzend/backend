const express = require('express');
const router = express.Router();

const libController = require("../Controllers/libController");

router.get("/", libController.getDragons);
router.get("/:dragName", libController.getDragon);
router.get("/:dragName/download", libController.getDragonImg);


module.exports = router;
