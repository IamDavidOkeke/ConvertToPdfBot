var appClient = require('../../appClient')

var params = {
    'tweet.fields':['author_id','conversation_id', 'attachments'],
    'user.fields':['id','name','username', 'profile_image_url'],
    'media.fields':['media_key', 'type','url', 'alt_text', 'preview_image_url'],
    expansions: ['attachments.media_keys', 'author_id']
}

var findOriginalTweet = async function(id){
    var tweet = await appClient.v2.singleTweet(id, params)
    return tweet
}

var getReplies = async function(id, authorId){
    var options = `conversation_id:${id} from:${authorId} to:${authorId}`
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
        arr.unshift(fetchedTweet)
        }
    return arr
} 
var getThread =  async function (id){
    try{
        let tweet = await findOriginalTweet(id)
        let authorId = tweet.data.author_id
        let threadPaginator = await getReplies(id, authorId)
        let threadPaginatorAll = await getAllTweets(threadPaginator)
        let thread = aggregatedThread(threadPaginatorAll)
        thread.unshift(tweet)
        return thread
    }catch(e){
        console.log(e)
    }
    
}

module.exports = { getThread }