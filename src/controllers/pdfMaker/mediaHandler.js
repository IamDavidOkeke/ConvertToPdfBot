var {convertUrlToFile} = require('./urlToFile')
var fs = require('fs')
var path = require('path')

var imageOptions = {
    width:110
}
var mediaPath = path.join(process.cwd(), '/public/pdf/media')

var removeMedia = function(path){
    fs.unlink(path, (err) => {
        if (err) {
            console.log(err)
        } 
        console.log(path + ' was deleted');
      });
}

var addMedias = async function(medias, doc){
    let y = doc.y
    for(let i = 0; i < medias.length; i++){
        let url = medias[i].type === 'photo'? medias[i].url : medias[i].preview_image_url
        let imagePath = await convertUrlToFile(url, mediaPath) 
        doc.image(imagePath, doc.x + (i * 120), y, {...imageOptions, link:url})
        removeMedia(imagePath)
    }
}

module.exports = {addMedias}