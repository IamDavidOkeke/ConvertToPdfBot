var stream = require('./controllers/stream');
var { ETwitterStreamEvent } = require('twitter-api-v2')
var appClient = require('./appClient')
var twitterClient = require('./twitterClient.js')
var { verifyReply, verifyMention, getReply } = require('./controllers/sdk');

var main = async function(){
  try{
    var tweetStream = await stream(appClient)
    tweetStream.autoReconnect = true;

    tweetStream.on(
      ETwitterStreamEvent.ConnectionError,
      err => console.log('Connection error!', err),
    );
    tweetStream.on(
      ETwitterStreamEvent.ConnectionClosed,
      () => console.log('Connection has been closed.'),
    );
    tweetStream.on(
      ETwitterStreamEvent.DataKeepAlive,
      () => console.log('Twitter has a keep-alive packet.'),
    );
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