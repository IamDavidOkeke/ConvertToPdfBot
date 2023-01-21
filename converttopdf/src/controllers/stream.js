var appClient = require('../appClient')


var stream = (async ()=>{
    await appClient.v2.updateStreamRules({
        add:[
            { value: '@save_pdf', tag: 'save_pdf'}
        ]
      })
    var streams = await appClient.v2.searchStream()
    return streams
})


module.exports = stream; 