const express = require("express");
const ctrl = require("../../controllers/auth");
const { ctrlWrapper } = require("../../helpers");
const { schemasUser } = require("../../models");
const { validateBody, authenticate, upload } = require("../../middlewares");


const router = express.Router();

router.post("/register", validateBody(schemasUser.registerSchema), ctrlWrapper(ctrl.register))
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify))
router.post("/verify", validateBody(schemasUser.emailSchema), ctrlWrapper(ctrl.resendVerifyEmail))
router.post("/login", validateBody(schemasUser.loginSchema), ctrlWrapper(ctrl.login))
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent))
router.post("/logout", authenticate, ctrlWrapper(ctrl.logout))
router.patch("/avatars", authenticate, upload.single("avatars"), ctrlWrapper(ctrl.uploadAvatar))
module.exports = router;