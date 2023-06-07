import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  // Your Firebase configuration
  apiKey: "AIzaSyDuMCmP52bHcuedQiTu17Hm8QlpaQ_110U",
  authDomain: "golfapp-56706.firebaseapp.com",
  projectId: "golfapp-56706",
  storageBucket: "golfapp-56706.appspot.com",
  messagingSenderId: "372698117762",
  appId: "1:372698117762:web:227b1beb685c122737269b",
  measurementId: "G-SV05W6B3HP",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
