var appClient = require('../../appClient')

var updateStreamRules = async ()=>{
    await appClient.v2.updateStreamRules({
        add:[
            { value: '("@save_pdf save") -is:retweet', tag: 'save_pdf'}
        ]
      })
}
var getStreamRules = async ()=>{
    var rules= await appClient.v2.streamRules()
    return rules
}
var stream = (async ()=>{
    await updateStreamRules()
    console.log(await getStreamRules())
    var streams = await appClient.v2.searchStream()
    return streams
})


module.exports = stream; 