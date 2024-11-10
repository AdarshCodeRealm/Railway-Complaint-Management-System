// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth , signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwtFTWEXgs_vV9C8fbq-ND7f64eno0kgw",
  authDomain: "railmadad-dashboard.firebaseapp.com",
  projectId: "railmadad-dashboard",
  storageBucket: "railmadad-dashboard.appspot.com",
  messagingSenderId: "1053637373728",
  appId: "1:1053637373728:web:07788d2a6cad86bd86f145",
  measurementId: "G-D420K77TL8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days  * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

// Example usage
setCookie('myCookie', 'cookieValue', 7); // Sets cookie for 7 days
const signUpWithGoogle = async (e) => {
  e.preventDefault();
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    console.log(token)
    const user = result.user;
    console.log(user)
    // IdP data available using getAdditionalUserInfo(result)
    setCookie('accessToken', token, 2); // Sets cookie for 7 days

    window.location.href = "/dashboard";
  }).catch((error) => {
   console.log(error)
    // ...
  });
}

function deleteCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu Jan 01 1970 00:00:00 UTC";
}


const signOut = () => {
  auth.signOut();
  alert("SignOut")

  deleteCookie('accessToken');
  window.location.href = "/";
};

export {signUpWithGoogle, signOut}