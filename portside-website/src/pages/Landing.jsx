import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  WA_LINK,
  MD_EMAIL,
  Logo,
  Icon,
  ChartMotifHero,
  ChartMotifGate,
  usePageMeta,
} from "../components/Shared.jsx";

const TRUST_ITEMS = [
  "BIMCO Member",
  "IBIA Member",
  "IMO Registered Company",
  "D-U-N-S Listed",
  "Licensed Fuel Wholesaler — Rep. of Maldives",
];

const CHARTER_CARDS = [
  {
    icon: '<path d="M3 17h18M5 17l2-9h10l2 9M9 8V5h6v3"/><path d="M12 12v2"/>',
    title: "Dry Cargo Chartering",
    body: "Voyage and contract business handled on standard BIMCO forms, with clean recaps and disciplined post-fixture operations.",
  },
  {
    icon: '<path d="M12 3l9 9-9 9-9-9 9-9z"/><path d="M12 9v4"/><path d="M12 16h.01"/>',
    title: "Project & Dangerous Goods Cargo",
    body: "Full charterer role executed on IMO Class 1 cargo, Asia to the Indian Ocean: fixture, loading, delivery — cargo few regional houses will carry.",
  },
  {
    icon: '<path d="M7 3h8l4 4v14H7z"/><path d="M15 3v4h4"/><path d="M10 12h6M10 16h6"/>',
    title: "Documents-First Settlement",
    body: "Freight and disbursements settled against documents on banking-day terms. Pre-funded structures. Every balance reconciled; unused funds returned unprompted.",
  },
];

const AGENCY_CARDS = [
  {
    icon: '<path d="M12 3c3 4 5 7 5 10a5 5 0 0 1-10 0c0-3 2-6 5-10z"/>',
    title: "Bunker Supply",
    body: "Marine gas oil at Malé anchorage and OPL, independently certified, licensed barge delivery.",
  },
  {
    icon: '<path d="M4 15l1.5-5h13L20 15"/><path d="M2 15h20l-2 4H4z"/><path d="M12 10V4M9 6h6"/>',
    title: "Full Ship Husbandry",
    body: "Complete port call management: clearances, disbursement accounts, pilot and anchorage coordination.",
  },
  {
    icon: '<circle cx="9" cy="8" r="3"/><path d="M4 20c0-3 2-5 5-5s5 2 5 5"/><circle cx="17" cy="9" r="2.5"/><path d="M16 15c2.5 0 4 1.8 4 4.5"/>',
    title: "Crew Changes & Welfare",
    body: "Sign-on/sign-off via Velana International Airport; proven emergency medical evacuation and hospitalization management.",
  },
  {
    icon: '<path d="M4 8l8-4 8 4v10l-8 4-8-4z"/><path d="M4 8l8 4 8-4M12 12v10"/>',
    title: "Spares, Provisions & CTM",
    body: "Spares in transit, heavy-equipment customs clearance, provisions, water, cash-to-master, launch services.",
  },
  {
    icon: '<path d="M3 18c2 1 4 1 6 0s4-1 6 0 4 1 6 0"/><path d="M6 15l6-10 6 10"/><path d="M12 5v10"/>',
    title: "Yacht & Superyacht Agency",
    body: "Clearances, cruising permits, provisioning and itinerary support across all Maldivian atolls.",
  },
  {
    icon: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
    title: "Naval & Government Vessels",
    body: "Bunker and husbandry support for naval and government vessels, executed with the discretion that work demands.",
  },
];

function jumpTo(id) {
  const el = document.getElementById(id);
  if (el) {
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 72,
      behavior: "smooth",
    });
  }
}

