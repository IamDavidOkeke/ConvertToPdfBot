var express = require('express');
var router = express.Router();
var { pdfHandler } = require('../src/controllers/pdfHandler')
/* GET home page. */
router.get('/:id', function(req, res) {
  res.render('pdf', { title: 'A pdf view' , id: req.params.id});
});
router.get('/:id/pdf', async function(req, res, next){
  return pdfHandler(req, res)
} );

module.exports = router;