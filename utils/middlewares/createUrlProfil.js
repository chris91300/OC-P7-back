
/**
 * create a url picture for the profil image 
 */
module.exports = ( req, res, next ) => {

    try{
        // nombre aléatoire entre 1 et 14
        let randomNumber = parseInt(Math.random() * (15 - 1) + 1);
        let imageName = "profil_"+randomNumber+".jpg";
        let urlDirectory = process.env.URLPROFILDIRECTORY 
        let urlProfil = urlDirectory+imageName;        
        req.body.urlProfil = urlProfil;
        
        next();
    } catch ( err ) {

        res.status(500).json({ message : "Désolé une erreur est survenue. Votre inscription n'a pas pû être prise en compte"})

    }
    

}