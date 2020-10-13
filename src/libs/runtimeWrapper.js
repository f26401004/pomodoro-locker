
const events = {}

// Use global listener to manage all event callback
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request)
  // If there is any event match
  if (events[request.type]) {
    // Call and pass the arguments to the event callback
    events[request.type](request, sender, sendResponse)
  }
})

// Promisify the send message API
export default {
  addListener(type, callback) {
    events[type] = callback
  }
}
