import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAuYQ5psjrL9GB010n3gBYp7VkCqM8kU5g",
  authDomain: "eduplatform-4182e.firebaseapp.com",
  projectId: "eduplatform-4182e",
  storageBucket: "eduplatform-4182e.firebasestorage.app",
  messagingSenderId: "529954697841",
  appId: "1:529954697841:web:6819aeb1d0fbc25276a1d0",
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);