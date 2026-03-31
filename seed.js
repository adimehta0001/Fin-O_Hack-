  /**
 * Paytm TrustScore — Supabase Seed Script
 * ----------------------------------------
 * Populates: users, transactions, ai_insights
 * Users: Arjun (Excellent), Priya (Fair), Rahul (Poor)
 *
 * Usage:
 *   npm install @supabase/supabase-js
 *   SUPABASE_URL=<url> SUPABASE_SERVICE_KEY=<key> node seed.js
 */

import { createClient } from "@supabase/supabase-js";

// ──────────────────────────────────────────
// CONFIG — use env vars, never hardcode keys
// ──────────────────────────────────────────
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error(
    "❌  Missing SUPABASE_URL or SUPABASE_SERVICE_KEY environment variables."
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ──────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────

/** Returns an ISO date string N days before today */
function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
}

/** Random integer between min and max (inclusive) */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Random element from an array */
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Round to 2 decimal places */
function money(n) {
  return Math.round(n * 100) / 100;
}

// ──────────────────────────────────────────
// USER PROFILES
// ──────────────────────────────────────────

const userProfiles = [
  {
    name: "Arjun Mehta",
    email: "arjun.mehta@example.com",
    current_score: 847,
    previous_score: 821,
    risk_tier: "Excellent",
  },
  {
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    current_score: 621,
    previous_score: 648,
    risk_tier: "Fair",
  },
  {
    name: "Rahul Verma",
    email: "rahul.verma@example.com",
    current_score: 412,
    previous_score: 438,
    risk_tier: "Poor",
  },
];

// ──────────────────────────────────────────
// TRANSACTION TEMPLATES per user type
// ──────────────────────────────────────────

/**
 * Generates a realistic 30-day transaction history.
 * @param {"excellent"|"fair"|"poor"} profile
 * @param {string} userId
 */
