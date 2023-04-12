const express = require("express");
const { register, login, auth } = require("../controllers/user.controller.js");
const { registerRules, validatorr } = require("../middlewares/validator.js");
const { verifyAuth } = require("../middlewares/verifyAuth.js");

const router = express.Router();

router.post("/register", registerRules(), validatorr, register);
router.post("/login", login);
router.get("/auth", verifyAuth, auth);
module.exports = router;
