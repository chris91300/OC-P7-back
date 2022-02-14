const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({    
    destination : path.resolve('./profils'),
    filename : ( req, file, cb ) => {
        
        let ext = path.extname(file.originalname);
        let name = path.basename(file.originalname, ext)
        let date = Date.now();
        let fileName = name + date + ext;
        cb(null, fileName);
        
    }
});

const limits = { fileSize : 3000000 };

const filter = (req, file, cb) => {
    
    const fileTypes = /png|jpeg|jpg|webp/;
    const extName = fileTypes.test(path.extname(file.originalname));
    file.originalname.toLowerCase();
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
        
       cb(null, true);

    } else {
      
       cb("Erreur: seul les extensions png, jpeg, et jpg sont autorisées!");

    }
  };


  const upload = multer( {
      storage : storage,
      limits : limits,
      fileFilter : filter
  });

  module.exports = upload.single("image");