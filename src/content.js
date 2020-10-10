import LockerClient from './libs/lockerClient.js'

let client = null

window.addEventListener('load', () => {
  // Initialize the locker client
  client = new LockerClient(window.location.href)
  client.startListening()
  console.log('test')
  chrome.runtime.sendMessage({
    type: 'ping'
  })
})
