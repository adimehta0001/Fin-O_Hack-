# Paytm TrustScore — Behavioral Financial Analytics

![TrustScore Dashboard](link-to-a-screenshot-of-your-dashboard.png)

## Overview
Traditional credit scores rely heavily on formal credit lines. **Paytm TrustScore** is a high-fidelity, single-page application (SPA) prototype that calculates a user's financial reliability based on behavioral data: UPI transaction history, bill payment punctuality, subscription consistency, and spending volatility. 

This dashboard acts as a personal financial mirror, connecting to a backend database to crunch raw transaction logs and visualize a comprehensive, weighted "TrustScore" out of 900.

## 🚀 Core Features

* **Algorithmic Scoring Engine:** Dynamically calculates a behavioral TrustScore based on 6 heavily weighted factors (Payment Punctuality, Income Stability, Spending Volatility, etc.).
* **Advanced Data Visualization:** Utilizes **Chart.js** to render real-time analytics, including:
  * 12-month spending vs. income volatility tracking.
  * A custom-built Bill Payment Heatmap (tracking days early/late).
  * Merchant diversity donut charts.
* **Live Backend Integration:** Connected directly to a **Supabase PostgreSQL** database using `@supabase/supabase-js` to fetch users, transaction histories, and AI-driven risk insights.
* **Premium UI/UX:** Built with pure HTML/CSS/JS, featuring stateful screen routing (Connect → Loading Sequence → Dashboard), custom CSS variables, and fluid animations without relying on heavy frontend frameworks.

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6 Modules)
* **Visualizations:** Chart.js
* **Backend/Database:** Supabase (PostgreSQL)
* **Typography:** Syne & Instrument Sans (Google Fonts)

## 🧠 How the Algorithm Works
The TrustScore isn't arbitrary. It processes the user's data payload through the following weights:
1. **Payment Punctuality (25%):** Penalizes late bill/utility payments.
2. **Income Stability (20%):** Measures the consistency of month-over-month inflows.
3. **Spending Volatility (15%):** Analyzes erratic spending behaviors.
4. **Subscription Reliability (15%):** Tracks OTT and recurring auto-payment success rates.
5. **Wallet Balance Stability (13%):** Monitors ATM withdrawal frequency as a proxy for cash stress.
6. **Merchant Diversity (12%):** Rewards diversified spending habits across various categories.

## ⚙️ Local Setup & Installation

Because this project uses ES6 modules (`<script type="module">`), it must be run through a local web server (it will not work by simply double-clicking the HTML file).

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/paytm-trustscore-dashboard.git](https://github.com/yourusername/paytm-trustscore-dashboard.git)
   cd paytm-trustscore-dashboard
