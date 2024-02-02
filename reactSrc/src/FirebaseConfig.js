import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