function generateTransactions(profile, userId) {
  const txns = [];

  const templates = {
    excellent: [
      // Stable bills — always on time
      { category: "rent",           merchant: "Housing Society",        amountRange: [15000, 15000], lateProbability: 0.00, method: "Net Banking" },
      { category: "utilities",      merchant: "BSES Rajdhani",          amountRange: [800,   1500],  lateProbability: 0.00, method: "UPI" },
      { category: "utilities",      merchant: "Airtel Broadband",       amountRange: [999,   999],   lateProbability: 0.00, method: "UPI" },
      { category: "loan_repayment", merchant: "HDFC Home Loan EMI",     amountRange: [22000, 22000], lateProbability: 0.00, method: "Net Banking" },
      { category: "insurance",      merchant: "LIC Premium",            amountRange: [4500,  4500],  lateProbability: 0.00, method: "Net Banking" },
      { category: "investment",     merchant: "Zerodha SIP",            amountRange: [5000,  10000], lateProbability: 0.00, method: "Net Banking" },
      // Regular spending
      { category: "groceries",      merchant: "BigBasket",              amountRange: [1200,  3000],  lateProbability: 0.00, method: "UPI", repeat: 4 },
      { category: "dining",         merchant: "Swiggy",                 amountRange: [300,   800],   lateProbability: 0.00, method: "Card",repeat: 5 },
      { category: "healthcare",     merchant: "Apollo Pharmacy",        amountRange: [200,   1500],  lateProbability: 0.00, method: "UPI", repeat: 2 },
      { category: "fuel",           merchant: "Indian Oil",             amountRange: [1500,  3000],  lateProbability: 0.00, method: "UPI", repeat: 3 },
      { category: "entertainment",  merchant: "Netflix",                amountRange: [649,   649],   lateProbability: 0.00, method: "Card" },
      { category: "subscription",   merchant: "Spotify Premium",        amountRange: [119,   119],   lateProbability: 0.00, method: "Card" },
      { category: "education",      merchant: "Coursera",               amountRange: [2500,  5000],  lateProbability: 0.00, method: "Card" },
      { category: "retail",         merchant: "Myntra",                 amountRange: [1000,  4000],  lateProbability: 0.00, method: "Card", repeat: 2 },
    ],
    fair: [
      // Some bills late or irregular
      { category: "rent",           merchant: "Landlord Transfer",      amountRange: [10000, 10000], lateProbability: 0.20, method: "UPI" },
      { category: "utilities",      merchant: "TATA Power",             amountRange: [700,   1800],  lateProbability: 0.30, method: "UPI" },
      { category: "loan_repayment", merchant: "Bajaj Finserv EMI",      amountRange: [7500,  7500],  lateProbability: 0.35, method: "Net Banking" },
      { category: "subscription",   merchant: "Amazon Prime",           amountRange: [299,   299],   lateProbability: 0.00, method: "Card" },
      // Irregular spending
      { category: "groceries",      merchant: "D-Mart",                 amountRange: [800,   2500],  lateProbability: 0.00, method: "UPI", repeat: 3 },
      { category: "dining",         merchant: "Zomato",                 amountRange: [250,   1200],  lateProbability: 0.00, method: "UPI", repeat: 6 },
      { category: "entertainment",  merchant: "PVR Cinemas",            amountRange: [500,   1500],  lateProbability: 0.00, method: "UPI", repeat: 3 },
      { category: "fuel",           merchant: "HP Petrol Pump",         amountRange: [1000,  2500],  lateProbability: 0.00, method: "UPI", repeat: 2 },
      { category: "atm_withdrawal", merchant: "ICICI ATM",              amountRange: [2000,  5000],  lateProbability: 0.00, method: "ATM",  repeat: 3 },
      { category: "retail",         merchant: "Flipkart",               amountRange: [500,   6000],  lateProbability: 0.00, method: "Card", repeat: 3 },
      { category: "travel",         merchant: "MakeMyTrip",             amountRange: [3000,  12000], lateProbability: 0.00, method: "Card" },
    ],
    poor: [
      // Frequent late payments, high ATM use, payday-loan pattern
      { category: "rent",           merchant: "Landlord (Cash)",        amountRange: [7000,  7000],  lateProbability: 0.70, method: "UPI" },
      { category: "utilities",      merchant: "MSEB Bill",              amountRange: [600,   1400],  lateProbability: 0.65, method: "UPI" },
      { category: "loan_repayment", merchant: "MoneyTap EMI",           amountRange: [4200,  4200],  lateProbability: 0.75, method: "Net Banking" },
      { category: "loan_repayment", merchant: "KreditBee EMI",          amountRange: [2800,  2800],  lateProbability: 0.60, method: "Net Banking" },
      // Heavy cash withdrawals (poor digital trail)
      { category: "atm_withdrawal", merchant: "SBI ATM",                amountRange: [3000,  8000],  lateProbability: 0.00, method: "ATM",  repeat: 7 },
      // Erratic daily spending
      { category: "groceries",      merchant: "Local Kirana",           amountRange: [200,   600],   lateProbability: 0.00, method: "UPI", repeat: 5 },
      { category: "dining",         merchant: "Dhaba",                  amountRange: [100,   400],   lateProbability: 0.00, method: "UPI", repeat: 8 },
      { category: "fuel",           merchant: "Petrol Pump",            amountRange: [500,   1000],  lateProbability: 0.00, method: "Cash",repeat: 4 },
      { category: "entertainment",  merchant: "Pan Masala / Tobacco",   amountRange: [50,    300],   lateProbability: 0.00, method: "UPI", repeat: 6 },
      { category: "subscription",   merchant: "JioFiber (Overdue)",     amountRange: [599,   599],   lateProbability: 0.80, method: "UPI" },
    ],
  };

  const list = templates[profile];
  let dayOffset = 0;

  list.forEach((t) => {
    const times = t.repeat ?? 1;
    for (let i = 0; i < times; i++) {
      const amount = money(randInt(t.amountRange[0], t.amountRange[1]));
      const isLate = Math.random() < (t.lateProbability ?? 0);
      // Spread transactions across last 30 days
      dayOffset = (dayOffset + randInt(1, 3)) % 30;
      txns.push({
        user_id: userId,
        amount,
        merchant_category: t.category,
        merchant_name: t.merchant,
        date: daysAgo(dayOffset),
        is_late_payment: isLate,
        payment_method: t.method,
        notes: isLate ? "Payment processed after due date" : null,
      });
    }
  });

  // Sort chronologically (oldest first)
  txns.sort((a, b) => new Date(a.date) - new Date(b.date));
  return txns;
}

// ──────────────────────────────────────────
// AI INSIGHTS per user type
// ──────────────────────────────────────────

