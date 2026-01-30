import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2wkrhEd6OV26SIe-iwayP-F0yK5JaZCU",
  authDomain: "skillmirrorai-e4629.firebaseapp.com",
  projectId: "skillmirrorai-e4629",
  storageBucket: "skillmirrorai-e4629.firebasestorage.app",
  messagingSenderId: "1005547293699",
  appId: "1:1005547293699:web:9dee3a130a25d4545c9236",
  measurementId: "G-0HP95JWHDT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
