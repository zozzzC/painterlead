import express from "express";
const router = express.Router();

import user from "./user"
import register from "./signin/register"
import logon from "./signin/logon"

router.use("/register", register);
router.use("/login", logon);

module.exports = router;