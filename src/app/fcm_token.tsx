"use client";

import { getMessaging, getToken, isSupported } from "firebase/messaging";
import { atom, useAtomValue, useSetAtom } from "jotai";

import { firebaseConfig } from "./config";
import { getFirebaseClientApp } from "./fcm_app";
import { notificationPermissionAtom } from "./notification_permission";

export const fcmTokenAtom = atom<string | null>(null);
export const FCMToken = () => {
  const permission = useAtomValue(notificationPermissionAtom);
  const setFCMToken = useSetAtom(fcmTokenAtom);

  return (
    <button
      onClick={async () => {
        const isFCMSupported = await isSupported();
        if (!isFCMSupported) {
          alert("FCM is not supported in this browser");
          return;
        }

        if (permission !== "granted") {
          setFCMToken(null);
          return;
        }

        const app = getFirebaseClientApp();
        const messaging = getMessaging(app);

        const searchParams = new URLSearchParams(
          Object.entries(firebaseConfig)
        );
        const registration = await navigator.serviceWorker.register(
          `/firebase-messaging-sw.js?${searchParams.toString()}`
        );

        const token = await getToken(messaging, {
          serviceWorkerRegistration: registration,
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        });

        setFCMToken(token);
      }}
    >
      Get FCM Token
    </button>
  );
};
