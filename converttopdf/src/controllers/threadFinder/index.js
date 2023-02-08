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
var getAllTweets = async function(threadPaginator){
    var threadPaginatorAll
    while(!threadPaginator.done){
        threadPaginatorAll = await threadPaginator.fetchNext()
    }
    console.log('threadPaginatorAll', threadPaginatorAll)
    return threadPaginatorAll
}
var aggregatedThread = function(paginator, arr){
    for (const fetchedTweet of paginator){
        console.log('fetchedTweet',fetchedTweet)
        arr.unshift(fetchedTweet)
        }
    return arr
}
var getThread =  async function (conversationId){
    var thread = []
    var originalTweet = await findOriginalTweet(conversationId)
    thread.unshift(originalTweet)
    var authorId = originalTweet.data.author_id
    console.log ('Twitter has sent something about author:', originalTweet)
    var threadPaginator = await getReplies(conversationId, authorId)
    console.log('threadPaginator', threadPaginator)
    var threadPaginatorAll = await getAllTweets(threadPaginator)
    console.log('threadPaginatorAll2', threadPaginatorAll)
    return  aggregatedThread(threadPaginatorAll, thread)
}

module.exports = { getThread }