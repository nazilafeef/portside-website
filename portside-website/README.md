# Portside Agency — Website

Production React website for **portsideagency.com** — landing page, sign-in,
create-account, and member area, with a working newsletter subscription.
Built with Vite + React, deployed on Firebase Hosting, routed via Cloudflare.

------------------------------------------------------------------
## STEP 1 — Run it on your computer (VS Code)

1. Install Node.js 20+ from https://nodejs.org (LTS version).
2. Open this folder in VS Code → Terminal → run:

       npm install
       npm run dev

3. Open http://localhost:5173 — the full site runs locally.
   (Sign-in and newsletter will say "opens shortly" until Step 2 is done.)

------------------------------------------------------------------
## STEP 2 — Create your Firebase project (one time, ~10 minutes)

1. Go to https://console.firebase.google.com → **Add project** → name it
   `portside-agency` (Analytics optional).
2. In the project: click the **</> (Web)** icon → register app "Portside
   Website" → Firebase shows a `firebaseConfig` block.
3. Copy those values into **`src/firebase-config.js`** (replace the
   PASTE_YOUR_... placeholders). These keys are safe to commit — security
   comes from the rules, not the keys.
4. **Authentication** → Get started → Sign-in method → enable
   **Email/Password** and **Google**.
5. **Firestore Database** → Create database → Production mode → nearest
   region (asia-south1 Mumbai is closest to Malé).
6. Authentication → **Settings → Authorized domains** → add
   `portsideagency.com` and `www.portsideagency.com`.

Newsletter subscribers appear in Firestore under `newsletter_subscribers`.
Registered members appear under `members` and in Authentication → Users.

------------------------------------------------------------------
## STEP 3 — Put the code on GitHub (VS Code)

1. Create an empty repo on https://github.com (e.g. `portside-website`,
   private is fine).
2. In VS Code terminal, inside this folder:

       git init
       git add .
       git commit -m "Portside website v1"
       git branch -M main
       git remote add origin https://github.com/YOUR_USERNAME/portside-website.git
       git push -u origin main

------------------------------------------------------------------
## STEP 4 — First deploy to Firebase Hosting

1. In the VS Code terminal:

       npm install -g firebase-tools
       firebase login
       firebase use --add        (pick your project, alias "default")

2. Also replace `YOUR_FIREBASE_PROJECT_ID` in `.firebaserc` and in
   `.github/workflows/firebase-deploy.yml` with your real project ID.
3. Deploy the security rules and the site:

       npm run build
       firebase deploy

Your site is now live at `https://YOUR_PROJECT_ID.web.app`.

------------------------------------------------------------------
## STEP 5 — Automatic deploys from GitHub (optional but recommended)

Run once:

       firebase init hosting:github

Answer: your repo name → yes to build script (`npm ci && npm run build`) →
yes deploy on merge to `main`. Firebase creates the service-account secret
in GitHub automatically. From then on, every push to `main` goes live by
itself. (The included workflow file `.github/workflows/firebase-deploy.yml`
does the same job — keep whichever one Firebase generates.)

------------------------------------------------------------------
## STEP 6 — Connect your domain + Cloudflare

1. Firebase console → Hosting → **Add custom domain** →
   `www.portsideagency.com` (and `portsideagency.com`). Firebase shows you
   DNS records (a TXT for verification and A/CNAME records).
2. In **Cloudflare** → your domain → DNS → add exactly those records.
   IMPORTANT: while Firebase verifies and issues the SSL certificate,
   set the records to **DNS only (grey cloud)**. After the certificate
   shows "Connected" in Firebase (up to 24h), you may switch to
   **Proxied (orange cloud)** for Cloudflare's CDN and protection.
3. Cloudflare → SSL/TLS → set mode to **Full (strict)**.

------------------------------------------------------------------
## Reading your newsletter list

Firebase console → Firestore → `newsletter_subscribers` — every email with
date subscribed. When you're ready to send newsletters, export these or
connect a sending tool; the collection is already the master list.

------------------------------------------------------------------
## Project map

    index.html                    SEO meta, fonts, structured data
    src/main.jsx                  Routes: / /signin /signup /member
    src/pages/Landing.jsx         Public landing page (newsletter included)
    src/pages/SignIn.jsx          Firebase sign-in (Google + email)
    src/pages/SignUp.jsx          Account creation
    src/pages/Member.jsx          Protected member area
    src/firebase-config.js        <-- YOUR KEYS GO HERE
    firestore.rules               Security: newsletter create-only, members own-data-only
    firebase.json                 Hosting + cache headers + SPA rewrite
    .github/workflows/            Auto-deploy on push to main
