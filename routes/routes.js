const userController = require("../controllers/user.controller");
const express = require("express");

const router = express.Router();

router.get("/ping", (req, res) => res.status(200).json("pong"));

router.get("/users", userController.getAll);
router.get("/user/:id", userController.getOne);
router.post("/user", userController.create);
router.put("/user/:id", userController.update);

module.exports = router;
