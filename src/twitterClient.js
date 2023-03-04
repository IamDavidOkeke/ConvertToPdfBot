const  credentials   = require('../credentials')
const { TwitterApi } =  require('twitter-api-v2')
  
const  client  =  new TwitterApi(credentials.clientCredentials)
const twitterClient = client.readWrite


module.exports = twitterClient