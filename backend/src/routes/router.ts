import express from 'express';
const router = express.Router();

import user from './user';
import register from './signin/register';
import logon from './signin/logon';
import editCommission from './edit/editCommission';

router.use(express.json());
router.use('/register', register);
router.use('/login', logon);
router.use('/edit', editCommission);

module.exports = router;
