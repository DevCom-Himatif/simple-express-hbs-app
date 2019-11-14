const userController = require("./controllers/user.controller");
const express = require("express");

const router = express.Router();

router.get("/ping", (req, res) => res.status(200).json("pong"));

router.get("/authors", userController.getAll);
router.post("/author", userController.create);

module.exports = router;
