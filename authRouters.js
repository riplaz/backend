const express = require("express");
const router = express.Router();

const controller = reauire("../controllers/userController");

router.get("/", controller.getUsers);
router