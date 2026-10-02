# Our Little Date — Vercel-ready virtual date website

A whimsical responsive date experience with place selection, food/flower selection, animated couple, heart bursts, rotating love notes, date counter, virtual selfie capture, photo wall, and optional persistent accounts via Supabase.

## 1. Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## 2. Add persistence/login with Supabase

1. Create a Supabase project.
2. In **SQL Editor**, run `supabase.sql`.
3. In **Project Settings → API**, copy Project URL + anon key into `.env.local`.
4. In **Authentication → URL Configuration**, add your local URL and final Vercel domain.

The app works without Supabase using localStorage, but login-based cross-device history/selfies require Supabase.

## 3. Deploy to Vercel

1. Push this folder to GitHub.
2. Import the repo in Vercel.
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy.
5. Add the final Vercel URL to Supabase Auth redirect URLs.

## Customize

- Change the 5 rotating love notes in `app/date/page.js`.
- Adjust place cards in `app/choose/page.js`.
- Adjust food/flower choices in `app/picks/page.js`.
- Restyle the original CSS-drawn couple in `app/globals.css` and `components/Couple.js`.

The supplied inspiration images were treated as mood/reference only; the app uses original CSS/vector-like artwork rather than copying those illustrations.
