import LockerManager from './libs/LockerManager.js'

// config the channel instance in window
(window as any).__POMODORO_ = {
  lockerManager: new LockerManager()
}

try {
  (window as any).__POMODORO_.lockerManager.startListening()
} catch (error) {
  console.log(error)
}