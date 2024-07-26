import express from "express";
const router = express.Router();

import user from "./user"
import register from "./signin/register"

router.use("/user", user);
router.use("/register", register);

module.exports = router;