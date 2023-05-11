const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/upload/product')
    },
    filename: (req, file, callback) => {
        const fileExt = file.originalname.split('.').at(-1);

        const fileName = `${uuidv4()}.${fileExt}`;

        req.body.image = fileName;
        callback(null, fileName) 
    }
})

const uploadMulter = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 10 },
    fileFilter: (req, file, callback) => {
        const type = file.mimetype.split('/')[0]
        type === 'image' ? callback(null, true)  : callback(null, false);
    }
})


const uploadProduct = uploadMulter.single('file');

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
    uploadProduct,
    uploadFile,
    getImage,
    getImages
}