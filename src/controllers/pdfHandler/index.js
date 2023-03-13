const { makePdf } = require("../pdfMaker")
const { getThread } = require("../threadFinder")
var PDFDocument = require('pdfkit')

var options = {
    autoFirstPage:false,
    size: [ 580, 260 ],
    margins: {
        top:26,
        bottom:18,
        left:48,
        right:48
    }
}

var pdfHandler = async function(req, res, next){
    try{
        var doc = new PDFDocument(options)
        res.type( "pdf" )
        let id = req.params.id
        console.log('id', id)
        let thread = await getThread(id)
        console.log('thread', thread.length)
        doc.pipe(res)
        await makePdf(doc, thread)
        doc.end()
        await new Promise((resolve,reject)=>{
            res.on('finish', ()=>{
                console.log('finish')
                resolve()
            })
            res.on('error', (e)=>{
                reject(e)
            })  
        })
    }catch(e){
        console.log(e)
    }
}

module.exports = { pdfHandler }