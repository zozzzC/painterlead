import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';

const app = express();

app.use(express.json());

dotenv.config({
    path: path.resolve(__dirname, '../.env'),
});

const router = require('./routes/router');
const corsOptions = {
    origin: 'http://localhost:3000', //IMPORTANT: change on prod
    credentials: true,
};

app.use(express.static('public'));
app.use(cors(corsOptions));
app.use('/', router);

const port = 4321;

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
