"use client";

import { useAtomValue } from "jotai";

import { fcmTokenAtom } from "./fcm_token";
import { notificationPermissionAtom } from "./notification_permission";
import { setBadge } from "./set_badge";

export const FCM = () => {
  const fcmToken = useAtomValue(fcmTokenAtom);
  const notificationPermission = useAtomValue(notificationPermissionAtom);

  return (
    <div className="flex flex-col items-start gap-2">
      <div>FCM Token: {fcmToken}</div>
      <div>Notification Permission: {notificationPermission}</div>
      <button onClick={() => setBadge(1)}>Set favicon badge</button>
      <button
        onClick={async () => {
          if (!("setAppBadge" in navigator)) {
            alert("setAppBadge is not supported in this browser");
            return;
          }
          await navigator.setAppBadge(1);
        }}
      >
        Set Badge
      </button>
    </div>
  );
};
