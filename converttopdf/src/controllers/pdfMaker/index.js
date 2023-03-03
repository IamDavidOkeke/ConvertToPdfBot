var fs = require('fs')
var PDFDocument = require('pdfkit')
var path = require('path')
var {convertUrlToFile} = require('./urlToFile')

var options = {
    autoFirstPage:false,
    size: [ 580, 420 ],
    margins: {
        top:48,
        bottom:48,
        left:48,
        right:48
    }
}
var imageOptions = {
    width:150
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
        let url = medias[i].type === 'photo'? medias[i].url : medias[i].preview_image_url
        let imagePath = await convertUrlToFile(url, mediaPath) 
        doc.image(imagePath,undefined, undefined, {...imageOptions, link:url})
        removeMedia(imagePath)
    }
}


var makePdf = async function(writeStream, thread=thready){
    try{
        doc.pipe(writeStream)
            for(let i = 0; i < thread.length; i++){
                let text = thread[i].text || thread[i].data.text
                let medias = thread[i].media || thread[i].includes?.media 
                doc.addPage()
                doc.font('font/PTSans-Regular.ttf')
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