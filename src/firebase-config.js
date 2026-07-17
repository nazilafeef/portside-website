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
  apiKey: "AIzaSyCfirJRDJhZSzLVgV0MD9N_oWoHDxjUKN4",
  authDomain: "portside-agency-v1-8dbdd.firebaseapp.com",
  projectId: "portside-agency-v1-8dbdd",
  storageBucket: "portside-agency-v1-8dbdd.firebasestorage.app",
  messagingSenderId: "803366976996",
  appId: "1:803366976996:web:bac69f49d4e6605bd69bf1",
  measurementId: "G-RE66XCJLNF"
};

export const isFirebaseConfigured = !firebaseConfig.apiKey.startsWith("PASTE");
