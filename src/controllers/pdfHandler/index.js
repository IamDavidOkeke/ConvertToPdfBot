const { makePdf } = require("../pdfMaker")
const { getThread } = require("../threadFinder")


var pdfHandler = async function(req, res, next){
    try{
        res.type( "pdf" )
        let id = req.params.id
        let thread = await getThread(id)
        makePdf(res, thread)
    }catch(e){
        console.log(e)
    }
}

module.exports = { pdfHandler }