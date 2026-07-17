// ============================================================
// FIREBASE CONFIGURATION — FILL THIS IN BEFORE DEPLOYING
// ============================================================
// 1. Go to https://console.firebase.google.com and create a project
//    (e.g. "portside-agency").
// 2. Add a Web App (</> icon) — Firebase shows you this exact config block.
// 3. Copy your values over the placeholders below.
//
// NOTE: these web keys are safe to commit — they identify your project
// publicly; security is enforced by Firebase Auth + Firestore rules
// (see firestore.rules in the project root).

export const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "PASTE_YOUR_PROJECT.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_PROJECT.appspot.com",
  messagingSenderId: "PASTE_YOUR_SENDER_ID",
  appId: "PASTE_YOUR_APP_ID",
};

export const isFirebaseConfigured = !firebaseConfig.apiKey.startsWith("PASTE");
