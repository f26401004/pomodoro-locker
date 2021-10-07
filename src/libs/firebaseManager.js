// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

class FirebaseManager {
  constructor(firebaseConfig) {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    this._configAccountRequestListener();
  }

  _configAccountRequestListener() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (!request.type.includes("signin")) return;
      const auth = getAuth();
      console.log(FacebookAuthProvider);
      let provider;
      switch (request.type) {
        case "signin-google":
          provider = new GoogleAuthProvider();
          break;
        case "signin-facebook":
          provider = new FacebookAuthProvider();
          break;
      }

      signInWithPopup(auth, provider)
        .then((result) => {
          // // This gives you a Google Access Token. You can use it to access the Google API.
          // const credential = GoogleAuthProvider.credentialFromResult(result);
          // const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(user);
        })
        .catch((error) => {
          // // Handle Errors here.
          // const errorCode = error.code;
          // const errorMessage = error.message;
          // // The email of the user's account used.
          // const email = error.email;
          // // The AuthCredential type that was used.
          // const credential = GoogleAuthProvider.credentialFromError(error);
          console.log(error);
        });
    });
  }
}

export default new FirebaseManager({
  apiKey: "AIzaSyCTqb5XedcvFZkriiz_ZntIJw3vuAkdHk8",
  authDomain: "pomodoro-locker.firebaseapp.com",
  projectId: "pomodoro-locker",
  storageBucket: "pomodoro-locker.appspot.com",
  messagingSenderId: "926042327077",
  appId: "1:926042327077:web:6b923542126bebd831d7cc",
  measurementId: "G-MCV227R3KC",
});