function buildInsights(profile, userId) {
  const map = {
    excellent: [
      {
        user_id: userId,
        risk_severity: "low",
        title: "Consistent EMI Payments",
        description:
          "Your HDFC Home Loan EMI has been paid on time every month for the past 12 months. This is the single biggest positive factor in your TrustScore.",
        recommendation_impact: 25,
      },
      {
        user_id: userId,
        risk_severity: "low",
        title: "Strong Investment Pattern",
        description:
          "Regular SIP contributions to Zerodha reflect healthy long-term financial planning. Lenders view this positively as disposable income management.",
        recommendation_impact: 18,
      },
      {
        user_id: userId,
        risk_severity: "low",
        title: "Low Credit Utilisation",
        description:
          "Your credit card utilisation is under 12%, well below the 30% caution threshold. Maintaining this ratio protects your score.",
        recommendation_impact: 15,
      },
    ],
    fair: [
      {
        user_id: userId,
        risk_severity: "medium",
        title: "Late Rent Payments Detected",
        description:
          "Your rent transfer was delayed 2 times in the past 30 days. While rent isn't always reported, recurring delays signal liquidity stress to our AI model.",
        recommendation_impact: -22,
      },
      {
        user_id: userId,
        risk_severity: "medium",
        title: "EMI at Risk of Default",
        description:
          "Your Bajaj Finserv EMI was paid 8 days late this cycle. A single reported default can drop your score by 50–80 points. Set up auto-debit immediately.",
        recommendation_impact: -35,
      },
      {
        user_id: userId,
        risk_severity: "low",
        title: "High Dining & Entertainment Spend",
        description:
          "Over 28% of your tracked spending this month went to dining and entertainment. Reducing this by 10% could free ₹2,400 per month to build an emergency buffer.",
        recommendation_impact: 10,
      },
    ],
    poor: [
      {
        user_id: userId,
        risk_severity: "critical",
        title: "Multiple Loan Defaults Flagged",
        description:
          "Both your MoneyTap and KreditBee EMIs show repeated late payments. Multiple active personal loans with missed payments are the primary driver of your low score.",
        recommendation_impact: -55,
      },
      {
        user_id: userId,
        risk_severity: "high",
        title: "Excessive ATM Cash Withdrawals",
        description:
          "₹38,000+ in ATM withdrawals over 30 days creates an opaque spending trail. Lenders cannot assess repayment capacity without a digital transaction record.",
        recommendation_impact: -20,
      },
      {
        user_id: userId,
        risk_severity: "high",
        title: "Utility Bill Defaults",
        description:
          "Your JioFiber subscription is overdue and your MSEB bill was paid 15 days late. Utility defaults are increasingly used by fintech lenders as early-warning signals.",
        recommendation_impact: -18,
      },
      {
        user_id: userId,
        risk_severity: "medium",
        title: "Immediate Action: Set Up Auto-Debit",
        description:
          "Enabling NACH auto-debit for all EMIs is the single fastest way to stop score erosion. Even one on-time EMI cycle can halt the current downward trend.",
        recommendation_impact: 30,
      },
    ],
  };

  return map[profile];
}

// ──────────────────────────────────────────
// MAIN SEED FUNCTION
// ──────────────────────────────────────────

async function seed() {
  console.log("🌱  Starting Paytm TrustScore seed...\n");

  // ── 1. Clear existing data (safe for dev) ──
  console.log("🗑️   Clearing existing seed data...");
  const emails = userProfiles.map((u) => u.email);

  const { data: existingUsers } = await supabase
    .from("users")
    .select("id, email")
    .in("email", emails);

  if (existingUsers?.length) {
    const ids = existingUsers.map((u) => u.id);
    await supabase.from("ai_insights").delete().in("user_id", ids);
    await supabase.from("transactions").delete().in("user_id", ids);
    await supabase.from("users").delete().in("id", ids);
    console.log(`   Removed ${ids.length} existing user(s) and related data.\n`);
  }

  const profileKeys = ["excellent", "fair", "poor"];

  for (let i = 0; i < userProfiles.length; i++) {
    const profile = userProfiles[i];
    const profileKey = profileKeys[i];

    console.log(`👤  Seeding user: ${profile.name} (${profile.risk_tier})`);

    // ── 2. Insert user ──
    const { data: insertedUser, error: userErr } = await supabase
      .from("users")
      .insert(profile)
      .select()
      .single();

    if (userErr) {
      console.error(`   ❌ Failed to insert user: ${userErr.message}`);
      continue;
    }

    const userId = insertedUser.id;
    console.log(`   ✅ User created — ID: ${userId}`);

    // ── 3. Insert transactions ──
    const transactions = generateTransactions(profileKey, userId);

    const { error: txnErr } = await supabase
      .from("transactions")
      .insert(transactions);

    if (txnErr) {
      console.error(`   ❌ Failed to insert transactions: ${txnErr.message}`);
    } else {
      const lateCount = transactions.filter((t) => t.is_late_payment).length;
      console.log(
        `   ✅ ${transactions.length} transactions inserted (${lateCount} late payments)`
      );
    }

    // ── 4. Insert AI insights ──
    const insights = buildInsights(profileKey, userId);

    const { error: insightErr } = await supabase
      .from("ai_insights")
      .insert(insights);

    if (insightErr) {
      console.error(`   ❌ Failed to insert insights: ${insightErr.message}`);
    } else {
      console.log(`   ✅ ${insights.length} AI insights inserted`);
    }

    console.log();
  }

  // ── 5. Summary ──
  const { count: userCount }    = await supabase.from("users").select("*", { count: "exact", head: true });
  const { count: txnCount }     = await supabase.from("transactions").select("*", { count: "exact", head: true });
  const { count: insightCount } = await supabase.from("ai_insights").select("*", { count: "exact", head: true });

  console.log("─────────────────────────────────────");
  console.log("✅  Seed complete!");
  console.log(`   Users:        ${userCount}`);
  console.log(`   Transactions: ${txnCount}`);
  console.log(`   AI Insights:  ${insightCount}`);
  console.log("─────────────────────────────────────");
}

seed().catch((err) => {
  console.error("💥  Seed script crashed:", err);
  process.exit(1);
});
