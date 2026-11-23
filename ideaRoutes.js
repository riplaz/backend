const express = require("express");
const router = express.Router();

const ideaController = require("../controllers/ideaController");

router.get("/", ideaController.getIdea);
router.get("/:id", ideaController.getIdeaById);

router.post("/", ideaController.createIdea);
router.patch("/id:", ideaController.updateIdea);
router.delete("/:id", ideaController.deleteIdea);

router.post("/:id/vote", ideaController.voteIdea);
router.delete("/:id/vote", ideaController.removeVote);

router.get("/:id/comments", ideaController.getComments);
router.post("/:id/comments", ideaController.addComment);

module.exports = router;
