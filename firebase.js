import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyARyDLnuHLyvdr3qlnGSL_KkpYw8Kleso4",
  authDomain: "ezlaundary-application.firebaseapp.com",
  projectId: "ezlaundary-application",
  storageBucket: "ezlaundary-application.appspot.com",
  messagingSenderId: "275399686091",
  appId: "1:275399686091:web:60bd362784f7357a33284e"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth, db};