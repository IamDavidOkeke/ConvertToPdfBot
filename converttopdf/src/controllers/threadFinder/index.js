var appClient = require('../../appClient')

var params = {
    'tweet.fields':['author_id','conversation_id', 'attachments'],
    expansions: ['attachments.media_keys']
}

var findOriginalTweet = async function(conversationId){
    var tweet = await appClient.v2.singleTweet(conversationId, params)
    return tweet
}

var getReplies = async function(conversationId, authorId){
    var options = `conversation_id:${conversationId} from:${authorId} to:${authorId}`
    var replies = await appClient.v2.search(options, params)
    return replies
}

var getThread =  async function (conversationId){
    var thread = []
    var originalTweet = await findOriginalTweet(conversationId)
    thread.push(originalTweet)
    var authorId = originalTweet.data.author_id
    console.log ('Twitter has sent something about author:', originalTweet)
    var threadPaginator = await getReplies(conversationId, authorId)
    console.log(threadPaginator)
    for (const fetchedTweet of threadPaginator){
    console.log(fetchedTweet)
    thread.shift(fetchedTweet)
    }
    return thread

}

module.exports = { getThread}