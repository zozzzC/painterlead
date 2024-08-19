import express from 'express';
const router = express.Router();

import user from './user';
import register from './signin/register';
import logon from './signin/logon';
import editCommission from './edit/editCommission';
import editMainTag from './edit/editMainTag';

router.use(express.json());
router.use('/register', register);
router.use('/login', logon);
router.use('/edit/commission', editCommission);
router.use('/edit/mainTag', editMainTag);

module.exports = router;
