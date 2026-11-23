const express = require("express");
const router = express.Router();

const profileController = reauire("../controllers/profileController");

router.get("/", profileControoler.getProfile);
router.patch("/", profileController.updateProfile);

router.get("/ideas", profileController.getMyIdeas);
router.get("/supported", profileController.getSupportedIdeas);
router.get("/drafts", profileController.getDrafts);

module.exports = router;
