var fs = require('fs')
var PDFDocument = require('pdfkit')

var options = {
    autoFirstPage:false
}
var doc = new PDFDocument(options)

var makePdf = function(path, thread){
    try{
        doc.pipe(fs.createWriteStream(path))
            for(let i = 0; i < thread.length; i++){
                doc.addPage()
                doc.text(thread[i].text || thread[i].data.text)
            }
        doc.end()
    }catch(e){
        console.log(e)
    }
}

module.exports = {makePdf}