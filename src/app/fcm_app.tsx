import { getApp, getApps, initializeApp } from "firebase/app";

import { firebaseConfig } from "./config";

export const getFirebaseClientApp = () => {
  if (getApps().length === 0) {
    return initializeApp(firebaseConfig);
  }

  return getApp();
};
