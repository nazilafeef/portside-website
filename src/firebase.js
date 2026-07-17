// Lazy Firebase loader — the Firebase SDK is only downloaded when the
// visitor actually signs in, creates an account, or subscribes.
// This keeps the public landing page extremely fast.

import { firebaseConfig, isFirebaseConfigured } from "./firebase-config.js";

let appPromise = null;

async function getApp() {
  if (!isFirebaseConfigured) {
    throw new Error(
      "Firebase is not configured yet. Fill in src/firebase-config.js with your project keys."
    );
  }
  if (!appPromise) {
    appPromise = import("firebase/app").then(({ initializeApp, getApps }) => {
      const apps = getApps();
      return apps.length ? apps[0] : initializeApp(firebaseConfig);
    });
  }
  return appPromise;
}

export async function getFirebaseAuth() {
  const app = await getApp();
  const authMod = await import("firebase/auth");
  return { auth: authMod.getAuth(app), authMod };
}

export async function getFirestoreDb() {
  const app = await getApp();
  const fsMod = await import("firebase/firestore");
  return { db: fsMod.getFirestore(app), fsMod };
}

export { isFirebaseConfigured };
