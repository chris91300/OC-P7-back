
const fs = require('fs');
const path = require('path');


/**
 * verify each input value when user save or update a sauce
 * special character are not allowed in order to block SQL or script injection
 */
module.exports = ( req, res, next ) => {
    
    let { title, text, userId } = req.body;    
    let file = req.file;
    let regex = /[\<\>\{\}\$]/;

    console.log(title)
    console.log(file)
    

    if ( 
        userId != undefined & !isNaN(userId) &
        title != undefined & !regex.test(title) &
        text != undefined & !regex.test(text) 
    ) {
        
        next();

    } else {
       
        if ( file != undefined ) {
            
            let fileName = file.filename;  
            let staticPath = path.resolve('./medias');  
            let filePath = staticPath + "/" + fileName;

            fs.unlink(filePath, ()=>{ console.log("image supprimé"); });

        }

        res.status(400).json( { message : "champs invalides."});

    }

}