var appClient = require('../../appClient')

var params = {
    'tweet.fields':['author_id','conversation_id']
}

var findTweetAuthor = async function(tweet){
    var authorTweet = await appClient.v2.singleTweet(tweet.data.conversation_id, params)
    return authorTweet
}


module.exports = findTweetAuthor