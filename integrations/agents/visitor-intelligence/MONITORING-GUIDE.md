# Visitor Intelligence Monitoring & Analytics Guide

## Overview

This guide explains how to store, monitor, and analyze visitor intelligence data for your NexOperandi platform.

---

## Table of Contents

1. [Storage Options](#storage-options)
2. [Database Setup](#database-setup)
3. [Key Metrics to Track](#key-metrics-to-track)
4. [Analytics Queries](#analytics-queries)
5. [Dashboard Setup](#dashboard-setup)
6. [Real-time Monitoring](#real-time-monitoring)
7. [Alerts & Notifications](#alerts--notifications)

---

## Storage Options

You have **3 options** for storing visitor data, ranked from simplest to most powerful:

### Option 1: Google Sheets (Easiest - No Setup)
**Best for:** Quick start, demos, low traffic (<1000 visitors/day)

**Pros:**
- Zero setup required
- Visual interface
- Easy to share with team
- Built-in charts

**Cons:**
- Slow with large datasets
- Limited query capabilities
- 5M cell limit
- Not real-time

**Setup time:** 5 minutes

---

### Option 2: n8n Execution Data (Medium - Built-in)
**Best for:** Testing, development, temporary storage

**Pros:**
- Already included with n8n
- No external dependencies
- Automatic retention
- Easy to access via n8n UI

**Cons:**
- Data deleted after 336 executions (default)
- Limited analytics capabilities
- Not designed for production
- No custom queries

**Setup time:** 0 minutes (already working)

---

### Option 3: PostgreSQL Database (Recommended - Production)
**Best for:** Production, high traffic, advanced analytics

**Pros:**
- Unlimited scalability
- Fast complex queries
- Built-in aggregations
- Industry standard
- Relational data
- Full analytics capabilities

**Cons:**
- Requires database setup
- More complex
- Hosting costs (~$50-150/month)

**Setup time:** 30-60 minutes

---

## Database Setup (PostgreSQL - Recommended)

### Step 1: Create Database

You have 3 hosting options:

**Option A: Supabase (Easiest)**
1. Go to [supabase.com](https://supabase.com)
2. Create free account
3. Create new project
4. Free tier: 500MB database, 2GB bandwidth
5. Copy connection string

**Option B: Railway (Developer-Friendly)**
1. Go to [railway.app](https://railway.app)
2. Create account
3. "New Project" → "PostgreSQL"
4. $5 free credit, then ~$5-20/month
5. Copy connection details

**Option C: Self-Hosted (Advanced)**
1. Your existing server/VPS
2. Install PostgreSQL 15+
3. Configure access
4. Secure with SSL

### Step 2: Run Schema Script

```bash
# Connect to your database
psql -h your-host -U your-user -d your-database

# Or use Supabase SQL Editor in dashboard

# Run the schema
\i integrations/agents/visitor-intelligence/DATABASE-SCHEMA.sql
```

This creates:
- ✅ `visitor_intelligence` table (main data)
- ✅ `visitor_metrics_daily` table (aggregated stats)
- ✅ `hot_leads` table (high-intent visitors)
- ✅ Indexes for performance
- ✅ Views for common queries
- ✅ Triggers for auto-updates

### Step 3: Configure n8n Connection

1. Open n8n: `https://n8n.srv1108737.hstgr.cloud`
2. Go to **Credentials** → **New Credential**
3. Select **PostgreSQL**
4. Fill in details:
   ```
   Host: your-database-host
   Database: your-database-name
   User: your-database-user
   Password: your-database-password
   Port: 5432
   SSL: Enabled (for cloud databases)
   ```
5. Test connection → Save

### Step 4: Import Enhanced Workflow

Use the enhanced workflow with database storage:
- File: `visitor-intelligence-WITH-DATABASE.json`
- Adds 2 database nodes (Save to Database, Save Hot Leads)
- Automatically stores all visitor data

---

## Key Metrics to Track

### 1. Volume Metrics
- **Total Visitors** - Unique visitors per day/week/month
- **Total Sessions** - Number of browsing sessions
- **Total Pageviews** - Pages viewed across all visitors
- **Avg Pages/Session** - Engagement depth

### 2. Lead Scoring Metrics
- **Hot Visitors** - Score 60-85 (trigger chat)
- **Warm Visitors** - Score 30-59 (engage email)
- **Cold Visitors** - Score 0-29 (monitor)
- **Average Lead Score** - Overall engagement quality

### 3. Engagement Metrics
- **Avg Time on Page** - How long visitors stay
- **Avg Scroll Depth** - How far they scroll (%)
- **Bounce Rate** - Single-page sessions
- **Return Visitor Rate** - Repeat traffic

### 4. Conversion Metrics
- **Conversion Rate** - % of visitors who convert
- **Hot Lead Conversion Rate** - % of hot leads converting
- **Time to Conversion** - Hours/days from visit to conversion
- **Conversion Value** - Total $ value generated

### 5. Traffic Source Metrics
- **Direct Traffic** - No referrer
- **Organic Traffic** - Search engines
- **Referral Traffic** - Other websites
- **Social Traffic** - Social media
- **Paid Traffic** - UTM campaigns

### 6. Technical Metrics
- **Device Breakdown** - Desktop/Mobile/Tablet
- **Browser Distribution** - Chrome, Safari, Firefox, etc.
- **OS Distribution** - Windows, macOS, iOS, Android
- **Geographic Distribution** - Country/City (if tracking)

---

## Analytics Queries

### Dashboard: Today's Overview

```sql
-- Today's visitor summary
SELECT
  COUNT(DISTINCT session_id) as total_sessions,
  COUNT(DISTINCT visitor_id) as unique_visitors,
  COUNT(*) as total_pageviews,
  ROUND(AVG(lead_score), 1) as avg_score,
  SUM(CASE WHEN category = 'Hot' THEN 1 ELSE 0 END) as hot_visitors,
  SUM(CASE WHEN category = 'Warm' THEN 1 ELSE 0 END) as warm_visitors,
  SUM(CASE WHEN category = 'Cold' THEN 1 ELSE 0 END) as cold_visitors,
  ROUND(AVG(time_on_page), 0) as avg_time_seconds
FROM visitor_intelligence
WHERE created_at >= CURRENT_DATE;
```

### Dashboard: Hot Leads Requiring Action

```sql
-- Hot leads from today (not yet contacted)
SELECT
  id,
  session_id,
  url,
  lead_score,
  ai_insight,
  email,
  name,
  company,
  device,
  created_at
FROM hot_leads
WHERE status = 'new'
  AND created_at >= CURRENT_DATE
ORDER BY lead_score DESC, created_at DESC;
```

### Analytics: Top Performing Pages

```sql
-- Pages with highest average lead scores (last 30 days)
SELECT
  url,
  COUNT(*) as visits,
  ROUND(AVG(lead_score), 1) as avg_score,
  SUM(CASE WHEN category = 'Hot' THEN 1 ELSE 0 END) as hot_visitors,
  ROUND(AVG(time_on_page), 0) as avg_time,
  ROUND(AVG(scroll_depth), 1) as avg_scroll_pct
FROM visitor_intelligence
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY url
ORDER BY avg_score DESC
LIMIT 20;
```

### Analytics: Conversion Funnel

```sql
-- Conversion rates by visitor category
SELECT
  category,
  COUNT(*) as total_visitors,
  SUM(CASE WHEN converted THEN 1 ELSE 0 END) as conversions,
  ROUND(100.0 * SUM(CASE WHEN converted THEN 1 ELSE 0 END) / COUNT(*), 2) as conversion_rate_pct,
  ROUND(AVG(lead_score), 1) as avg_score,
  ROUND(AVG(time_on_page), 0) as avg_time_seconds
FROM visitor_intelligence
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY category
ORDER BY
  CASE category
    WHEN 'Hot' THEN 1
    WHEN 'Warm' THEN 2
    WHEN 'Cold' THEN 3
  END;
```

### Analytics: Traffic Sources Performance

```sql
-- Which traffic sources bring highest quality leads?
SELECT
  COALESCE(utm_source, 'direct') as source,
  COALESCE(utm_medium, 'none') as medium,
  COUNT(*) as visitors,
  ROUND(AVG(lead_score), 1) as avg_score,
  SUM(CASE WHEN category = 'Hot' THEN 1 ELSE 0 END) as hot_visitors,
  SUM(CASE WHEN converted THEN 1 ELSE 0 END) as conversions,
  ROUND(100.0 * SUM(CASE WHEN converted THEN 1 ELSE 0 END) / COUNT(*), 2) as conv_rate_pct
FROM visitor_intelligence
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY utm_source, utm_medium
ORDER BY avg_score DESC;
```

### Analytics: Hourly Traffic Pattern

```sql
-- When do highest-intent visitors come? (for chat staffing)
SELECT
  EXTRACT(HOUR FROM created_at) as hour_of_day,
  COUNT(*) as visitors,
  ROUND(AVG(lead_score), 1) as avg_score,
  SUM(CASE WHEN category = 'Hot' THEN 1 ELSE 0 END) as hot_visitors,
  ROUND(100.0 * SUM(CASE WHEN category = 'Hot' THEN 1 ELSE 0 END) / COUNT(*), 1) as hot_pct
FROM visitor_intelligence
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY EXTRACT(HOUR FROM created_at)
ORDER BY hour_of_day;
```

### Analytics: Visitor Journey Analysis

```sql
-- What pages do hot leads visit before converting?
SELECT
  vi.session_id,
  STRING_AGG(vi.url, ' → ' ORDER BY vi.created_at) as journey,
  COUNT(*) as pages_visited,
  MAX(vi.lead_score) as max_score,
  MIN(vi.created_at) as first_visit,
  MAX(vi.created_at) as last_visit,
  EXTRACT(EPOCH FROM (MAX(vi.created_at) - MIN(vi.created_at)))/60 as session_duration_minutes
FROM visitor_intelligence vi
WHERE vi.session_id IN (
  SELECT DISTINCT session_id
  FROM visitor_intelligence
  WHERE category = 'Hot'
    AND created_at >= NOW() - INTERVAL '7 days'
)
GROUP BY vi.session_id
ORDER BY max_score DESC, pages_visited DESC
LIMIT 20;
```

### Analytics: Weekly Trend Report

```sql
-- Week-over-week performance trends
SELECT
  DATE_TRUNC('week', created_at) as week_starting,
  COUNT(DISTINCT session_id) as sessions,
  ROUND(AVG(lead_score), 1) as avg_score,
  SUM(CASE WHEN category = 'Hot' THEN 1 ELSE 0 END) as hot_leads,
  SUM(CASE WHEN converted THEN 1 ELSE 0 END) as conversions,
  ROUND(100.0 * SUM(CASE WHEN converted THEN 1 ELSE 0 END) / COUNT(*), 2) as conv_rate_pct
FROM visitor_intelligence
WHERE created_at >= NOW() - INTERVAL '12 weeks'
GROUP BY DATE_TRUNC('week', created_at)
ORDER BY week_starting DESC;
```

---

## Dashboard Setup

### Option 1: Build Custom Dashboard (Next.js)

Create a simple analytics page in your website:

**Location:** `apps/website/app/admin/analytics/page.tsx`

```typescript
// Fetch data from your API
const getAnalytics = async () => {
  const res = await fetch('/api/analytics/visitor-intelligence')
  return res.json()
}

// Display key metrics
export default async function AnalyticsPage() {
  const data = await getAnalytics()

  return (
    <div className="grid grid-cols-4 gap-4">
      <MetricCard
        title="Total Visitors"
        value={data.totalVisitors}
        change="+12% vs last week"
      />
      <MetricCard
        title="Hot Leads"
        value={data.hotLeads}
        change="+23% vs last week"
      />
      <MetricCard
        title="Avg Lead Score"
        value={data.avgScore}
        change="+5% vs last week"
      />
      <MetricCard
        title="Conversion Rate"
        value={`${data.conversionRate}%`}
        change="+3% vs last week"
      />
    </div>
  )
}
```

**Charts Library:** Use [Recharts](https://recharts.org/) or [Chart.js](https://www.chartjs.org/)

---

### Option 2: Use Metabase (Free Analytics Tool)

[Metabase](https://www.metabase.com/) is a free, open-source analytics platform.

**Setup (10 minutes):**
1. Download Metabase: `https://www.metabase.com/start/oss/`
2. Run locally: `java -jar metabase.jar`
3. Connect to your PostgreSQL database
4. Create dashboards with drag-and-drop
5. Share with team

**Pre-built Dashboards:**
- Visitor Overview (today's stats)
- Hot Leads Pipeline
- Traffic Sources
- Conversion Funnel
- Page Performance

---

### Option 3: Use Superset (Advanced)

[Apache Superset](https://superset.apache.org/) for advanced analytics.

**Features:**
- SQL Lab for custom queries
- Beautiful visualizations
- Real-time dashboards
- Role-based access

---

### Option 4: Use PostgreSQL + Grafana

[Grafana](https://grafana.com/) for real-time monitoring.

**Best for:**
- Real-time updates
- Alerts and notifications
- Technical metrics
- DevOps teams

---

## Real-time Monitoring

### Option 1: n8n Execution Dashboard

**Built-in, no setup:**
1. Go to n8n: `https://n8n.srv1108737.hstgr.cloud`
2. Click **"Executions"** in left sidebar
3. Filter by workflow: "Visitor Intelligence Agent"
4. See real-time execution log

**What you see:**
- Every visitor tracked
- Lead scores calculated
- AI insights generated
- Database saves confirmed
- Hot leads flagged

---

### Option 2: Database Query Dashboard

**Simple SQL query for real-time monitoring:**

```sql
-- Live visitor feed (auto-refresh every 10 seconds)
SELECT
  id,
  session_id,
  url,
  lead_score,
  category,
  ai_insight,
  device,
  created_at
FROM visitor_intelligence
WHERE created_at >= NOW() - INTERVAL '1 hour'
ORDER BY created_at DESC
LIMIT 50;
```

**Tools that auto-refresh:**
- Metabase (set refresh interval)
- Grafana (live dashboards)
- Superset (auto-refresh panels)
- Custom Next.js page (use SWR or React Query)

---

### Option 3: WebSocket Real-time Feed

**Advanced:** Create a real-time visitor feed on your admin dashboard.

**Tech Stack:**
- PostgreSQL LISTEN/NOTIFY
- WebSocket server
- React component with live updates

---

## Alerts & Notifications

### Alert Type 1: Hot Lead Notifications

**When to alert:** Hot visitor detected (score 60-85)

**Options:**

**A. Telegram Bot (Easiest)**
- Add Telegram node to n8n workflow
- Send instant notification when hot lead detected
- Include: URL, score, AI insight, device

**B. Slack Webhook**
- Add Slack node after "Check if Hot Lead"
- Post to #sales channel
- Tag sales team for immediate follow-up

**C. Email Alert**
- Send email to sales team
- Include visitor details and recommended action

---

### Alert Type 2: Threshold Alerts

**When to alert:** Daily metrics exceed/drop below thresholds

**Examples:**
- 🔥 Hot leads > 10 today (opportunity!)
- ⚠️ Avg lead score < 25 (traffic quality issue)
- 📉 Visitors < 50% of normal (technical issue?)
- 🎉 Conversion rate > 5% (winning!)

**Implementation:**
- Create scheduled n8n workflow (runs daily)
- Query database for metrics
- Compare to thresholds
- Send notification if triggered

---

### Alert Type 3: Anomaly Detection

**When to alert:** Unusual patterns detected

**Examples:**
- Sudden spike in traffic (viral content? bot attack?)
- Drop in lead scores (ad campaign targeting issue?)
- Geographic anomalies (unexpected country traffic)

**Implementation:**
- Calculate rolling averages
- Detect statistical anomalies (>2 standard deviations)
- Alert on significant changes

---

## Quick Start: Minimal Monitoring Setup

**If you want to start TODAY with minimal effort:**

### Step 1: Use Simple Version (No Database)
Import: `visitor-intelligence-agent-CLEAN.json`
- Works immediately
- Data visible in n8n executions
- Good for first 1-2 weeks of testing

### Step 2: Monitor via n8n Executions
1. Go to n8n executions panel
2. Filter by "Visitor Intelligence" workflow
3. See real-time visitor data
4. Export to CSV for analysis

### Step 3: Add Google Sheets (5 minutes)
1. Create Google Sheet: "Visitor Intelligence"
2. Add headers: `timestamp | url | score | category | insight`
3. Add "Google Sheets" node to workflow (after AI Insights)
4. Connect to your sheet
5. Map fields to columns
6. Now data saves automatically!

### Step 4: View in Google Sheets
- Real-time data collection
- Built-in charts and pivot tables
- Share with team
- Export to Excel/CSV

---

## Sample Monitoring Schedule

### Daily (5 minutes)
- Check hot leads from yesterday
- Review avg lead score trend
- Identify any anomalies

### Weekly (15 minutes)
- Top performing pages analysis
- Traffic source performance
- Conversion funnel review
- Hot lead follow-up status

### Monthly (30 minutes)
- Month-over-month trends
- ROI calculation (conversions vs. costs)
- Traffic quality analysis
- Optimization opportunities

---

## Next Steps

**Choose your path:**

1. **Quick Start** → Use basic version + n8n executions (today)
2. **Google Sheets** → Add Google Sheets node (5 minutes)
3. **Production** → Set up PostgreSQL + Metabase (1-2 hours)

**Recommended progression:**
- Week 1: Basic version, manual monitoring
- Week 2: Add Google Sheets, basic analytics
- Week 3: Migrate to PostgreSQL, build dashboard
- Week 4: Add alerts, optimize based on data

---

## Support & Resources

**Documentation:**
- n8n Docs: https://docs.n8n.io
- PostgreSQL Docs: https://www.postgresql.org/docs/
- Metabase Docs: https://www.metabase.com/docs/

**Community:**
- n8n Community: https://community.n8n.io
- PostgreSQL Discord: https://discord.gg/postgres

**Need Help?**
- Review the database schema: `DATABASE-SCHEMA.sql`
- Check sample queries in this guide
- Test queries in SQL editor before dashboard

---

**Created:** October 24, 2025
**Version:** 1.0.0
**Last Updated:** October 24, 2025
