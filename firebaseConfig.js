import { initializeApp } from "firebase/app";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA01zcbTvJS-G4YivmDR11jyGAyoImpYhc",
  authDomain: "therealpropertyapp.firebaseapp.com",
  projectId: "therealpropertyapp",
  storageBucket: "therealpropertyapp.appspot.com",
  messagingSenderId: "1052048554782",
  appId: "1:1052048554782:web:5a38ae99b78090a134670f",
  measurementId: "G-V829LLCJ9H",
  databaseURL: "https://therealpropertyapp-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);

export default app;

