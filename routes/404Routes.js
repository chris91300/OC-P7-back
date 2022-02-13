
const express = require('express');
const router = express.Router();


router.get(/.*/, (req, res) =>{

    console.log("attention page 404. redirection")
    res.redirect("/");
  })


  module.exports = router;