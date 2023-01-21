const  credentials   = require('../credentials')
const { TwitterApi } =  require('twitter-api-v2')

const  appClient  =  new TwitterApi(credentials.bearerToken)

module.exports = appClient