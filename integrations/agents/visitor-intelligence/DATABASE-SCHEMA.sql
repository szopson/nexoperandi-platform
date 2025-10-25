-- Visitor Intelligence Database Schema
-- Purpose: Store and analyze visitor behavior data for lead scoring and conversion optimization

-- ============================================================================
-- Main Table: Visitor Intelligence Tracking
-- ============================================================================

CREATE TABLE IF NOT EXISTS visitor_intelligence (
  -- Primary identifiers
  id SERIAL PRIMARY KEY,
  visitor_id VARCHAR(255),              -- Anonymous visitor ID (UUID from cookie)
  session_id VARCHAR(255) NOT NULL,     -- Session identifier

  -- Visitor behavior data
  url TEXT NOT NULL,                    -- Page URL visited
  page_title VARCHAR(500),              -- Page title
  time_on_page INTEGER DEFAULT 0,       -- Time spent in seconds
  pages_viewed INTEGER DEFAULT 1,       -- Total pages in session
  scroll_depth INTEGER DEFAULT 0,       -- Percentage scrolled (0-100)

  -- Technical data
  device VARCHAR(50),                   -- desktop, mobile, tablet
  browser VARCHAR(100),                 -- Browser name
  os VARCHAR(100),                      -- Operating system
  referrer TEXT,                        -- Referring URL
  utm_source VARCHAR(255),              -- UTM tracking
  utm_medium VARCHAR(255),
  utm_campaign VARCHAR(255),
  utm_content VARCHAR(255),
  utm_term VARCHAR(255),

  -- Intelligence scoring
  lead_score INTEGER NOT NULL,          -- Calculated score (0-85)
  category VARCHAR(20) NOT NULL,        -- Cold, Warm, Hot
  action VARCHAR(50) NOT NULL,          -- Recommended action (monitor, engage_email, trigger_chat)

  -- AI insights
  ai_insight TEXT,                      -- AI-generated behavioral insight
  ai_model VARCHAR(100),                -- Model used (e.g., claude-3-5-haiku)

  -- Geographic data (optional, can add later)
  country VARCHAR(100),
  city VARCHAR(100),
  ip_address INET,                      -- PostgreSQL native IP type

  -- Contact information (if known)
  email VARCHAR(255),                   -- Email if captured
  name VARCHAR(255),                    -- Name if captured
  company VARCHAR(255),                 -- Company if captured

  -- Conversion tracking
  converted BOOLEAN DEFAULT FALSE,      -- Did they convert?
  conversion_type VARCHAR(50),          -- lead, demo, purchase, etc.
  conversion_value DECIMAL(10,2),       -- Value of conversion

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- Indexes for Performance
-- ============================================================================

-- Fast lookups by visitor/session
CREATE INDEX idx_visitor_id ON visitor_intelligence(visitor_id);
CREATE INDEX idx_session_id ON visitor_intelligence(session_id);

-- Analytics queries
CREATE INDEX idx_created_at ON visitor_intelligence(created_at DESC);
CREATE INDEX idx_lead_score ON visitor_intelligence(lead_score DESC);
CREATE INDEX idx_category ON visitor_intelligence(category);

-- Conversion analysis
CREATE INDEX idx_converted ON visitor_intelligence(converted) WHERE converted = TRUE;
CREATE INDEX idx_email ON visitor_intelligence(email) WHERE email IS NOT NULL;

-- URL analysis
CREATE INDEX idx_url_pattern ON visitor_intelligence USING gin(to_tsvector('english', url));

-- Composite indexes for common queries
CREATE INDEX idx_category_score ON visitor_intelligence(category, lead_score DESC, created_at DESC);
CREATE INDEX idx_session_analytics ON visitor_intelligence(session_id, created_at);

-- ============================================================================
-- Aggregated Metrics Table (for faster dashboard queries)
-- ============================================================================

CREATE TABLE IF NOT EXISTS visitor_metrics_daily (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL UNIQUE,

  -- Volume metrics
  total_visitors INTEGER DEFAULT 0,
  total_sessions INTEGER DEFAULT 0,
  total_pageviews INTEGER DEFAULT 0,

  -- Scoring metrics
  hot_visitors INTEGER DEFAULT 0,
  warm_visitors INTEGER DEFAULT 0,
  cold_visitors INTEGER DEFAULT 0,
  avg_lead_score DECIMAL(5,2) DEFAULT 0,

  -- Engagement metrics
  avg_time_on_page INTEGER DEFAULT 0,
  avg_pages_per_session DECIMAL(5,2) DEFAULT 0,
  avg_scroll_depth DECIMAL(5,2) DEFAULT 0,

  -- Conversion metrics
  total_conversions INTEGER DEFAULT 0,
  conversion_rate DECIMAL(5,2) DEFAULT 0,
  total_conversion_value DECIMAL(10,2) DEFAULT 0,

  -- Device breakdown
  desktop_visitors INTEGER DEFAULT 0,
  mobile_visitors INTEGER DEFAULT 0,
  tablet_visitors INTEGER DEFAULT 0,

  -- Traffic sources
  direct_traffic INTEGER DEFAULT 0,
  organic_traffic INTEGER DEFAULT 0,
  referral_traffic INTEGER DEFAULT 0,
  social_traffic INTEGER DEFAULT 0,
  paid_traffic INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_metrics_date ON visitor_metrics_daily(date DESC);

-- ============================================================================
-- Hot Leads Table (for instant notifications)
-- ============================================================================

CREATE TABLE IF NOT EXISTS hot_leads (
  id SERIAL PRIMARY KEY,
  visitor_intelligence_id INTEGER REFERENCES visitor_intelligence(id),

  -- Lead details
  session_id VARCHAR(255) NOT NULL,
  lead_score INTEGER NOT NULL,
  ai_insight TEXT,

  -- Contact info
  email VARCHAR(255),
  name VARCHAR(255),
  company VARCHAR(255),

  -- Current state
  status VARCHAR(50) DEFAULT 'new',    -- new, contacted, qualified, converted, lost
  assigned_to VARCHAR(255),            -- Sales rep assigned

  -- Notification tracking
  notified BOOLEAN DEFAULT FALSE,
  notification_sent_at TIMESTAMPTZ,
  notification_channel VARCHAR(50),    -- telegram, slack, email

  -- Follow-up tracking
  contacted_at TIMESTAMPTZ,
  contacted_by VARCHAR(255),
  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_hot_leads_status ON hot_leads(status);
CREATE INDEX idx_hot_leads_notified ON hot_leads(notified) WHERE notified = FALSE;
CREATE INDEX idx_hot_leads_created ON hot_leads(created_at DESC);

-- ============================================================================
-- Functions for Auto-updating Timestamps
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables
CREATE TRIGGER update_visitor_intelligence_updated_at
  BEFORE UPDATE ON visitor_intelligence
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hot_leads_updated_at
  BEFORE UPDATE ON hot_leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Views for Easy Querying
-- ============================================================================

-- Today's hot visitors
CREATE OR REPLACE VIEW todays_hot_visitors AS
SELECT
  id,
  session_id,
  url,
  time_on_page,
  pages_viewed,
  device,
  referrer,
  lead_score,
  ai_insight,
  email,
  name,
  company,
  created_at
FROM visitor_intelligence
WHERE category = 'Hot'
  AND created_at >= CURRENT_DATE
ORDER BY lead_score DESC, created_at DESC;

-- Recent visitor timeline
CREATE OR REPLACE VIEW recent_visitors AS
SELECT
  id,
  session_id,
  visitor_id,
  url,
  time_on_page,
  pages_viewed,
  device,
  lead_score,
  category,
  ai_insight,
  created_at
FROM visitor_intelligence
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;

-- Conversion funnel analysis
CREATE OR REPLACE VIEW conversion_funnel AS
SELECT
  category,
  COUNT(*) as total_visitors,
  SUM(CASE WHEN converted THEN 1 ELSE 0 END) as conversions,
  ROUND(100.0 * SUM(CASE WHEN converted THEN 1 ELSE 0 END) / COUNT(*), 2) as conversion_rate,
  AVG(lead_score) as avg_score,
  AVG(time_on_page) as avg_time,
  AVG(pages_viewed) as avg_pages
FROM visitor_intelligence
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY category
ORDER BY
  CASE category
    WHEN 'Hot' THEN 1
    WHEN 'Warm' THEN 2
    WHEN 'Cold' THEN 3
  END;

-- ============================================================================
-- Sample Queries for Analytics
-- ============================================================================

-- Top performing pages (highest average lead score)
-- SELECT
--   url,
--   COUNT(*) as visits,
--   AVG(lead_score) as avg_score,
--   SUM(CASE WHEN category = 'Hot' THEN 1 ELSE 0 END) as hot_visitors
-- FROM visitor_intelligence
-- WHERE created_at >= NOW() - INTERVAL '30 days'
-- GROUP BY url
-- ORDER BY avg_score DESC
-- LIMIT 10;

-- Traffic source performance
-- SELECT
--   COALESCE(utm_source, 'direct') as source,
--   COUNT(*) as visitors,
--   AVG(lead_score) as avg_score,
--   SUM(CASE WHEN converted THEN 1 ELSE 0 END) as conversions
-- FROM visitor_intelligence
-- WHERE created_at >= NOW() - INTERVAL '30 days'
-- GROUP BY utm_source
-- ORDER BY conversions DESC;

-- Hourly traffic pattern
-- SELECT
--   EXTRACT(HOUR FROM created_at) as hour,
--   COUNT(*) as visitors,
--   AVG(lead_score) as avg_score,
--   SUM(CASE WHEN category = 'Hot' THEN 1 ELSE 0 END) as hot_visitors
-- FROM visitor_intelligence
-- WHERE created_at >= NOW() - INTERVAL '7 days'
-- GROUP BY EXTRACT(HOUR FROM created_at)
-- ORDER BY hour;

-- ============================================================================
-- Initial Setup - Sample Data Retention Policy
-- ============================================================================

-- Delete old data (keep last 90 days)
-- Run this as a scheduled job (e.g., daily cron)
-- DELETE FROM visitor_intelligence
-- WHERE created_at < NOW() - INTERVAL '90 days'
--   AND converted = FALSE;

-- ============================================================================
-- Comments and Documentation
-- ============================================================================

COMMENT ON TABLE visitor_intelligence IS 'Tracks all visitor behavior and engagement metrics for lead scoring';
COMMENT ON TABLE visitor_metrics_daily IS 'Pre-aggregated daily metrics for fast dashboard queries';
COMMENT ON TABLE hot_leads IS 'High-intent visitors requiring immediate sales follow-up';

COMMENT ON COLUMN visitor_intelligence.lead_score IS 'Calculated score 0-85: 10 base + 30 time + 25 pages + 20 high-value page';
COMMENT ON COLUMN visitor_intelligence.category IS 'Cold (0-29), Warm (30-59), Hot (60-85)';
COMMENT ON COLUMN visitor_intelligence.action IS 'Recommended action based on score: monitor, engage_email, trigger_chat';
