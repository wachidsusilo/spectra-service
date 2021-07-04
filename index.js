import express from 'express';
import cors from 'cors';
import httpRoute from './route/httpRoute.js';


const app = express();
app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/', httpRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT);