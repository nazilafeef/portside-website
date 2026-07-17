import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo, ChartMotifAuth, GoogleMark, usePageMeta } from "../components/Shared.jsx";

function friendlyAuthError(err) {
  const code = err?.code || "";
  if (code.includes("email-already-in-use")) return "That email already has an account. Sign in instead.";
  if (code.includes("weak-password")) return "Password must be at least 6 characters.";
  if (code.includes("invalid-email")) return "That email address doesn't look right. Check it and try again.";
  if (code.includes("popup-closed")) return "The Google window was closed before finishing. Try again.";
  if (err?.message?.includes("not configured"))
    return "Registration opens shortly. Please contact us by WhatsApp or email meanwhile.";
  return "Registration didn't go through. Check your connection and try again.";
}

export default function SignUp() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  usePageMeta(
    "Request access — Portside Agency",
    "Free registration for shipowners, brokers, and shipping professionals."
  );

  async function saveMemberRecord(user, extra = {}) {
    try {
      const { getFirestoreDb } = await import("../firebase.js");
      const { db, fsMod } = await getFirestoreDb();
      await fsMod.setDoc(
        fsMod.doc(db, "members", user.uid),
        {
          name: user.displayName || extra.name || "",
          email: user.email || "",
          company: extra.company || "",
          createdAt: fsMod.serverTimestamp(),
        },
        { merge: true }
      );
    } catch {
      // Member record is best-effort; account creation already succeeded.
    }
  }

  async function handleGoogle() {
    setBusy(true);
    setError("");
    try {
      const { getFirebaseAuth } = await import("../firebase.js");
      const { auth, authMod } = await getFirebaseAuth();
      const provider = new authMod.GoogleAuthProvider();
      const cred = await authMod.signInWithPopup(auth, provider);
      await saveMemberRecord(cred.user);
      navigate("/member");
    } catch (err) {
      setError(friendlyAuthError(err));
    } finally {
      setBusy(false);
    }
  }

  async function handleEmail(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const company = String(data.get("company") || "").trim();
    const email = data.get("email");
    const password = data.get("password");
    setBusy(true);
    setError("");
    try {
      const { getFirebaseAuth } = await import("../firebase.js");
      const { auth, authMod } = await getFirebaseAuth();
      const cred = await authMod.createUserWithEmailAndPassword(auth, email, password);
      await authMod.updateProfile(cred.user, { displayName: name });
      await saveMemberRecord(cred.user, { name, company });
      navigate("/member");
    } catch (err) {
      setError(friendlyAuthError(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg,#0B2545,#0E2B52)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 20px 110px",
      }}
    >
      <ChartMotifAuth />
      <div style={{ position: "relative", marginBottom: 22 }}>
        <Logo height={76} onClick={() => navigate("/")} />
      </div>
      <div className="auth-card" style={{ width: "min(420px,92vw)" }}>
        <div style={{ fontFamily: "Marcellus,serif", fontSize: 26, color: "var(--navy)", textAlign: "center" }}>
          Request access.
        </div>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--body-soft)", textAlign: "center", margin: "12px 0 0" }}>
          Free registration for shipowners, brokers, and shipping professionals — see our full track record and, soon,
          manage your business with us online.
        </p>
        <button onClick={handleGoogle} disabled={busy} className="btn-google" style={{ marginTop: 22 }}>
          <GoogleMark />
          Continue with Google
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
          <div style={{ flex: 1, height: 1, background: "#DCE4EF" }} />
          <div style={{ fontSize: 12, color: "var(--ink-mute)" }}>or</div>
          <div style={{ flex: 1, height: 1, background: "#DCE4EF" }} />
        </div>
        <form onSubmit={handleEmail} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input type="text" name="name" required placeholder="Full name" className="input-light" autoComplete="name" />
          <input type="text" name="company" placeholder="Company (optional)" className="input-light" autoComplete="organization" />
          <input type="email" name="email" required placeholder="Email" className="input-light" autoComplete="email" />
          <input type="password" name="password" required placeholder="Password" className="input-light" autoComplete="new-password" />
          {error && <div className="form-error">{error}</div>}
          <button type="submit" disabled={busy} className="btn-gold" style={{ fontSize: 15, padding: 13 }}>
            {busy ? "Creating account…" : "Create account"}
          </button>
        </form>
        <div style={{ textAlign: "center", fontSize: 11.5, color: "var(--ink-mute)", marginTop: 14 }}>
          By registering you agree to our terms. We never share your details.
        </div>
        <div style={{ textAlign: "center", fontSize: 13, marginTop: 14 }}>
          <a href="/signin" onClick={(e) => { e.preventDefault(); navigate("/signin"); }} style={{ color: "var(--gold-dark)", fontWeight: 500 }}>
            Already registered? Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
