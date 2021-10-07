import LockerManager from "./libs/lockerManager.js";
import FirebaseManager from "./libs/firebaseManager.js";

// Config the channel instance in window
window.__POMODORO_ = {
  lockerManager: LockerManager,
  firebaseManager: FirebaseManager,
};

try {
  window.__POMODORO_.lockerManager.startListening();
} catch (error) {
  console.log(error);
}
