import express from 'express';
import multer from 'multer';
import Jimp from 'jimp';
import { v4 as UUID } from 'uuid';
import { resolve } from 'path';
import fs from 'fs';

const httpRoute = express.Router();

const upload = multer({ dest: 'uploads/' });
const type = upload.single('img');

httpRoute.get('/', (req, res) => {
    res.status(200).send("Welcome to SpectrA Image Converter API");
});

httpRoute.post('/convert', type, (req, res) => {
    Jimp.read(req.file.path).then((img) => {
        const filename = UUID().toString().replace('-', '') + '.png';
        img.write('converted/' + filename, () => {
            fs.readFile(resolve('./converted/' + filename), (err, data) => {
                res.type('image/png');
                res.status(200).send(Buffer.from(data));
                fs.unlink(resolve('./' + req.file.path), () => {});
                fs.unlink(resolve('./converted/' + filename), () => {});
            })
        });
    }).catch(e => console.log(e));
});

export default httpRoute;