importScripts(
  "https://www.gstatic.com/firebasejs/12.0.0/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging-compat.js"
);

const searchParams = new URLSearchParams(location.search);
const firebaseConfig = Object.fromEntries(searchParams);

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { body, title } = payload.notification;

  self.registration.showNotification(title, {
    body,
  });
});
