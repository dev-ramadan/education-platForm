self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

importScripts("https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging-compat.js");


firebase.initializeApp({
  apiKey: "AIzaSyAuYQ5psjrL9GB010n3gBYp7VkCqM8kU5g",
  authDomain: "eduplatform-4182e.firebaseapp.com",
  projectId: "eduplatform-4182e",
  storageBucket: "eduplatform-4182e.firebasestorage.app",
  messagingSenderId: "529954697841",
  appId: "1:529954697841:web:6819aeb1d0fbc25276a1d0",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});