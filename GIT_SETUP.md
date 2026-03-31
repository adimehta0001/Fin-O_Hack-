# Git Setup Commands — Paytm TrustScore

A step-by-step terminal guide to initialize, structure, and publish this repo to GitHub.

---

## 1. Create & Organize the Repository Structure

```bash
# Create the root project directory
mkdir paytm-trustscore
cd paytm-trustscore

# Create subdirectories
mkdir -p db scripts assets/screenshots

# Move / copy your files into place:
# - Rename your HTML file to index.html and place it in the root
# - Place schema.sql inside db/
# - Place seed.js inside scripts/

cp /path/to/paytm-personal-trustscore\ \(1\).html ./index.html
cp /path/to/schema.sql ./db/schema.sql
cp /path/to/seed.js ./scripts/seed.js
```

---

## 2. Add Repository Scaffolding Files

Place the following files (provided in this package) into the root:

```
paytm-trustscore/
├── README.md
├── .env.example
├── .gitignore
└── LICENSE
```

---

## 3. Initialize Git & Make the First Commit

```bash
# Initialize a new git repository
git init

# Stage all files
git add .

# Verify what will be committed (optional but recommended)
git status

# Make the initial commit
git commit -m "feat: initial release of Paytm TrustScore prototype

- Vanilla JS SPA with Chart.js visualizations
- Supabase PostgreSQL schema with RLS policies
- Node.js seeder with 3 behavioral user profiles (Excellent/Fair/Poor)
- Behavioral scoring across 5 dimensions: Punctuality, Volatility,
  Discipline, Savings Velocity, Merchant Diversity"
```

---

## 4. Create the GitHub Repository & Push

```bash
# Add your GitHub remote — replace YOUR_USERNAME with your GitHub handle
git remote add origin https://github.com/YOUR_USERNAME/paytm-trustscore.git

# Rename the default branch to 'main' (GitHub standard)
git branch -M main

# Push and set upstream tracking
git push -u origin main
```

---

## 5. Post-Push: Recommended GitHub Settings

After pushing, do the following in the GitHub UI:

1. **Add a Description:** "Behavioral credit scoring dashboard using Supabase + Chart.js"
2. **Add Topics/Tags:** `fintech`, `supabase`, `credit-scoring`, `javascript`, `postgresql`, `dashboard`
3. **Set the Website field** to your deployed Vercel/Netlify URL (once deployed)
4. **Enable GitHub Pages** (optional) under Settings → Pages → Deploy from branch → main

---

## 6. Ongoing Workflow

```bash
# Create a feature branch for new work
git checkout -b feature/live-llm-insights

# Stage, commit, and push changes
git add .
git commit -m "feat: integrate GPT-4 for live AI insight generation"
git push origin feature/live-llm-insights

# Open a Pull Request on GitHub, then merge to main
```
