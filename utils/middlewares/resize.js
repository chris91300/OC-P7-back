const fs = require('fs');
const sharp = require('sharp');


/**
 * Resize the medias upload by users
 */
module.exports = async ( req, res, next ) => {
    
    let imagePath = req.file ? req.file.path : undefined; 

    if ( imagePath ) {
        try{
            let imagePathOutput = imagePath.replace(/\.jpeg|\.jpg|\.png$/, ".webp");
            //  resize with a width to 500px but heigth auto
            let img = await sharp(imagePath).resize(500).toFormat('webp');

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