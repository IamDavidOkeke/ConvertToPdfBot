var {addMedias} = require('./mediaHandler')
const { convertUrlToBuffer } = require('./urlToBuffer')


var makePdf = async function(doc, thread){
    try{
        let OriginalTweet = thread[0]
        let {username, name, profile_image_url } = OriginalTweet.includes.users[0]
        let profileImageBuffer = await convertUrlToBuffer(profile_image_url)

        for(let i = 0; i < thread.length; i++){
            let text = thread[i].text || thread[i].data.text
            let medias = thread[i].media || thread[i].includes?.media 
            doc.addPage()
               .image(profileImageBuffer, undefined, undefined,{width:60}) 
               .moveDown(0.2)
               .fillColor('#555555')
               .text(name)
               .text(`@${username}`)
               .moveDown(0.5)
               .fillColor('black')
               .font('font/PTSans-Regular.ttf')
               .text(text)
            if(medias && medias.length){
                doc.moveDown()
                await addMedias(medias, doc)
            }
            }
    }catch(e){
        console.log(e)
    }
}



module.exports = { makePdf }