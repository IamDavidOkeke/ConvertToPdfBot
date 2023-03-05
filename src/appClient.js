const { TwitterApi } =  require('twitter-api-v2')

const  appClient  =  new TwitterApi(process.env.BEARER_TOKEN)

module.exports = appClient