const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({    
    destination : path.resolve('./medias'),
    filename : ( req, file, cb ) => {
        
        /*let sauce = req.body.sauce;
        sauce = JSON.parse(sauce);
        let name = sauce.name.split(" ").join("_");*/
        let ext = path.extname(file.originalname);
        let name = path.basename(file.originalname, ext)
        let date = Date.now();
        let fileName = name + date + ext;
        cb(null, fileName);
        
    }
});

const limits = { fileSize : 2000000 };

const filter = (req, file, cb) => {
    console.log("on est dans upload filter")
    const fileTypes = /png|jpeg|jpg|webp/;
    const extName = fileTypes.test(path.extname(file.originalname));
    file.originalname.toLowerCase();
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
        console.log("upload ok")
       cb(null, true);

    } else {
        console.log("upload pas ok")
       cb("Erreur: seul les extensions png, jpeg, et jpg sont autorisées!");

    }
  };


  const upload = multer( {
      storage : storage,
      limits : limits,
      fileFilter : filter
  });

  module.exports = upload.single("image");