# MikroSti SE-213

Microeconomics practice app. Anyone can use it right away; users who create an account get their progress saved in Supabase.

```
public/index.html              ← the website (everything in public/ gets published)
supabase/schema.sql            ← database tables + security rules
.github/workflows/deploy.yml   ← publishes to GitHub Pages on every push to main
```

## 1. Set up Supabase (about 5 minutes)

1. **Create the tables:** in your Supabase project, open **SQL Editor → New query**, paste all of `supabase/schema.sql` and click **Run**.
2. **Get your keys:** go to **Project Settings → API** and copy the **Project URL** and the **publishable** key (`sb_publishable_…`, or the legacy anon key).
3. **Paste them into the app:** open `public/index.html`. Near the top, replace `https://YOUR-PROJECT-ID.supabase.co` and `YOUR-ANON-KEY` with your values.
   The anon key is meant to be public. Never paste the **service_role** key anywhere in this project.
4. **Set the site address:** under **Authentication → URL Configuration**:
   - **Site URL:** `https://yourdomain.no`
   - **Redirect URLs:** add `https://yourdomain.no/**`. Add `http://localhost:8000/**` too if you want to test locally.
   These settings make the confirmation and password-reset emails link back to your site.
5. *(Optional)* To let people log in without confirming their email first, go to **Authentication → Sign In / Providers → Email** and turn off **Confirm email**. You can also change the email text under **Authentication → Emails**.

## 2. Put it on GitHub

1. On github.com, click **New repository**. Name it (for example `mikrosti`), make it **Public**, and don't add a README.
2. Upload the files in one of two ways:
   - **Easiest:** on the empty repo page, click **uploading an existing file** and drag in the *contents* of this folder: `public`, `supabase`, `README.md`.
     Then create the workflow file separately, because the browser upload skips hidden folders. Click **Add file → Create new file**, name it `.github/workflows/deploy.yml`, and paste in the contents of that file.
   - **With git, from inside this folder:**
     ```
     git init -b main
     git add .
     git commit -m "MikroSti with accounts"
     git remote add origin https://github.com/YOURNAME/mikrosti.git
     git push -u origin main
     ```
3. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
4. Open the **Actions** tab. The deploy runs automatically; if it ran before step 3 and failed, click **Re-run**. After a minute the site is live at `https://YOURNAME.github.io/mikrosti/`.

From now on, every push to `main` publishes automatically.

## 3. Connect your domain

1. On GitHub, go to **Settings → Pages → Custom domain**, enter `yourdomain.no` and click **Save**.
2. At your domain registrar, open the DNS settings and add these records:

   | Type  | Name / Host | Value               |
   |-------|-------------|---------------------|
   | A     | @           | 185.199.108.153     |
   | A     | @           | 185.199.109.153     |
   | A     | @           | 185.199.110.153     |
   | A     | @           | 185.199.111.153     |
   | CNAME | www         | YOURNAME.github.io  |

   Delete any old A records on `@` that point somewhere else.
3. DNS changes take anywhere from a few minutes to a few hours. When GitHub shows the domain check as OK, tick **Enforce HTTPS**.
4. *(Recommended)* To stop anyone else's GitHub repo from claiming your domain, add it under **GitHub profile → Settings → Pages → Add a domain**. Follow the steps there; it gives you a TXT record to add.

## How progress is saved

- Logging in is optional. Without an account the app works as before and progress is saved in that browser only. The **Log in** button at the top right opens the login form.
- Each user has one row in `progress` holding their whole state: XP, streak, levels, mistake bank and best exam score.
- Row Level Security only lets each user read and write their own row.
- Changes are saved about a second after they happen, and right away when the tab is hidden. A copy is also kept in the browser, so nothing is lost if the connection drops.
- The dot on the account button shows sync status: green means saved, yellow means saving, red means retrying.
- When a user logs in for the first time, any progress they had in this browser from before accounts existed is carried over.
- If the app is open on two devices, switching back to a tab reloads it with the newest progress.

## Update 2: privacy, delete account, reports, leaderboard, Google login, installable app

