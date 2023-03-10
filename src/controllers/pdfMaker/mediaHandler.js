var {convertUrlToBuffer} = require('./urlToBuffer')
var fs = require('fs')
var path = require('path')

var imageOptions = {
    width:110
}


var addMedias = async function(medias, doc){
    let y = doc.y
    for(let i = 0; i < medias.length; i++){
        let url = medias[i].type === 'photo'? medias[i].url : medias[i].preview_image_url
        let imageBuffer = await convertUrlToBuffer(url) 
        doc.image(imageBuffer, doc.x + (i * 120), y, {...imageOptions, link:url})
    }
}

module.exports = {addMedias}