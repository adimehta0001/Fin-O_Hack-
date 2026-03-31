# 🏦 Paytm TrustScore

> **Behavioral credit scoring, reimagined.** A real-time financial health dashboard that moves beyond CIBIL scores — evaluating *how* people actually spend, save, and pay.

<p align="center">
  <img src="assets/screenshots/dashboard-preview.png" alt="TrustScore Dashboard Preview" width="100%" />
  <em>← Replace this placeholder with a screenshot of your running dashboard</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Chart.js-Visualization-FF6384?style=for-the-badge&logo=chart.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Vanilla-JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" />
</p>

---

## What Is TrustScore?

Traditional credit scoring is a black box — a single number derived from static data. **TrustScore** is a transparent, behavioral alternative. It ingests raw transaction data and computes a multi-dimensional financial health profile across five independently weighted signals.

This is a **fully functional prototype** — a single-page application backed by Supabase (PostgreSQL + Row Level Security), seeded with three realistic user profiles (Excellent, Fair, Poor) so you can explore the system immediately after setup.

---

## ✨ Features & Scoring Dimensions

TrustScore evaluates financial behavior across five behavioral axes, each contributing a weighted score to the final composite:

| Dimension | Weight | What It Measures |
|---|---|---|
| **Payment Punctuality** | 35% | Ratio of on-time payments vs. late payments. The single strongest predictor of financial reliability. |
| **Income Volatility** | 25% | Standard deviation of monthly income streams. High volatility = higher risk profile. |
| **Expense Discipline** | 20% | Month-over-month consistency of discretionary vs. essential spending ratios. |
| **Savings Velocity** | 15% | Net positive cash flow trend over rolling 90-day windows. |
| **Merchant Diversity** | 5% | Breadth of spending categories — a proxy for lifestyle stability and financial engagement. |

### Additional Capabilities

- 🔐 **Row Level Security (RLS)** — Every query is user-scoped at the database level via Supabase policies. No user can access another's data.
- 🤖 **AI Insights Panel** — Pre-seeded AI-generated financial observations per user profile, ready to be replaced with live LLM calls.
- 📊 **Interactive Charts** — Spending trends, category breakdowns, and income vs. expense overlays via Chart.js.
- 👤 **Multi-Profile Demo** — Three distinct seeded users (Excellent / Fair / Poor) let you instantly showcase the full scoring range.
- ⚡ **Zero-Framework Frontend** — Pure HTML, CSS, and vanilla JS. No build step. No bundler. Just open a server and go.

---

## 🗂️ Repository Structure

```
paytm-trustscore/
├── index.html              # Main SPA — the entire frontend
├── db/
│   └── schema.sql          # PostgreSQL schema: tables, enums, RLS policies
├── scripts/
│   └── seed.js             # Node.js seeder: 3 user profiles + AI insights
├── assets/
│   └── screenshots/
│       └── dashboard-preview.png   # Add your screenshot here
├── .env.example            # Template for environment variables
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | HTML5 / CSS3 / Vanilla JS | Zero-dependency SPA |
| **Charts** | [Chart.js 4.x](https://www.chartjs.org/) | Financial data visualization |
| **Database** | [Supabase](https://supabase.com/) (PostgreSQL 15) | Backend-as-a-service with RLS |
| **Auth** | Supabase Auth (Anonymous / Email) | User session management |
| **Seeder** | Node.js + `@supabase/supabase-js` | Realistic demo data generation |
| **Hosting** | Any static host (Vercel, Netlify, GitHub Pages) | Frontend deployment |

---

## 🚀 Quick Start

Getting TrustScore running locally takes about **10 minutes**. Follow each step carefully.

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A free [Supabase account](https://supabase.com/)
- A local HTTP server (e.g., the VS Code Live Server extension, or `npx serve`)

---

### Step 1 — Create a Supabase Project

1. Go to [supabase.com](https://supabase.com/) and click **New Project**.
2. Choose a name (e.g., `trustscore`), set a strong database password, and pick a region close to you.
3. Wait ~2 minutes for provisioning to complete.
4. Navigate to **Project Settings → API** and copy:
   - **Project URL** → you'll use this as `SUPABASE_URL`
   - **`anon` public key** → you'll use this as `SUPABASE_ANON_KEY`

---

### Step 2 — Run the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**.
2. Click **New Query**.
3. Open `db/schema.sql` from this repo, paste the entire contents into the editor, and click **Run**.

This creates the `users`, `transactions`, and `ai_insights` tables, sets up the required enums (`transaction_type`, `category`, `score_tier`), and applies Row Level Security policies.

> ✅ **Verify:** Navigate to **Table Editor** — you should see three empty tables.

---

### Step 3 — Seed the Database

The seeder populates your database with three realistic user profiles across the scoring spectrum.

**Install the Supabase client:**

```bash
npm install @supabase/supabase-js
```

**Set your environment variables:**

```bash
# Option A: Export directly in your shell
export SUPABASE_URL="https://your-project-ref.supabase.co"
export SUPABASE_ANON_KEY="your-anon-key-here"

