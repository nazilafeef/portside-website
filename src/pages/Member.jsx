import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WA_LINK, MD_EMAIL, Logo, ChartMotifPanel, usePageMeta } from "../components/Shared.jsx";

const RECORD_CARDS = [
  {
    title: "Live naval operation, Malé Anchorage",
    body: "A major marine fuel supply executed for an allied naval vessel under contract with an international defense logistics partner. Delivered on schedule; every unused dollar of the client's advance refunded unprompted, verified by bank records.",
  },
  {
    title: "Full charterer role — IMO Class 1 cargo, Asia → Indian Ocean",
    body: "Dangerous-goods project cargo chartered and delivered in full charterer capacity: fixture, loading, delivery. Post-fixture operations run in-house, settled clean.",
  },
  {
    title: "Full port operation with medical emergency",
    body: "Weeks-long husbandry for a foreign-flag vessel: bunkering, provisions, equipment clearance — plus emergency medical evacuation and extended hospitalization management for a senior officer.",
  },
  {
    title: "How we settle",
    body: "Pre-funded disbursement structures, itemized proforma accounts, freight and balances settled against documents on banking-day terms. Financial discipline is the product.",
  },
];

export default function Member() {
  const navigate = useNavigate();
  const [user, setUser] = useState(undefined); // undefined = loading, null = signed out

  usePageMeta("Member area — Portside Agency", "Portside Agency member area.");

  useEffect(() => {
    let unsub = () => {};
    (async () => {
      try {
        const { getFirebaseAuth } = await import("../firebase.js");
        const { auth, authMod } = await getFirebaseAuth();
        unsub = authMod.onAuthStateChanged(auth, (u) => {
          if (!u) navigate("/signin", { replace: true });
          else setUser(u);
        });
      } catch {
        navigate("/signin", { replace: true });
      }
    })();
    return () => unsub();
  }, [navigate]);

  async function handleSignOut() {
    try {
      const { getFirebaseAuth } = await import("../firebase.js");
      const { auth, authMod } = await getFirebaseAuth();
      await authMod.signOut(auth);
    } finally {
      navigate("/signin");
    }
  }

  if (user === undefined) {
    return (
      <div style={{ minHeight: "100vh", background: "#F0F3F9", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--body-soft)", fontSize: 14 }}>
        Loading your member area…
      </div>
    );
  }

  const firstName = (user.displayName || user.email || "Member").trim().split(/\s+/)[0].split("@")[0];
  const initials = (user.displayName || firstName)
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div style={{ background: "#F0F3F9", minHeight: "100vh", color: "var(--navy-2)" }}>
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
          padding: "12px clamp(20px,5vw,56px)",
          background: "var(--navy)",
          borderBottom: "1px solid rgba(201,162,39,.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => navigate("/")}>
          <Logo height={36} />
          <div style={{ fontFamily: "Marcellus,serif", fontSize: 16, letterSpacing: ".06em", color: "var(--offwhite)" }}>
            PORTSIDE <span style={{ color: "var(--gold)" }}>AGENCY</span>
          </div>
          <div style={{ fontSize: 11, letterSpacing: ".22em", color: "var(--ink-mute)", borderLeft: "1px solid rgba(201,162,39,.4)", paddingLeft: 12, textTransform: "uppercase" }}>
            Member area
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "var(--gold)",
              color: "var(--navy)",
              fontWeight: 600,
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {initials}
          </div>
          <a href="#" onClick={(e) => { e.preventDefault(); handleSignOut(); }} style={{ color: "var(--ink-soft)", fontSize: 13 }} className="footer-link">
            Sign out
          </a>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(40px,6vw,64px) clamp(20px,5vw,48px) 120px" }}>
        <h1 style={{ fontFamily: "Marcellus,serif", fontWeight: 400, fontSize: "clamp(30px,4vw,44px)", color: "var(--navy)", margin: 0 }}>
          Welcome aboard, {firstName}.
        </h1>

        <div style={{ color: "var(--gold-dark)", fontSize: 12, letterSpacing: ".28em", fontWeight: 600, marginTop: 34 }}>
          WHO YOU&rsquo;RE WORKING WITH
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(400px,100%),1fr))", gap: 20, marginTop: 20 }}>
          {RECORD_CARDS.map((r) => (
            <div key={r.title} className="card-record">
              <div style={{ fontFamily: "Marcellus,serif", fontSize: 20, color: "var(--navy)", lineHeight: 1.3 }}>{r.title}</div>
              <div style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--body-soft)", marginTop: 12 }}>{r.body}</div>
            </div>
          ))}
        </div>

        {/* Coming soon panel */}
        <div style={{ position: "relative", overflow: "hidden", background: "var(--navy-deep)", borderRadius: 4, marginTop: 36, padding: "clamp(36px,5vw,56px)" }}>
          <ChartMotifPanel />
          <div style={{ position: "relative", maxWidth: 560 }}>
            <div style={{ color: "var(--gold)", fontSize: 11, letterSpacing: ".3em", fontWeight: 600 }}>COMING SOON</div>
            <div style={{ fontFamily: "Marcellus,serif", fontSize: "clamp(24px,3vw,32px)", color: "var(--offwhite)", marginTop: 14 }}>
              Your business with Portside, online.
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink-soft)", margin: "14px 0 0", fontWeight: 300 }}>
              Track fixtures, disbursement accounts, documents, and service requests in one place. The Portside client
              portal is in build.
            </p>
          </div>
        </div>

        {/* Contact rail */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 36 }}>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ fontSize: 14.5, padding: "13px 24px" }}>
            WhatsApp the desk
          </a>
          <a href={MD_EMAIL} style={{ border: "1px solid var(--gold-dark)", color: "var(--gold-dark)", fontWeight: 500, fontSize: 14.5, padding: "13px 24px", borderRadius: 3, display: "inline-block" }}>
            Email the desk
          </a>
        </div>
      </div>
    </div>
  );
}
