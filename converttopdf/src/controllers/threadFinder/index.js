var appClient = require('../../appClient')

var params = {
    'tweet.fields':['author_id','conversation_id', 'attachments'],
    'media.fields':['media_key', 'type','url', 'alt_text', 'preview_image_url'],
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
    var threadPaginatorAll = threadPaginator
    while(!threadPaginator.done){
        threadPaginatorAll = await threadPaginator.fetchNext()
    }
    return threadPaginatorAll
}
var aggregatedThread = function(paginator){
    var arr = []
    for (const fetchedTweet of paginator){
        fetchedTweet.media = paginator.includes.medias(fetchedTweet)
        console.log('fetchedTweet',fetchedTweet)
        arr.unshift(fetchedTweet)
        }
    return arr
} 
var getThread =  async function (conversationId){
    try{
        var originalTweet = await findOriginalTweet(conversationId)
        var authorId = originalTweet.data.author_id
        console.log ('Twitter has sent something about author:', originalTweet )
        var threadPaginator = await getReplies(conversationId, authorId)
        console.log('threadPaginator', threadPaginator)
        var threadPaginatorAll = await getAllTweets(threadPaginator)
        console.log('threadPaginatorAll2', threadPaginatorAll)
        var thread = aggregatedThread(threadPaginatorAll)
        thread.unshift(originalTweet)
        return thread
    }catch(e){
        console.log(e)
    }
    
}

module.exports = { getThread }