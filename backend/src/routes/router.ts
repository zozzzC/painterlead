import express from 'express';
const router = express.Router();

import user from './user';
// import register from './signin/register';
// import logon from './signin/logon';
import editCommission from './edit/editCommission';
import editMainTag from './edit/editMainTag';
import editImage from './edit/editImage';
import addUser from './signin/addUser';

router.use(express.json());
// router.use('/register', register);
// router.use('/login', logon);
router.use('/addUser', addUser);
router.use('/edit/commission', editCommission);
router.use('/edit/mainTag', editMainTag);
router.use('/edit/image', editImage);

module.exports = router;
