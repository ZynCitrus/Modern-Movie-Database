import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVgSdKuiMrsVi29y76rGwzauao1A9yHVw",
  authDomain: "modernmoviedatabase.firebaseapp.com",
  projectId: "modernmoviedatabase",
  storageBucket: "modernmoviedatabase.appspot.com",
  messagingSenderId: "893102822451",
  appId: "1:893102822451:web:7968316a5a8d48f0b53f46",
  measurementId: "G-2VS4XJGY2Q",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
