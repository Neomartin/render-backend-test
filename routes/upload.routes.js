const express = require('express');
const api = express.Router();


const uploadController = require('../controllers/upload.controller');


api.post('/upload', uploadController.upload, uploadController.uploadFile);
api.get('/file/:id', uploadController.getImage);
api.get('/files', uploadController.getImages);
module.exports = api;