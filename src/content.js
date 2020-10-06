import LockerClient from './libs/lockerClient.js'

let client = null

window.addEventListener('load', () => {
    // Initialize the locker client
    client = new LockerClient(this.location.href)
    client.startListening()
})
