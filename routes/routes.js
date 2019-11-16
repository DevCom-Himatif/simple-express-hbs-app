const userController = require("../controllers/user.controller");
const express = require("express");

const router = express.Router();

router.get("/ping", (req, res) => res.status(200).json("pong"));

router.get("/authors", userController.getAll);
router.get("/author/:id", userController.getOne);
router.post("/author", userController.create);
router.put("/author/:id", userController.update);

module.exports = router;
