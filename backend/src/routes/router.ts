import express from 'express';
const router = express.Router();

import editCommission from './edit/editCommission';
import editMainTag from './edit/editMainTag';
import editImage from './edit/editImage';
import addUser from './signin/addUser';
import s3 from './helpers/s3';

router.use(express.json());
router.use('/addUser', addUser);
router.use('/edit/commission', editCommission);
router.use('/edit/mainTag', editMainTag);
router.use('/edit/image', editImage);
router.use('/s3', s3);

module.exports = router;
