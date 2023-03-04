var download = require('image-downloader')


const convertUrlToFile = async function(url, dest ){
  try {
        const { filename } = await download.image({ url, dest })
        console.log('saved to', filename)
        return filename
    } catch (err) {
        console.error(err)
    }
}

module.exports = {convertUrlToFile}