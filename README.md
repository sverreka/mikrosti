# MikroSti SE-213

Microeconomics practice app with user accounts. Progress is saved per user in Supabase.

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

- Each user has one row in `progress` holding their whole state: XP, streak, levels, mistake bank and best exam score.
- Row Level Security only lets each user read and write their own row.
- Changes are saved about a second after they happen, and right away when the tab is hidden. A copy is also kept in the browser, so nothing is lost if the connection drops.
- The dot on the account button shows sync status: green means saved, yellow means saving, red means retrying.
- When a user logs in for the first time, any progress they had in this browser from before accounts existed is carried over.
- If the app is open on two devices, switching back to a tab reloads it with the newest progress.
