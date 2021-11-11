const express = require("express");
const { validate } = require("express-validation");
const loginValidation = require("../schemas/userSchemas");

const { createUser, loginUser } = require("../controllers/usersControllers");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", validate(loginValidation), loginUser);

module.exports = router;
