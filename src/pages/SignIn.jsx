import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo, ChartMotifAuth, GoogleMark, usePageMeta } from "../components/Shared.jsx";

function friendlyAuthError(err) {
  const code = err?.code || "";
  if (code.includes("invalid-credential") || code.includes("wrong-password") || code.includes("user-not-found"))
    return "Email or password doesn't match our records. Check both, or create an account.";
  if (code.includes("too-many-requests")) return "Too many attempts. Wait a moment and try again.";
  if (code.includes("popup-closed")) return "The Google window was closed before finishing. Try again.";
  if (err?.message?.includes("not configured"))
    return "Sign-in opens shortly. Please contact us by WhatsApp or email meanwhile.";
  return "Sign-in didn't go through. Check your connection and try again.";
}

export default function SignIn() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  usePageMeta("Sign in — Portside Agency", "Sign in to the Portside Agency member area.");

  async function withAuth(fn) {
    setBusy(true);
    setError("");
    try {
      const { getFirebaseAuth } = await import("../firebase.js");
      const { auth, authMod } = await getFirebaseAuth();
      await fn(auth, authMod);
      navigate("/member");
    } catch (err) {
      setError(friendlyAuthError(err));
    } finally {
      setBusy(false);
    }
  }

  function handleGoogle() {
    withAuth(async (auth, m) => {
      const provider = new m.GoogleAuthProvider();
      await m.signInWithPopup(auth, provider);
    });
  }

  function handleEmail(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    withAuth((auth, m) => m.signInWithEmailAndPassword(auth, email, password));
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
      <div className="auth-card" style={{ width: "min(400px,92vw)" }}>
        <div style={{ fontFamily: "Marcellus,serif", fontSize: 26, color: "var(--navy)", textAlign: "center" }}>
          Welcome back aboard.
        </div>
        <button onClick={handleGoogle} disabled={busy} className="btn-google" style={{ marginTop: 24 }}>
          <GoogleMark />
          Continue with Google
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
          <div style={{ flex: 1, height: 1, background: "#DCE4EF" }} />
          <div style={{ fontSize: 12, color: "#62748C" }}>or</div>
          <div style={{ flex: 1, height: 1, background: "#DCE4EF" }} />
        </div>
        <form onSubmit={handleEmail} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input type="email" name="email" required placeholder="Email" className="input-light" autoComplete="email" />
          <input type="password" name="password" required placeholder="Password" className="input-light" autoComplete="current-password" />
          {error && <div className="form-error">{error}</div>}
          <button type="submit" disabled={busy} className="btn-gold" style={{ fontSize: 15, padding: 13 }}>
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap", marginTop: 18, fontSize: 13 }}>
          <a
            href="#"
            style={{ color: "var(--body-soft)" }}
            onClick={async (e) => {
              e.preventDefault();
              const email = prompt("Enter your account email to receive a reset link:");
              if (!email) return;
              try {
                const { getFirebaseAuth } = await import("../firebase.js");
                const { auth, authMod } = await getFirebaseAuth();
                await authMod.sendPasswordResetEmail(auth, email);
                alert("Reset link sent. Check your inbox.");
              } catch {
                alert("Couldn't send the reset link. Check the email address and try again.");
              }
            }}
          >
            Forgot password?
          </a>
          <span style={{ color: "#C4D0E0" }}>•</span>
          <a href="/signup" onClick={(e) => { e.preventDefault(); navigate("/signup"); }} style={{ color: "var(--gold-dark)", fontWeight: 500 }}>
            New here? Create an account
          </a>
        </div>
        <div style={{ textAlign: "center", fontSize: 11, color: "#62748C", marginTop: 20, borderTop: "1px solid #EEF2F8", paddingTop: 14 }}>
          Protected by Google Firebase Authentication.
        </div>
      </div>
    </div>
  );
}