# Option B: Copy .env.example to .env and fill in your values
cp .env.example .env
# Then edit .env with your credentials
```

**Run the seeder:**

```bash
node scripts/seed.js
```

You should see console output confirming the creation of three users and their associated transaction histories and AI insights.

> ✅ **Verify:** In Supabase **Table Editor**, your `transactions` table should now contain several hundred rows.

---

### Step 4 — Configure the Frontend

Open `index.html` in your editor. Locate the configuration block near the top of the `<script>` section (around line 10–15) and replace the placeholder values with your actual Supabase credentials:

```javascript
// index.html — update these two constants
const SUPABASE_URL = "https://your-project-ref.supabase.co";
const SUPABASE_ANON_KEY = "your-anon-key-here";
```

> ⚠️ **Security Note:** The `anon` key is safe to expose in a frontend application — it is a public key. Supabase's Row Level Security policies enforce data access rules at the database level. Never put your `service_role` key in frontend code.

---

### Step 5 — Serve Locally

Because `index.html` uses ES6 module imports, it **cannot** be opened directly as a `file://` URL in your browser — you must serve it over HTTP.

**Option A — VS Code Live Server**
Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), right-click `index.html`, and select **Open with Live Server**.

**Option B — `npx serve` (no install required)**
```bash
npx serve .
```
Then open `http://localhost:3000` in your browser.

**Option C — Python (if you have Python installed)**
```bash
python3 -m http.server 8080
```
Then open `http://localhost:8080`.

---

### Step 6 — Explore the Dashboard

Once the app loads, use the profile switcher to toggle between the three seeded users:

| Profile | Expected Score | Use Case |
|---|---|---|
| **Priya Sharma** | 820–880 | Excellent — consistent income, zero late payments |
| **Rahul Verma** | 580–640 | Fair — moderate volatility, occasional late fees |
| **Meena Iyer** | 310–390 | Poor — irregular income, high expense volatility |

---

## ☁️ Deploying to Production

### Vercel (Recommended — free tier)

```bash
npm install -g vercel
vercel --prod
```

Follow the prompts. Set `SUPABASE_URL` and `SUPABASE_ANON_KEY` as **Environment Variables** in the Vercel dashboard.

### Netlify

Drag and drop the project folder into [app.netlify.com](https://app.netlify.com/drop). Update `index.html` with your credentials before deploying, or configure environment variable injection via a build step.

### GitHub Pages

Since this is a static SPA with no build step, you can deploy directly:
1. Push the repo to GitHub.
2. Go to **Settings → Pages → Source → Deploy from branch**.
3. Select `main` / `root`.

> Note: GitHub Pages serves over HTTPS, which Supabase requires. No additional configuration needed.

---

## 🗺️ Roadmap

- [ ] Live LLM integration (replace static AI insights with real-time GPT-4 / Gemini analysis)
- [ ] Supabase Auth UI — full email/password login flow
- [ ] Date range filters on the transaction table
- [ ] PDF export of the TrustScore report
- [ ] Webhook support for real-time transaction ingestion
- [ ] React / Next.js port for component-driven architecture

---

## 🤝 Contributing

Contributions are welcome. Please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Supabase](https://supabase.com/) — for making PostgreSQL accessible to everyone
- [Chart.js](https://www.chartjs.org/) — for elegant, zero-dependency data visualization
- The open-source fintech community for inspiration on behavioral scoring models

---

<p align="center">
  Built with ☕ and conviction that credit scoring can be more human.
</p>
