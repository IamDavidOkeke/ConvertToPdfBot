var express = require('express');
var router = express.Router();
var { pdfHandler } = require('../src/controllers/pdfHandler')
/* GET home page. */
router.get('/:id', function(req, res, next) {
  res.render('pdf', { title: 'A pdf view' , id: req.params.id});
});
router.get('/:id/pdf', function(req, res, next){
  pdfHandler(req, res, next)
} );

module.exports = router;