export default function Landing() {
  const navigate = useNavigate();
  const [subState, setSubState] = useState("idle"); // idle | busy | done | error
  const [subError, setSubError] = useState("");

  usePageMeta(
    "Portside Agency — Ship Agency & Dry Cargo Chartering, Maldives",
    "Ship agency, bunker supply and dry cargo chartering at Malé, Republic of Maldives. Trusted in live naval operations across the Indian Ocean. BIMCO member. Owner-led response, 24/7."
  );

  async function handleSubscribe(e) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    setSubState("busy");
    setSubError("");
    try {
      const { getFirestoreDb } = await import("../firebase.js");
      const { db, fsMod } = await getFirestoreDb();
      await fsMod.addDoc(fsMod.collection(db, "newsletter_subscribers"), {
        email: String(email).trim().toLowerCase(),
        createdAt: fsMod.serverTimestamp(),
        source: "website",
      });
      setSubState("done");
    } catch (err) {
      setSubState("error");
      setSubError(
        err?.message?.includes("not configured")
          ? "Subscriptions open shortly — please email us instead."
          : "Something went wrong — please try again, or email us."
      );
    }
  }

  return (
    <div style={{ background: "var(--navy)", minHeight: "100vh" }}>
      {/* ============ NAV ============ */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          padding: "16px clamp(20px,5vw,56px)",
          background: "rgba(8,27,51,.92)",
          borderBottom: "1px solid rgba(201,162,39,.25)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Logo height={44} />
          <div style={{ fontFamily: "Marcellus,serif", fontSize: 19, letterSpacing: ".06em", color: "var(--offwhite)" }}>
            PORTSIDE <span style={{ color: "var(--gold)" }}>AGENCY</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(14px,2.5vw,28px)", flexWrap: "wrap" }}>
          <a href="#ps-chartering" className="nav-link" onClick={(e) => { e.preventDefault(); jumpTo("ps-chartering"); }}>Chartering</a>
          <a href="#ps-agency" className="nav-link" onClick={(e) => { e.preventDefault(); jumpTo("ps-agency"); }}>Port Agency</a>
          <a href="#ps-gate" className="nav-link" onClick={(e) => { e.preventDefault(); jumpTo("ps-gate"); }}>Why Portside</a>
          <a href="#ps-contact" className="nav-link" onClick={(e) => { e.preventDefault(); jumpTo("ps-contact"); }}>Contact</a>
          <a href="/signin" onClick={(e) => { e.preventDefault(); navigate("/signin"); }} style={{ color: "var(--gold)", fontSize: 14, fontWeight: 500 }}>Sign in</a>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ fontSize: 14, padding: "10px 20px" }}>
            Request a Quote
          </a>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <header
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "calc(92vh - 76px)",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(180deg,#0B2545 0%,#0E2B52 60%,#0B2545 100%)",
        }}
      >
        <ChartMotifHero />
        <div style={{ position: "relative", padding: "clamp(56px,10vh,120px) clamp(20px,6vw,72px)", maxWidth: 860 }}>
          <div style={{ color: "var(--gold)", fontSize: 12, letterSpacing: ".32em", fontWeight: 600, animation: "fadeUp .7s ease both" }}>
            MALÉ • REPUBLIC OF MALDIVES • 24/7
          </div>
          <h1
            style={{
              fontFamily: "Marcellus,serif",
              fontWeight: 400,
              fontSize: "clamp(34px,5.6vw,62px)",
              lineHeight: 1.12,
              margin: "22px 0 0",
              color: "var(--offwhite)",
              textWrap: "pretty",
              animation: "fadeUp .8s ease .12s both",
            }}
          >
            Ship agency and dry cargo chartering, from the middle of the Indian Ocean.
          </h1>
          <p
            style={{
              fontSize: "clamp(16px,1.6vw,19px)",
              lineHeight: 1.65,
              color: "var(--ink-soft)",
              maxWidth: 620,
              margin: "22px 0 0",
              fontWeight: 300,
              animation: "fadeUp .8s ease .24s both",
            }}
          >
            Port services at Malé and a working chartering desk on the Asia–Africa trade lanes — trusted in live naval
            operations, disciplined on every settlement.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 34, animation: "fadeUp .8s ease .36s both" }}>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ fontSize: 15, padding: "15px 26px" }}>
              Request a Quote — WhatsApp
            </a>
            <a href={MD_EMAIL} className="btn-outline" style={{ fontSize: 15, padding: "15px 26px" }}>
              Email the Managing Director
            </a>
          </div>
          <div style={{ marginTop: 20, fontSize: 13, color: "var(--ink-mute)", animation: "fadeUp .8s ease .48s both" }}>
            Quotations within 4 working hours. Owner-led response, day or night.
          </div>
        </div>
      </header>

      {/* ============ TRUST STRIP ============ */}
      <div
        style={{
          background: "var(--navy-deep)",
          borderTop: "1px solid rgba(201,162,39,.2)",
          borderBottom: "1px solid rgba(201,162,39,.2)",
          padding: "14px clamp(20px,5vw,56px)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px 26px",
        }}
      >
        {TRUST_ITEMS.map((t) => (
          <div key={t} style={{ fontSize: 12, letterSpacing: ".14em", color: "var(--ink-mute)", textTransform: "uppercase", whiteSpace: "nowrap" }}>
            {t}
          </div>
        ))}
      </div>

      {/* ============ CHARTERING ============ */}
      <section id="ps-chartering" style={{ background: "var(--offwhite)", color: "var(--navy-2)", padding: "clamp(60px,9vw,110px) clamp(20px,6vw,72px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ color: "var(--gold-dark)", fontSize: 12, letterSpacing: ".28em", fontWeight: 600 }}>
            CHARTERING &amp; COMMODITY LOGISTICS
          </div>
          <h2 style={{ fontFamily: "Marcellus,serif", fontWeight: 400, fontSize: "clamp(30px,4vw,46px)", margin: "16px 0 0", color: "var(--navy)" }}>
            A charterer that performs.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: "#3E5573", maxWidth: 680, margin: "16px 0 0" }}>
            Portside operates an active chartering and freight desk — voyage business, project cargo, and dry bulk on the
            Asia–West Africa–Indian Ocean lanes.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20, marginTop: 40 }}>
            {CHARTER_CARDS.map((c) => (
              <div key={c.title} className="card-charter">
                <div style={{ color: "var(--navy)" }}>
                  <Icon paths={c.icon} />
                </div>
                <div style={{ fontFamily: "Marcellus,serif", fontSize: 20, color: "var(--navy)", marginTop: 14 }}>{c.title}</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--body-soft)", marginTop: 8 }}>{c.body}</div>
              </div>
            ))}
          </div>
          <p style={{ fontStyle: "italic", fontSize: 14, color: "var(--body-soft)", margin: "28px 0 0", maxWidth: 760 }}>
            Owners and brokers: company registry, memberships, and executed-operation records are available behind the
            gate, and full documentation to qualified counterparties under NDA.
          </p>
        </div>
      </section>

      {/* ============ PORT AGENCY ============ */}
      <section id="ps-agency" style={{ background: "var(--mist)", color: "var(--navy-2)", padding: "clamp(60px,9vw,110px) clamp(20px,6vw,72px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ color: "var(--gold-dark)", fontSize: 12, letterSpacing: ".28em", fontWeight: 600 }}>PORT AGENCY</div>
          <h2 style={{ fontFamily: "Marcellus,serif", fontWeight: 400, fontSize: "clamp(28px,3.6vw,42px)", margin: "16px 0 0", color: "var(--navy)" }}>
            What we handle at Malé.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18, marginTop: 40 }}>
            {AGENCY_CARDS.map((c) => (
              <div key={c.title} className="card-agency">
                <div style={{ color: "var(--navy)", flexShrink: 0, marginTop: 2 }}>
                  <Icon paths={c.icon} />
                </div>
                <div>
                  <div style={{ fontFamily: "Marcellus,serif", fontSize: 18, color: "var(--navy)" }}>{c.title}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.6, color: "var(--body-soft)", marginTop: 6 }}>{c.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ THE GATE ============ */}
      <section id="ps-gate" style={{ position: "relative", overflow: "hidden", background: "var(--navy-deep)", padding: "clamp(70px,10vw,120px) clamp(20px,6vw,72px)" }}>
        <ChartMotifGate />
        <div style={{ position: "relative", maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <div style={{ color: "var(--gold)", fontSize: 12, letterSpacing: ".32em", fontWeight: 600 }}>MEMBERS</div>
          <h2 style={{ fontFamily: "Marcellus,serif", fontWeight: 400, fontSize: "clamp(30px,4vw,46px)", margin: "18px 0 0", color: "var(--offwhite)" }}>
            The full record is behind the gate.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--ink-soft)", margin: "20px 0 0", fontWeight: 300 }}>
            Our track record includes live naval operations, seven-figure fuel deliveries, a full charterer role on
            dangerous-goods cargo, and documented financial integrity that we do not publish on the open web. Create a
            free account to see who we are, how we work, and what we&rsquo;ve delivered — discreetly.
          </p>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", justifyContent: "center", alignItems: "center", marginTop: 32 }}>
            <a href="/signup" onClick={(e) => { e.preventDefault(); navigate("/signup"); }} className="btn-gold" style={{ fontSize: 15, padding: "15px 28px" }}>
              Create a free account
            </a>
            <a href="/signin" onClick={(e) => { e.preventDefault(); navigate("/signin"); }} style={{ color: "var(--gold)", fontSize: 14 }}>
              Already registered? Sign in
            </a>
          </div>
          <div style={{ marginTop: 20, fontSize: 12, color: "var(--ink-mute)" }}>
            Client identities are never disclosed. Full documentation available to qualified counterparties under NDA.
          </div>
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <section style={{ background: "var(--offwhite)", padding: "clamp(50px,7vw,80px) clamp(20px,6vw,72px)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: "Marcellus,serif", fontSize: "clamp(22px,2.6vw,28px)", color: "var(--navy)" }}>
            Port intelligence from the middle of the Indian Ocean.
          </div>
          <p style={{ fontSize: 14.5, color: "var(--body-soft)", margin: "10px 0 0" }}>
            Occasional updates on Malé port conditions, bunker availability, and Indian Ocean freight — no noise.
          </p>
          {subState === "done" ? (
            <div style={{ marginTop: 24, color: "var(--gold-dark)", fontSize: 15, letterSpacing: ".04em" }}>
              Subscribed. Fair winds.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginTop: 24 }}>
              <input type="email" name="email" required placeholder="you@company.com" className="input-newsletter" style={{ width: "auto" }} />
              <button type="submit" className="btn-gold" disabled={subState === "busy"} style={{ fontSize: 15, padding: "13px 26px" }}>
                {subState === "busy" ? "Subscribing…" : "Subscribe"}
              </button>
              {subState === "error" && (
                <div style={{ flexBasis: "100%", marginTop: 8, fontSize: 13, color: "#B3261E" }}>{subError}</div>
              )}
            </form>
          )}
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section id="ps-contact" style={{ background: "var(--navy)", padding: "clamp(70px,10vw,110px) clamp(20px,6vw,72px)", textAlign: "center", borderTop: "1px solid rgba(201,162,39,.2)" }}>
        <h2 style={{ fontFamily: "Marcellus,serif", fontWeight: 400, fontSize: "clamp(30px,4.4vw,50px)", margin: 0, color: "var(--offwhite)" }}>
          Ready when your vessel is.
        </h2>
        <p style={{ fontSize: 16, color: "var(--ink-soft)", maxWidth: 600, margin: "18px auto 0", lineHeight: 1.65, fontWeight: 300 }}>
          Owners, brokers, and principals — send your requirement and receive a complete, itemized response within 4
          working hours.
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginTop: 32 }}>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ fontSize: 15, padding: "15px 28px" }}>
            WhatsApp +960 9993997
          </a>
          <a href={MD_EMAIL} className="btn-outline" style={{ fontSize: 15, padding: "15px 28px" }}>
            afeef@portsideagency.com
          </a>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer style={{ background: "var(--navy-deep)", padding: "44px clamp(20px,6vw,72px) 100px", borderTop: "1px solid rgba(201,162,39,.18)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 28, justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ maxWidth: 420 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Logo height={40} style={{ opacity: 0.9 }} />
              <div style={{ fontFamily: "Marcellus,serif", fontSize: 17, letterSpacing: ".06em", color: "var(--offwhite)" }}>
                PORTSIDE <span style={{ color: "var(--gold)" }}>AGENCY</span>
              </div>
            </div>
            <div style={{ fontSize: 13, color: "var(--ink-mute)", marginTop: 14, lineHeight: 1.7 }}>
              Portside Agency Pvt Ltd | H. Maadhoofiya, 10th Floor, Malé 20082, Republic of Maldives
            </div>
            <div style={{ fontSize: 11.5, color: "#93A7C2", marginTop: 10, lineHeight: 1.8 }}>
              Reg. No. C00212023 | TIN 1154492 | D-U-N-S 984560571 | IMO Company No. 6418086 | BIMCO Member 180506 | IBIA
              Member S2748
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
            <a href="/signin" className="footer-link" onClick={(e) => { e.preventDefault(); navigate("/signin"); }}>Sign in</a>
            <a href="/signup" className="footer-link" onClick={(e) => { e.preventDefault(); navigate("/signup"); }}>Create account</a>
            <a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>Privacy</a>
            <a href="#ps-contact" className="footer-link" onClick={(e) => { e.preventDefault(); jumpTo("ps-contact"); }}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
