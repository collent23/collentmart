// firebase.js

// Import Firebase modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, push, set, remove, onValue } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";

// Konfigurasi Firebase lo
const firebaseConfig = {
  apiKey: "AIzaSyCL-26dKIBz3-npBhWnkFV_uQVjNBMonIw",
  authDomain: "collentmart.firebaseapp.com",
  projectId: "collentmart",
  storageBucket: "collentmart.appspot.com",
  messagingSenderId: "393900515991",
  appId: "1:393900515991:web:972f3a34463d6354d3bfd2",
  measurementId: "G-TSJLHNB5NR"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

// Export supaya bisa dipakai file lain
export {
  database,
  ref,
  push,
  set,
  remove,
  onValue,
  storage,
  sRef,
  uploadBytes,
  getDownloadURL
};
