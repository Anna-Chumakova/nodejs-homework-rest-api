const express = require("express");
const ctrl = require("../../controllers/auth");
const { ctrlWrapper } = require("../../helpers");
const { schemasUser } = require("../../models");
const { validateBody, authenticate } = require("../../middlewares");


const router = express.Router();

router.post("/register", validateBody(schemasUser.registerSchema), ctrlWrapper(ctrl.register))
router.post("/login", validateBody(schemasUser.loginSchema), ctrlWrapper(ctrl.login))
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent))
router.post("/logout", authenticate, ctrlWrapper(ctrl.logout))

module.exports = router;