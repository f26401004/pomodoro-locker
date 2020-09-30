import LockerManager from './libs/LockerManager.js'

// config the channel instance in window
window.__POMODORO_ = {
  lockerManager: new LockerManager()
}

try {
  window.__POMODORO_.lockerManager.startListening()
} catch (error) {
  console.log(error)
}