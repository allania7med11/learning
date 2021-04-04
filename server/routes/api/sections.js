const router = require('express').Router();
const { section } = require("../../controllers");

router.post("/", section.create);
router.get("/:id?", section.read);


module.exports = router;
