import { useEffect } from "react";

export const WA_LINK = "https://wa.me/9609249669";
export const MD_EMAIL = "mailto:admin@portsideagency.com";

/* Per-route document title + description for SEO */
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (tag) tag.setAttribute("content", description);
    }
  }, [title, description]);
}

/* Line-art icon wrapper (matches prototype stroke style) */
export function Icon({ paths, size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: paths }}
    />
  );
}

export function Logo({ height = 44, onClick, style = {} }) {
  return (
    <img
      src="/Logo.png"
      alt="Portside Agency"
      onClick={onClick}
      style={{
        height,
        width: height,
        objectFit: "contain",
        filter: "brightness(0) invert(1)",
        cursor: onClick ? "pointer" : undefined,
        ...style,
      }}
    />
  );
}

/* Nautical-chart motif — hero variant */
export function ChartMotifHero({ opacity = 0.6 }) {
  return (
    <svg
      viewBox="0 0 900 700"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity }}
      aria-hidden="true"
    >
      <g fill="none" stroke="#C9A227" strokeWidth="1" opacity="0.16">
        <path d="M-50 520 Q 140 460 300 505 T 640 480 T 980 520" />
        <path d="M-50 580 Q 150 520 320 565 T 660 540 T 980 580" />
        <path d="M-50 640 Q 160 590 340 630 T 680 600 T 980 640" />
        <path d="M-50 700 Q 170 655 360 690 T 700 660 T 980 700" />
        <path d="M120 40 L 860 560" strokeDasharray="2 7" />
        <path d="M40 300 L 880 130" strokeDasharray="2 7" />
        <path d="M420 -20 L 700 700" strokeDasharray="2 7" />
        <circle cx="700" cy="190" r="100" />
        <circle cx="700" cy="190" r="80" strokeDasharray="1 6" />
        <path d="M700 96 L716 174 L794 190 L716 206 L700 284 L684 206 L606 190 L684 174 Z" />
        <path d="M662 152 L700 178 L738 152 L712 190 L738 228 L700 202 L662 228 L688 190 Z" opacity=".7" />
        <path d="M700 66 L700 96" />
        <path d="M160 170 h12 M166 164 v12" />
        <path d="M300 380 h12 M306 374 v12" />
        <path d="M520 260 h12 M526 254 v12" />
        <path d="M240 560 h12 M246 554 v12" />
      </g>
    </svg>
  );
}

/* Chart motif — gate/panel variant */
export function ChartMotifGate({ opacity = 0.5 }) {
  return (
    <svg
      viewBox="0 0 900 500"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity }}
      aria-hidden="true"
    >
      <g fill="none" stroke="#C9A227" strokeWidth="1" opacity="0.14">
        <path d="M-50 360 Q 140 300 300 345 T 640 320 T 980 360" />
        <path d="M-50 420 Q 150 360 320 405 T 660 380 T 980 420" />
        <path d="M-50 480 Q 160 430 340 470 T 680 440 T 980 480" />
        <path d="M100 20 L 840 460" strokeDasharray="2 7" />
        <circle cx="770" cy="120" r="70" />
        <circle cx="770" cy="120" r="55" strokeDasharray="1 6" />
        <path d="M770 56 L781 109 L834 120 L781 131 L770 184 L759 131 L706 120 L759 109 Z" />
      </g>
    </svg>
  );
}

/* Chart motif — auth screens variant */
export function ChartMotifAuth() {
  return (
    <svg
      viewBox="0 0 900 700"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5 }}
      aria-hidden="true"
    >
      <g fill="none" stroke="#C9A227" strokeWidth="1" opacity="0.14">
        <path d="M-50 520 Q 140 460 300 505 T 640 480 T 980 520" />
        <path d="M-50 580 Q 150 520 320 565 T 660 540 T 980 580" />
        <path d="M-50 640 Q 160 590 340 630 T 680 600 T 980 640" />
        <path d="M120 40 L 860 560" strokeDasharray="2 7" />
        <circle cx="720" cy="150" r="90" />
        <circle cx="720" cy="150" r="72" strokeDasharray="1 6" />
        <path d="M720 66 L734 136 L804 150 L734 164 L720 234 L706 164 L636 150 L706 136 Z" />
      </g>
    </svg>
  );
}

/* Chart motif — member "coming soon" panel variant */
export function ChartMotifPanel() {
  return (
    <svg
      viewBox="0 0 900 400"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5 }}
      aria-hidden="true"
    >
      <g fill="none" stroke="#C9A227" strokeWidth="1" opacity="0.14">
        <path d="M-50 280 Q 140 220 300 265 T 640 240 T 980 280" />
        <path d="M-50 340 Q 150 280 320 325 T 660 300 T 980 340" />
        <path d="M100 10 L 840 380" strokeDasharray="2 7" />
        <circle cx="780" cy="100" r="60" />
        <path d="M780 46 L789 91 L834 100 L789 109 L780 154 L771 109 L726 100 L771 91 Z" />
      </g>
    </svg>
  );
}

export function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

/* Sticky WhatsApp pill — visible on every screen */
export function WhatsAppPill() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-gold"
      style={{
        position: "fixed",
        right: 18,
        bottom: 18,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        gap: 9,
        fontSize: 14,
        padding: "12px 20px",
        borderRadius: 999,
        boxShadow: "0 10px 26px rgba(0,0,0,.35)",
      }}
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="#0B2545">
        <path d="M12 2A10 10 0 0 0 2 12a9.9 9.9 0 0 0 1.4 5.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.2s-1 .3-3.4-.7a11.7 11.7 0 0 1-4.8-4.4 5.6 5.6 0 0 1-1.1-3 3.2 3.2 0 0 1 1-2.4 1 1 0 0 1 .8-.3h.6c.2 0 .4 0 .6.5l.9 2.1a.6.6 0 0 1 0 .6 6 6 0 0 1-.7.9c-.2.2-.3.4-.1.7a8.8 8.8 0 0 0 1.6 2 8 8 0 0 0 2.3 1.4c.3.2.5.1.7-.1s.8-.9 1-1.2.4-.3.7-.2l2 1c.3.1.5.2.6.4a2.6 2.6 0 0 1-.1 1.5z" />
      </svg>
      WhatsApp 24/7
    </a>
  );
}
