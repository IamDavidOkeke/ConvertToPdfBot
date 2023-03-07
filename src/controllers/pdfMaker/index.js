var fs = require('fs')
var PDFDocument = require('pdfkit')
var path = require('path')
var {addMedias} = require('./mediaHandler')

var options = {
    autoFirstPage:false,
    size: [ 480, 240 ],
    margins: {
        top:18,
        bottom:18,
        left:48,
        right:48
    }
}

var doc = new PDFDocument(options)


var makePdf = async function(writeStream, thread){
    try{
        var buffers = [];
        doc.on( "data", function( chunk ) { buffers.push( chunk ); } );
            for(let i = 0; i < thread.length; i++){
                let text = thread[i].text || thread[i].data.text
                let medias = thread[i].media || thread[i].includes?.media 
                doc.addPage()
                doc.font('font/PTSans-Regular.ttf')
                doc.text(text)
                if(medias && medias.length){
                   doc.moveDown()
                   await addMedias(medias, doc)
                }
            }
        doc.end()
        doc.on( "end", function() {
            writeStream.end( Buffer.concat( buffers ), "binary" );
        } );
    }catch(e){
        console.log(e)
    }
}



module.exports = { makePdf }