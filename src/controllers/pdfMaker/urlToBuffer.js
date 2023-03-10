var  https = require('https')


const convertUrlToBuffer = async function(url ){
  try {
        return new Promise((resolve) => {
          https.get(url, (response) => {
            const data = []
            response
              .on('data', (chunk) => {
                data.push(chunk)
              })
              .on('end', () => {
                resolve(Buffer.concat(data))
              })
          })
        })
    } catch (err) {
        console.error(err)
    }
}

module.exports = {convertUrlToBuffer}