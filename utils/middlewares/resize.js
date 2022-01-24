const fs = require('fs');
const sharp = require('sharp');

module.exports = async ( req, res, next ) => {
    
    let imagePath = req.file ? req.file.path : undefined; 

    if ( imagePath ) {
        try{
            let imagePathOutput = imagePath.replace(/\.jpeg|\.jpg|\.png$/, ".webp");
            let img = await sharp(imagePath).resize(500, 300).toFormat('webp');

            img.toFile(imagePathOutput, (err, img)=>{
                if (err) throw err;

                req.file.filename = req.file.filename.replace(/\.jpeg|\.jpg|\.png$/, ".webp");
                req.file.path = imagePathOutput;
                fs.unlink(imagePath, (err)=>{if (err) throw err;})
                next()

            });
            
           
        }catch(err){
            
            res.status(500).json( { message : "Une erreur est survenue." } );
        }
        

    } else {

        next();
    }

}