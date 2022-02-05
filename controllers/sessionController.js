


exports.CHECK_SESSION = ( req, res )=>{

    console.log("session req")
    
    console.log(req.session)
   // console.log(req.sessionStore)
   //s req.session.destroy()
    let session = req.session;
    if ( session.userSession ) {
        console.log("il y a une session")
        let data = JSON.parse(session.userSession);
        console.log(data)

        res.status(200).json({message : "ok session"})
    } else {
        req.session.userSession = {}
        res.status(200).json({message : "PAS ok session"})
    }
}