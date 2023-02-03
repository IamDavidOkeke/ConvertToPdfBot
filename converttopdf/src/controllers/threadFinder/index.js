var appClient = require('../../appClient')

var params = {
    'tweet.fields':['author_id','conversation_id', 'attachments'],
    expansions: ['attachments.media_keys']
}

var findOriginalTweet = async function(conversationId){
    var tweet = await appClient.v2.singleTweet(conversationId, params)
    return tweet
}

var getThread = async function(conversationId, authorId){
    var options = `conversation_id:${conversationId} from:${authorId} to:${authorId}`
    var thread = await appClient.v2.search(options, params)
    return thread
}

module.exports = {findOriginalTweet, getThread}