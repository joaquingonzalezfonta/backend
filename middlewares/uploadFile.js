const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: 'public/images/products',
    filename: (req, file, cb) => {

        const name = crypto.randomUUID();

        console.log(file)

        const filename = name + path.extname(file.originalname)

        cb(null, filename)
    },
})

const upload = multer({ storage }).single('image')

module.exports = upload