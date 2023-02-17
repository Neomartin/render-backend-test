const multer = require('multer');
const Upload = require('../schemas/upload.schema');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, `${file.originalname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
    }
});

const uploadMulter = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: (req, file, cb) => {
        file.mimetype.split('/')[0] === 'image' ? cb(null, true) : cb(null, false);	
    }
});

const upload = uploadMulter.single('file');

const uploadFile = async(req, res) => {
    console.log(req.file)
    const img = fs.readFileSync(req.file.path);
    const encode_img = img.toString('base64');
    if(!img) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }

    const newFile = new Upload({
        name: req.file.originalname,
        data:new Buffer.from(encode_img, 'base64'),
        contentType: req.file.mimetype
    })
    const fileUploaded = await newFile.save();
    const id = newFile._id.toString();

    res.status(201).json({ message: 'File uploaded successfully', file: req.file.originalname, id });
}

async function getImage(req, res) {
    const file = await Upload.findById(req.params.id);
    
    res.status(200).send(file);
}

async function getImages(req, res) {
    const files = await Upload.find();
    
    res.status(200).send(files);
}

module.exports = {
    upload,
    uploadFile,
    getImage,
    getImages
}