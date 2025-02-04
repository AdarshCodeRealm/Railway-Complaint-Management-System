// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"

const provider = new GoogleAuthProvider() 
const firebaseConfig = {
  apiKey: "AIzaSyBwtFTWEXgs_vV9C8fbq-ND7f64eno0kgw",
  authDomain: "railmadad-dashboard.firebaseapp.com",
  projectId: "railmadad-dashboard",
  storageBucket: "railmadad-dashboard.appspot.com",
  messagingSenderId: "1053637373728",
  appId: "1:1053637373728:web:07788d2a6cad86bd86f145",
  measurementId: "G-D420K77TL8",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
function setCookie(name, value, days) {
  var expires = ""
  if (days) {
    var date = new Date()
    date.setTime(date.getTime() + days * 60 * 1000)
    expires = "; expires=" + date.toUTCString()
  }
  document.cookie = name + "=" + value + expires + "; path=/"
}

// Example usage
setCookie("myCookie", "cookieValue", 7) // Sets cookie for 7 days

function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(";").shift()
}
const signUpWithGoogle = async (e) => {
    e.preventDefault()
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      console.log(token)
      const user = result.user
      console.log(user)
      setCookie("accessToken", token, 2) // Sets cookie for 7 days
      console.log("cookie", getCookie("accessToken"))
      window.location.reload();
    })
    .catch((error) => {
      console.log(error)
    })
}

function deleteCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu Jan 01 1970 00:00:00 UTC"
}

const signOut = (e) => {
  e.preventDefault()
  auth.signOut()
  alert("SignOut")
  deleteCookie("accessToken")
  window.location.reload();
}

export { signUpWithGoogle, signOut, getCookie, setCookie, deleteCookie }