### Do this once
1. **Database:** in Supabase → **SQL Editor**, run `supabase/update-2.sql`. It adds the delete-account function and the `question_reports` and `leaderboard` tables.
2. **Privacy page:** already filled in with your name and contact email.
3. **Upload** the new and changed files in `public/`: `index.html`, `privacy.html`, `sw.js`, `manifest.webmanifest`, `icon.svg`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`, `favicon-32.png`, `og-image.png`, `coffee.svg`.

### Reading problem reports
In Supabase, open **Table Editor → question_reports**. Each row has the question ID (e.g. `u3-7` means unit 3, question 8), the question text with the app's answer, and the message. Delete a row once you've fixed the problem.

### Turning on "Continue with Google" (optional, about 10 minutes)
1. Go to **console.cloud.google.com** and create a project, for example "MikroSti".
2. Open **Google Auth Platform**, also called **APIs & Services → OAuth consent screen**. Click **Get started**, set the app name to MikroSti, add your support email, choose **External** and finish. Under **Audience**, click **Publish app**.
3. Go to **Clients → Create client → Web application** and fill in:
   - **Authorized JavaScript origins:** `https://xn--kad-zna.no`
   - **Authorized redirect URIs:** `https://pnjtryajarpitojzpkzd.supabase.co/auth/v1/callback`
   Then click **Create** and copy the **Client ID** and **Client secret**.
4. In Supabase, go to **Authentication → Sign In / Providers → Google**, turn it on, paste both values and click **Save**.
5. In `public/index.html`, change `googleLogin: false` to `googleLogin: true` and upload the file.

### Good to know
- **Leaderboard:** only users who join with a nickname appear, and only their nickname and this week's XP are shown. XP is counted in the browser, so a determined cheater could fake it. That's fine for a fun board, but don't attach prizes to it.
- **Offline:** after the first visit, the app also works without internet. Guests keep their progress on the device; logged-in users' progress syncs when the connection comes back. When you publish a new version, visitors get it on their next load.
- **Install:** on Android and in Chrome on a computer, an **Install app** link appears in the footer. On iPhone, open the site in Safari, tap **Share** and then **Add to Home Screen**.
- **Social preview:** Facebook, Messenger and Snapchat cache link previews. If an old preview shows up, Facebook's Sharing Debugger can refresh it.

## Update 3: bigger question bank
- `public/questions-2.js` and `public/questions-3.js` add 140 new questions (12 per unit), all built on topics from the SE-213 exams, including the whole fall 2024 exam (Problem 2 a–d and Problem 3 a–e). Each question has a step-by-step solution.
- `public/gen-2.js` adds generators that make new versions of the 2024 Problem 3 (n competitive firms, welfare, monopoly and deadweight loss) with new numbers every time.
- New questions are added at the end of each unit, so existing progress is kept. Some units get extra lessons on the path.
- To add or fix questions, edit these files. Each question has the format shown at the top of `questions-2.js`.

## Update 4: more exam questions (2021, 2022, 2023)
- `public/questions-4.js`: the Problem 3 parts from fall 2021 (Covmed and Epivac), fall 2022 (Jane and Denise) and fall 2023 (Norwegian Apples) that were missing, 29 questions marked "Exam".
- `public/gen-3.js`: new versions of those problems with new numbers (Covmed-style monopoly, Cournot with one quadratic-cost and one constant-cost firm, Jane- and Denise-style demand, Norwegian Apples-style cost minimization).

## Update 5: Theory tab
- New **Theory** tab: multiple choice and true/false on concepts only (no calculations, no hearts), separate from the learning path. Students pick topics, round length (10/20/40) and "new first" or "ones I got wrong". The result screen reviews every missed question with its explanation, and the tab shows progress per topic.
- The pool is every true/false statement and conceptual multiple-choice question in the bank (about 200), picked automatically. To force a question into or out of the theory pool, edit `TH_EXTRA` / `isTheory` in `index.html`.
- `public/questions-5.js` adds 20 theory questions for Perfect Competition, Welfare and Policy, Monopoly and Oligopoly (they also appear in the learning path).

## Update 6: Written answers (exam Problem 2)
- The Theory tab now has two modes: **Quick quiz** and **Written answers**.
- Written answers: the student sees a Problem 2 statement, chooses "Correct" or "Not correct", writes a justification, then sees a model answer and a checklist of what the examiner looks for. The estimated score follows the answer keys: wrong verdict 0, right verdict without justification 2, otherwise 2 + 8 × the share of the checklist covered.
- `public/written-qs.js`: 38 statements with model answers and checklists. 16 are the real Problem 2 statements from fall 2021–2024, based on the answer keys; 22 are exam-style statements covering all units. Add fall 2025 the same way.
