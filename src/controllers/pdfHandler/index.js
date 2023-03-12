const { makePdf } = require("../pdfMaker")
const { getThread } = require("../threadFinder")
var PDFDocument = require('pdfkit')

var options = {
    autoFirstPage:false,
    size: [ 580, 260 ],
    margins: {
        top:48,
        bottom:48,
        left:48,
        right:48
    }
}

var doc = new PDFDocument(options)

var pdfHandler = async function(req, res, next){
    try{
        res.type( "pdf" )
        let id = req.params.id
        let thread = await getThread(id)
        doc.pipe(res)
        await makePdf(doc, thread)
        doc.end()
        await new Promise((resolve,reject)=>{
            res.on('finish', ()=>{
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