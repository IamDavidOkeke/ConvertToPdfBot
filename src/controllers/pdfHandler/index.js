const { makePdf } = require("../pdfMaker")
const { getThread } = require("../threadFinder")


var pdfHandler = async function(req, res, next){
    let id = req.params.id
    let thread = await getThread(id)
    makePdf(res, thread)
}

module.exports = { pdfHandler }