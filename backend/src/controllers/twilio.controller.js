import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyC02e93WS_PE52XTFIqhHfNJRs-Lmy-4nM",
  authDomain: "railmadad-3f1e1.firebaseapp.com",
  projectId: "railmadad-3f1e1",
  storageBucket: "railmadad-3f1e1.firebasestorage.app",
  messagingSenderId: "247744879661",
  appId: "1:247744879661:web:f0de9cdd27be36d711eca4",
  measurementId: "G-VWQC5MG2J3",
};

const app = initializeApp(firebaseConfig);
import admin from "firebase-admin";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
const auth = getAuth(app);
async function sendOTP(req, res) {
  const { phoneNumber } = req.body;
  try {
    const data = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    res.status(200).json({ data });
  } catch (error) {
    console.error("Error sending verification code:", error);
    throw error;
  }
}

async function verifyCode(verificationId, code) {
  try {
    const phoneCredential = admin.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    const userCredential = await admin
      .auth()
      .signInWithCredential(phoneCredential);
    console.log("User signed in:", userCredential.user);
    return userCredential;
  } catch (error) {
    console.error("Error verifying code:", error);
    throw error;
  }
}

export { verifyCode, sendOTP };
