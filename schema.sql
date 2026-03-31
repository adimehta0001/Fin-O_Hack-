-- ============================================================
--  Paytm TrustScore — Supabase SQL Schema
--  Lead Backend Engineer: Hackathon Prototype
-- ============================================================

-- ──────────────────────────────────────────
-- ENUMS
-- ──────────────────────────────────────────

CREATE TYPE risk_tier_enum AS ENUM ('Excellent', 'Good', 'Fair', 'Poor', 'Critical');
CREATE TYPE risk_severity_enum AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE merchant_category_enum AS ENUM (
  'groceries',
  'utilities',
  'entertainment',
  'dining',
  'travel',
  'healthcare',
  'education',
  'retail',
  'fuel',
  'rent',
  'loan_repayment',
  'subscription',
  'insurance',
  'investment',
  'atm_withdrawal'
);

-- ──────────────────────────────────────────
-- TABLE: users
-- ──────────────────────────────────────────

CREATE TABLE IF NOT EXISTS users (
  id                UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
  name              VARCHAR(100)    NOT NULL,
  email             VARCHAR(255)    UNIQUE NOT NULL,
  current_score     SMALLINT        NOT NULL CHECK (current_score BETWEEN 300 AND 900),
  previous_score    SMALLINT        NOT NULL CHECK (previous_score BETWEEN 300 AND 900),
  risk_tier         risk_tier_enum  NOT NULL DEFAULT 'Fair',
  created_at        TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ──────────────────────────────────────────
-- TABLE: transactions
-- ──────────────────────────────────────────

CREATE TABLE IF NOT EXISTS transactions (
  id                  UUID                    PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID                    NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount              NUMERIC(12, 2)          NOT NULL CHECK (amount > 0),
  merchant_category   merchant_category_enum  NOT NULL,
  merchant_name       VARCHAR(150),
  date                DATE                    NOT NULL DEFAULT CURRENT_DATE,
  is_late_payment     BOOLEAN                 NOT NULL DEFAULT FALSE,
  payment_method      VARCHAR(50),            -- UPI, Card, Net Banking, Wallet
  notes               TEXT,
  created_at          TIMESTAMPTZ             NOT NULL DEFAULT NOW()
);

-- Index for fast per-user lookups and date-range queries
CREATE INDEX idx_transactions_user_id   ON transactions(user_id);
CREATE INDEX idx_transactions_date      ON transactions(date DESC);
CREATE INDEX idx_transactions_user_date ON transactions(user_id, date DESC);

-- ──────────────────────────────────────────
-- TABLE: ai_insights
-- ──────────────────────────────────────────

CREATE TABLE IF NOT EXISTS ai_insights (
  id                    UUID                PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               UUID                NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  risk_severity         risk_severity_enum  NOT NULL,
  title                 VARCHAR(200)        NOT NULL,
  description           TEXT                NOT NULL,
  recommendation_impact SMALLINT            NOT NULL CHECK (recommendation_impact BETWEEN -100 AND 100),
  -- Positive = score improvement potential, Negative = score risk
  is_dismissed          BOOLEAN             NOT NULL DEFAULT FALSE,
  generated_at          TIMESTAMPTZ         NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_ai_insights_user_id  ON ai_insights(user_id);
CREATE INDEX idx_ai_insights_severity ON ai_insights(risk_severity);

-- ──────────────────────────────────────────
-- ROW LEVEL SECURITY (recommended for Supabase)
-- ──────────────────────────────────────────

ALTER TABLE users         ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_insights   ENABLE ROW LEVEL SECURITY;

-- During development / hackathon: allow full access to service_role
-- Replace with auth.uid() policies when adding Supabase Auth
CREATE POLICY "service_role_all_users"        ON users         FOR ALL TO service_role USING (true);
CREATE POLICY "service_role_all_transactions" ON transactions  FOR ALL TO service_role USING (true);
CREATE POLICY "service_role_all_ai_insights"  ON ai_insights   FOR ALL TO service_role USING (true);
