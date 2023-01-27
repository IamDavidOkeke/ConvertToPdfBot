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

var params = {
    'tweet.fields':['author_id','conversation_id','entities','in_reply_to_user_id',],
    expansions:[
        'author_id','referenced_tweets.id','referenced_tweets.id.author_id','entities.mentions.username','in_reply_to_user_id'
]}
var stream = (async ()=>{
    console.log(await getStreamRules())
    var streams = await appClient.v2.searchStream(params)
    return streams
})


module.exports = stream; 