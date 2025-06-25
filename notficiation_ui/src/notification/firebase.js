import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey:            "AIzaSyB4AJuHk3UnT7_YywZJUMPtYEMtRGMFJIo",
  authDomain:        "notificationpush-5d096.firebaseapp.com",
  projectId:         "notificationpush-5d096",            // ← impératif
  storageBucket:     "notificationpush-5d096.appspot.com", // ← corriger ici
  messagingSenderId: "869422994449",
  appId:             "1:869422994449:web:15e3e24b970cca05da8db0",
  measurementId:     "G-E0XQMR0V43"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const VAPID_KEY = "BLxLy7UMAwn5miSw4ePILH72FZMiDLsLD5TKvXhVxmpqgMMR6XljB3ZOpk98qXjdz_93VA0130t6xf07d5mvdS4";

export async function generateToken() {
  // -- enregistrer le SW
  const registration = // APRÈS (classic)
await navigator.serviceWorker.register("/firebase-messaging-sw.js");

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return null;
  return await getToken(messaging, {
    vapidKey: VAPID_KEY,
    serviceWorkerRegistration: registration
  });
}

export function onMessageListener() {
  return new Promise(resolve => {
    onMessage(messaging, payload => resolve(payload));
  });
}

export { messaging };

