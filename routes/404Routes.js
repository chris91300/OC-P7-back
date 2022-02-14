
const express = require('express');
const router = express.Router();


router.get(/.*/, (req, res) =>{

    
    res.status(404).json({message : "aucune route correspondante"})
  })


  module.exports = router;