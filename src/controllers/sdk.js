var verifyMention = function(tweet){
    let mentions = tweet.data.entities.mentions
    if(mentions){
     return verifyMentionedUser(mentions) ?  true : false
    }else{
      console.log('not verified mention')
      return false
    }
  }
  
  var verifyMentionedUser = function(mentions){
    var username = []
    for (let i= 0 ; i < mentions.length; i++){
       mentions[i].username === "save_pdf"? username.push('save_pdf') : null 
    }
    return username.length ? true : false
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

  var getReply = function(id){
    return `Hello, \nHere is your pdf \n${process.env.CYCLIC_URL}/pdf/${id}`
  }
  
module.exports = {verifyReply, verifyMention, getReply}