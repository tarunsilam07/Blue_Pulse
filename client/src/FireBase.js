
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBjq6LEqcHpLSPMUtU7CaeVDfYG24m6DX8",
  authDomain: "blue-pulse-39cdb.firebaseapp.com",
  projectId: "blue-pulse-39cdb",
  storageBucket: "blue-pulse-39cdb.firebasestorage.app",
  messagingSenderId: "976572091189",
  appId: "1:976572091189:web:1cd449132348c8c5c69a7c"
};

const firebaseapp = initializeApp(firebaseConfig);
export default firebaseapp