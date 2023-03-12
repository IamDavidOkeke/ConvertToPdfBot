var {addMedias} = require('./mediaHandler')


var makePdf = async function(doc, thread){
    try{
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
    }catch(e){
        console.log(e)
    }
}



module.exports = { makePdf }