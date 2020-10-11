// Promisify the send message API
export default {
  async sendMessage (options) {
    return new Promise ((resolve, reject) => {
      chrome.runtime.sendMessage(options)
      chrome.runtime.onMessage.addListener(function temp (request) {
        chrome.runtime.onMessage.removeListener(temp)
        resolve(request)
      })
    })
  }
}
