
const express = require('express');
//const { faker }  = require('@faker-js/faker');

const router = express.Router();

router.get('/',(req, res)=>{
  res.json({
    name: 'Categorie A'
  });
})

module.exports = router;
