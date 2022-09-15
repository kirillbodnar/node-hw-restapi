const express = require("express");

const router = express.Router();

const controller = require("../../controllers/auth");
const { ctrlWrapper } = require("../../helpers");
const { register, login, logout, current } = controller;

const { validationBody, authentication } = require("../../middlewares");

const { schemas } = require("../../models/user");

router.post(
  "/signup",
  validationBody(schemas.registerSchema),
  ctrlWrapper(register)
);

router.post("/login", validationBody(schemas.loginSchema), ctrlWrapper(login));
module.exports = router;

router.get("/logout", authentication, ctrlWrapper(logout));

router.get("/current", authentication, ctrlWrapper(current));
