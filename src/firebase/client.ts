import { getApps, initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDk_FLZKNj7ZS5uJ7mtK3eqI7B5Mzlb2Ag",
  authDomain: "link-sharing-app-93d8e.firebaseapp.com",
  projectId: "link-sharing-app-93d8e",
  storageBucket: "link-sharing-app-93d8e.firebasestorage.app",
  messagingSenderId: "72099252168",
  appId: "1:72099252168:web:89de943b643069817f62fd",
};

const currentApps = getApps();
let auth: Auth;

if (!currentApps.length) {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} else {
  const [app] = currentApps;
  auth = getAuth(app);
}

export { auth };
