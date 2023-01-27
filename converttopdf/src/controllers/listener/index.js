var stream = require('../stream');
var {ETwitterStreamEvent} = require('twitter-api-v2')
var listener = async function(){
    var tweetStream = await stream()
    tweetStream.on(
        ETwitterStreamEvent.Data,
        (data) => {
          console.log('Twitter has sent something:', data)
          if (verifyMention(data) && verifyReply(data)){
            return data
          }else {
            return null
          }
        }
      );
}

var verifyMention = function(tweet){
  let mentions = tweet.data.entities.mentions
  if(mentions){
   return verifyMentionedUser(mentions) ?  true : false
  }else{
    console.log('not verified mention')
    return false
  }
}

var verifyMentionedUser = function(mentions, username){
  for (let i= 0 ; i < mentions.length; i++){
    return mentions[i].username === "save_pdf"? true : false  
  }
}

var verifyReply = function(tweet){
  let refTweet = tweet.data.referenced_tweets
  if(refTweet){
   return verifyRefType(refTweet)? true : false
  }else{
    console.log('not verified reply')
    return false
  }
}

var verifyRefType = function(refTweet){
  for (let i= 0 ; i < refTweet.length; i++){
    return refTweet[i].type === "replied_to"? true : false
  }
}

module.exports = listener