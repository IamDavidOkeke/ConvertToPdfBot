var fs = require('fs')
var PDFDocument = require('pdfkit')
var path = require('path')
var {convertUrlToFile} = require('./urlToFile')

var options = {
    autoFirstPage:false
}
var mediaPath = path.join(process.cwd(), '/public/pdf/media')

var doc = new PDFDocument(options)

var removeMedia = function(path){
    fs.unlink(path, (err) => {
        if (err) {
            console.log(err)
        } 
        console.log(path + ' was deleted');
      });
}

var addMedias = async function(medias){
    for(let i = 0; i < medias.length; i++){
        if(medias[i].type === 'photo'){
            let imagePath = await convertUrlToFile(medias[i].url, mediaPath) 
            doc.image(imagePath)
            removeMedia(imagePath)
        }else {
            let imagePath = await convertUrlToFile(medias[i].preview_image_url, mediaPath) 
            doc.image(imagePath)
            removeMedia(imagePath)
        }
    }
}


var makePdf = async function(writeStream, thread){
    try{
        doc.pipe(writeStream)
            for(let i = 0; i < thread.length; i++){
                let text = thread[i].text || thread[i].data.text
                let medias = thread[i].media || thread[i].includes?.media 
                doc.addPage()
                doc.text(text)
                if(medias && medias.length){
                   await addMedias(medias)
                }
            }
        doc.end()
    }catch(e){
        console.log(e)
    }
}



module.exports = { makePdf }