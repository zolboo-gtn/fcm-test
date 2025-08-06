"use client";

import { atom, useAtom, useSetAtom } from "jotai";

export const notificationPermissionAtom =
  atom<NotificationPermission>("default");
export const NotificationPermission = () => {
  const setPermission = useSetAtom(notificationPermissionAtom);

  return (
    <button
      onClick={async () => {
        if (!("Notification" in globalThis)) {
          alert("Notification API is not supported in this browser");
          return;
        }

        const permission = await Notification.requestPermission();
        setPermission(permission);

        const notificationPermission = await navigator.permissions.query({
          name: "notifications",
        });
        notificationPermission.addEventListener("change", () => {
          if (
            notificationPermission.state === "granted" ||
            notificationPermission.state === "denied"
          ) {
            setPermission(notificationPermission.state);
          }
        });
      }}
    >
      Request Permission
    </button>
  );
};
