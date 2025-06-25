/* eslint-env serviceworker */
/* global importScripts, firebase */
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:            "AIzaSyB4AJuHk3UnT7_YywZJUMPtYEMtRGMFJIo",
  authDomain:        "notificationpush-5d096.firebaseapp.com",
  projectId:         "notificationpush-5d096",
  storageBucket:     "notificationpush-5d096.appspot.com", // ← corriger ici
  messagingSenderId: "869422994449",
  appId:             "1:869422994449:web:15e3e24b970cca05da8db0",
  measurementId:     "G-E0XQMR0V43"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  const title   = payload.notification?.title  || 'Nouveau message';
  const options = {
    body:    payload.notification?.body   || '',
    icon:    payload.notification?.icon   || '/favicon.ico',
    data:    { url: payload.fcmOptions?.link || '/' }
  };
  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = event.notification.data.url;
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clients => {
        for (let c of clients) {
          if (c.url === url && c.focus) return c.focus();
        }
        return self.clients.openWindow(url);
      })
  );
});
