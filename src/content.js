import LockerClient from './libs/LcokerClient.js'

let client = null

window.addEventListener('load', () => {
    // Initialize the locker client
    client = new LockerClient(this.location.href)
    client.startListening()
})
