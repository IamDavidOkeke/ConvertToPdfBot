var stream = require('./controllers/stream');
var { ETwitterStreamEvent } = require('twitter-api-v2')
var appClient = require('./appClient')
var twitterClient = require('./twitterClient.js')
var { verifyReply, verifyMention, getReply } = require('./controllers/sdk');

var main = async function(){
  try{
    var tweetStream = await stream(appClient)

    tweetStream.on(
        ETwitterStreamEvent.Data,
         async (tweet) => {
          console.log('Twitter has sent something:', tweet.data.entities)
          if (verifyMention(tweet) && verifyReply(tweet)){
            let id = tweet.data.id
            let conversation_id = tweet.data.conversation_id
            let reply = getReply(conversation_id)
            twitterClient.v2.reply(reply , id)
          }
          else {
            console.log('not verified')
          }
        }
      );
  }catch(e){
      console.log(e)
    }
}

module.exports = main