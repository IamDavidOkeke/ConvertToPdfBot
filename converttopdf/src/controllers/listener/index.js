var stream = require('../stream');
var {ETwitterStreamEvent} = require('twitter-api-v2')

var data = async function(){
    var tweetStream = await stream()
    tweetStream.on(
        // Emitted when a Twitter payload (a tweet or not, given the endpoint).
        ETwitterStreamEvent.Data,
        eventData => console.log('Twitter has sent something:', eventData),
      );
}


module.exports = data