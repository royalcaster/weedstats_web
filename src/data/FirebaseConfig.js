import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBAlbSfcLmsqz9S_W4J_TCsX_i481My9MM",
  authDomain: "weedstats-1a033.firebaseapp.com",
  databaseURL:
    "https://weedstats-1a033-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "weedstats-1a033",
  storageBucket: "weedstats-1a033.appspot.com",
  messagingSenderId: "158741630717",
  appId: "1:158741630717:android:405e67a3c5b85b92c6f894",
};

/* BACKUP
const firebaseConfig = {
  apiKey: "AIzaSyBAlbSfcLmsqz9S_W4J_TCsX_i481My9MM",
  authDomain: "weedstats-1a033.firebaseapp.com",
  databaseURL:
    "https://weedstats-1a033-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "weedstats-1a033",
  storageBucket: "weedstats-1a033.appspot.com",
  messagingSenderId: "158741630717",
  appId: "1:158741630717:android:81d5c7ffc951c450c6f894",
}; */

const app = initializeApp(firebaseConfig);
/* const db = getDatabase(app); */
const firestore = getFirestore();
const storage = getStorage(app);

export { app, firestore, storage };
