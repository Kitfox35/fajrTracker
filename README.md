# 40 Days of Fajr

A 40-day contest tracker. One `index.html`, with Firebase for data and logins, hosted on GitHub Pages.

No secrets live in this repo. PINs are checked by Firebase Authentication. The Firebase config comes from a GitHub Actions secret at deploy time.

## Setup

### 1. Firebase project
1. At https://console.firebase.google.com, create a project and register a Web app (no Hosting).
2. Open **Firestore Database** and create a database named `(default)` in **production mode**.

### 2. Logins
1. Open **Authentication**, click **Get started**, and enable **Email/Password** (not email link).
2. On the **Users** tab, add both players. The password is a 4-digit PIN followed by `-fajr40`.

| Email | Password |
|---|---|
| `zayd@fajr40.example.com` | Zayd's PIN + `-fajr40` |
| `omar@fajr40.example.com` | Omar's PIN + `-fajr40` |

3. Under **Settings > User actions**, turn off **Enable create (sign-up)**.

In the app you only type the 4 digits. To change a PIN, delete that user and add it again.

### 3. Rules
Open **Firestore Database > Rules**, replace everything with `firestore.rules`, and click **Publish**.

### 4. GitHub secret
1. In the repo, open **Settings > Secrets and variables > Actions** and click **New repository secret**.
2. Name it `FIREBASE_CONFIG`. For the value, paste the whole `firebaseConfig` object from Firebase.

### 5. GitHub Pages
1. Open **Settings > Pages** and set the source to **GitHub Actions**.
2. Open **Actions > Deploy to GitHub Pages** and click **Run workflow**.

### 6. Start
Open the site, choose your name, enter your PIN, confirm the start date, and start the contest. The date and names lock when Day 1 begins.

## After every push
GitHub Pages can keep serving an old version for several minutes. Test in an incognito window, or hard-refresh with Ctrl+Shift+R (Cmd+Shift+R on Mac).

## Good to know
- If you change `WINDOW_START` or `WINDOW_END`, change `windowStart()` and `windowEnd()` in the rules too.
- Browsers need the Firebase config to connect, so it is visible on the deployed site. The rules and logins are what protect the data.
- Missed days are worked out from the date, so nobody needs the app open at 6:40.
