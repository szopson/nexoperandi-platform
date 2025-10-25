# Visitor Intelligence Agent - Google Sheets Edition

## Overview

Automatically track, score, and analyze website visitors with AI-powered behavioral insights. All data stored in Google Sheets for easy access and team collaboration.

**Setup Time:** 10 minutes
**Cost:** Free (Google Sheets + Anthropic API)
**Capacity:** Up to 50,000 visitors

---

## What It Does

### 🎯 Automatic Visitor Tracking
- Captures every visitor interaction
- Calculates engagement score (0-85)
- Categorizes as Hot/Warm/Cold
- AI analyzes buying intent

### 📊 Data Storage
- All visitors → Google Sheets "All Visitors" tab
- Hot leads (score 60+) → Separate "Hot Leads" tab
- Real-time updates
- Easy team sharing

### 🤖 AI Insights
- Claude 3.5 Haiku analyzes each visitor
- Provides actionable behavioral insights
- Identifies buying signals
- Recommends next actions

---

## Files Included

| File | Purpose | Time |
|------|---------|------|
| **QUICK-START.md** | 10-minute setup guide | 5 min read |
| **GOOGLE-SHEETS-SETUP.md** | Detailed step-by-step instructions | 15 min read |
| **visitor-intelligence-GOOGLE-SHEETS.json** | n8n workflow (copy-paste ready) | - |
| **MONITORING-GUIDE.md** | Analytics and monitoring guide | 20 min read |
| **DATABASE-SCHEMA.sql** | For PostgreSQL upgrade (later) | - |

---

## Quick Start

### 1. Create Google Sheet (2 min)

**Sheet 1: "All Visitors"**
```
Timestamp | Date | Time | Session ID | Visitor ID | URL | Page Title |
Time on Page | Pages Viewed | Scroll Depth | Device | Browser | OS |
Referrer | UTM Source | UTM Medium | UTM Campaign | Lead Score |
Category | Action | AI Insight | Email | Name | Company
```

**Sheet 2: "Hot Leads"**
```
Timestamp | Date | Session ID | URL | Lead Score | AI Insight |
Device | Referrer | Email | Name | Company | Status | Contacted | Notes
```

### 2. Import Workflow to n8n (3 min)
1. Copy `visitor-intelligence-GOOGLE-SHEETS.json`
2. n8n → Import from Clipboard
3. Connect Google Sheets credentials
4. Select your spreadsheet
5. Activate workflow

### 3. Test (2 min)
```bash
curl -X POST http://piotr108.mikrus.xyz:40233/webhook/visitor-intel \
  -H "Content-Type: application/json" \
  -d '{"url":"https://nexoperandi.ai/pricing","timeOnPage":45,"pagesViewed":3}'
```

Check Google Sheets → New row appears! ✅

---

## Workflow Architecture

```
┌─────────────┐
│   Visitor   │
│   on Site   │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  Webhook POST   │
│  /visitor-intel │
└──────┬──────────┘
       │
       ▼
┌──────────────────────┐
│  Calculate Score     │
│  • Time: 0-30 pts    │
│  • Pages: 0-25 pts   │
│  • High-value: +20   │
│  • Total: 0-85       │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  AI Analysis         │
│  Claude 3.5 Haiku    │
│  Behavioral Insight  │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Save to Sheets      │
│  "All Visitors" tab  │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Check Score         │
│  Hot lead? (60+)     │
└──────┬───────────────┘
       │
       ├─── Yes ───┐
       │           ▼
       │    ┌─────────────────┐
       │    │ Save to         │
       │    │ "Hot Leads" tab │
       │    └─────────────────┘
       │
       ▼
┌──────────────────────┐
│  Return Response     │
│  JSON with insights  │
└──────────────────────┘
```

---

## Lead Scoring System

### Score Calculation

```
Base Visit:           10 points
────────────────────────────────
Time on Page:         1 pt per 10 seconds (max 30)
  • 0-10s   = 0-1 pts
  • 30s     = 3 pts
  • 60s     = 6 pts
  • 180s+   = 30 pts (max)

Pages Viewed:         5 pts per page (max 25)
  • 1 page  = 5 pts
  • 3 pages = 15 pts
  • 5+ pages = 25 pts (max)

High-Value Page:      +20 bonus
  • /pricing
  • /demo
  • /contact
  • /enterprise
  • /solutions
────────────────────────────────
Total Possible:       85 points
```

### Categories

| Score | Category | Action | Meaning |
|-------|----------|--------|---------|
| 0-29 | ❄️ **Cold** | Monitor | Casual browsing, low intent |
| 30-59 | 🌤️ **Warm** | Engage via email | Showing interest, needs nurturing |
| 60-85 | 🔥 **Hot** | Trigger chat | High buying intent, act now! |

---

## Data Collected

### Required
- `url` - Page URL visited

### Behavioral Data
- `timeOnPage` - Seconds spent
- `pagesViewed` - Number of pages
- `scrollDepth` - % of page scrolled

### Technical Data
- `device` - desktop/mobile/tablet
- `browser` - Chrome, Safari, Firefox, etc.
- `os` - Windows, macOS, iOS, Android
- `referrer` - Where they came from

### Marketing Data
- `utmSource` - google, facebook, linkedin
- `utmMedium` - cpc, organic, social
- `utmCampaign` - Campaign name

### Contact Data (if known)
- `email` - Visitor email
- `name` - Visitor name
- `company` - Company name

---

## Example Scenarios

### Scenario 1: Hot Lead 🔥
```json
{
  "url": "https://nexoperandi.ai/pricing",
  "timeOnPage": 120,
  "pagesViewed": 4,
  "device": "desktop",
  "email": "cto@acme.com",
  "referrer": "https://google.com"
}
```
**Score:** 75 points
- Base: 10
- Time (120s): 12
- Pages (4): 20
- High-value page (/pricing): +20
- **Category:** Hot
- **Action:** Trigger chat immediately!

### Scenario 2: Warm Lead 🌤️
```json
{
  "url": "https://nexoperandi.ai/solutions",
  "timeOnPage": 60,
  "pagesViewed": 2,
  "device": "mobile"
}
```
**Score:** 41 points
- Base: 10
- Time (60s): 6
- Pages (2): 10
- High-value page (/solutions): +20
- **Category:** Warm
- **Action:** Add to email nurture campaign

### Scenario 3: Cold Visitor ❄️
```json
{
  "url": "https://nexoperandi.ai/blog/post-1",
  "timeOnPage": 10,
  "pagesViewed": 1,
  "device": "mobile"
}
```
**Score:** 16 points
- Base: 10
- Time (10s): 1
- Pages (1): 5
- **Category:** Cold
- **Action:** Monitor for repeat visits

---

## Google Sheets Features

### Built-in Analytics

**Create Charts:**
1. Select data columns
2. Insert → Chart
3. Suggested charts:
   - **Pie Chart:** Lead score categories
   - **Line Chart:** Daily visitor trend
   - **Bar Chart:** Traffic sources
   - **Column Chart:** Hourly patterns

**Create Pivot Tables:**
1. Select all data
2. Insert → Pivot table
3. Examples:
   - Avg score by traffic source
   - Conversion rate by device
   - Hot leads by campaign

### Sharing

**Team Access:**
- **Sales:** Editor (can update Status/Notes)
- **Marketing:** Viewer (can analyze data)
- **Execs:** Viewer (dashboards only)

**Collaboration:**
- Add comments on hot leads
- Assign leads to reps
- Track follow-up status

---

## Daily Workflow

### Morning Routine (5 minutes)

**1. Check Hot Leads (2 min)**
```
Open "Hot Leads" sheet
→ Filter: Status = "New"
→ Review overnight hot leads
→ Assign to sales reps
→ Update Status → "Contacted"
```

**2. Review Yesterday (2 min)**
```
Open "All Visitors" sheet
→ Sort by: Lead Score (high to low)
→ Check for patterns
→ Note top pages
→ Review AI insights
```

**3. Quick Stats (1 min)**
```
Count: Total visitors yesterday
Average: Lead score
Count: Hot leads generated
Check: Traffic source performance
```

---

## Analytics Examples

### Query: Top Performing Pages
```
1. Open "All Visitors" sheet
2. Create Pivot Table:
   - Rows: URL
   - Values: Lead Score (Average)
   - Sort: Descending
3. Result: Which pages convert best
```

### Query: Traffic Source ROI
```
1. Open "All Visitors" sheet
2. Create Pivot Table:
   - Rows: UTM Source
   - Values:
     • Count of visitors
     • Average Lead Score
     • Count of Hot leads
3. Result: Which channels bring quality traffic
```

### Query: Hourly Patterns
```
1. Open "All Visitors" sheet
2. Extract hour from "Time" column
3. Create Pivot Table:
   - Rows: Hour
   - Values: Count, Avg Score
4. Result: Best times for live chat staffing
```

---

## Scaling & Limits

### Google Sheets Limits
- **Max cells:** 5 million
- **Max rows:** ~200,000 (with 24 columns)
- **Estimated capacity:** 50,000 visitors

### When to Upgrade

**Migrate to PostgreSQL if:**
- You exceed 10,000 visitors/month
- You need advanced analytics
- You want real-time dashboards
- You need API access to data

**Migration path:**
1. Set up PostgreSQL database
2. Run `DATABASE-SCHEMA.sql`
3. Import `visitor-intelligence-WITH-DATABASE.json`
4. Keep Google Sheets for last 30 days
5. Archive to database monthly

---

## Cost Breakdown

### Current Setup (Almost Free)
- **Google Sheets:** Free
- **n8n:** Already running
- **Anthropic API:** ~$0.0001 per visitor
  - 100 visitors = $0.01
  - 1,000 visitors = $0.10
  - 10,000 visitors = $1.00

### Expected Monthly Cost

| Traffic | Anthropic | Total |
|---------|-----------|-------|
| 500 visitors | $0.05 | **$0.05** |
| 1,000 visitors | $0.10 | **$0.10** |
| 5,000 visitors | $0.50 | **$0.50** |
| 10,000 visitors | $1.00 | **$1.00** |
| 50,000 visitors | $5.00 | **$5.00** |

**ROI:** Even at 50K visitors/month ($5), if you convert just 1 customer, the ROI is massive.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| No data in sheets | Check workflow is Active, verify Google Sheets credentials |
| Duplicate rows | Check webhook isn't called twice, use Remove Duplicates |
| AI Insight empty | Verify Anthropic API key, check API credits |
| Wrong spreadsheet | Update Document ID in both Save nodes |
| Permission error | Re-authenticate Google Sheets OAuth |

---

## Support & Resources

**Documentation:**
- [Quick Start](QUICK-START.md) - 10-minute setup
- [Full Setup Guide](GOOGLE-SHEETS-SETUP.md) - Detailed instructions
- [Monitoring Guide](MONITORING-GUIDE.md) - Analytics deep dive

**Community:**
- n8n Community: https://community.n8n.io
- Anthropic Docs: https://docs.anthropic.com

---

## Upgrade Path

### Current: Google Sheets (Week 1-4)
- ✅ Free and easy
- ✅ Good for testing
- ✅ Team collaboration
- ⚠️ Limited to 50K visitors

### Next: PostgreSQL Database (Month 2+)
- ✅ Unlimited scalability
- ✅ Advanced analytics
- ✅ Real-time dashboards
- ✅ API access
- 💰 ~$50-150/month

### Future: Custom Dashboard (Month 3+)
- ✅ Next.js admin panel
- ✅ Real-time updates
- ✅ Custom visualizations
- ✅ Team management
- 💰 Development time

---

## Success Metrics

### Week 1 Goals
- ✅ 100+ visitors tracked
- ✅ Accurate scoring validated
- ✅ AI insights reviewed
- ✅ No data collection errors

### Month 1 Goals
- ✅ 1,000+ visitors tracked
- ✅ 10+ hot leads identified
- ✅ Sales team trained
- ✅ Process established

### Quarter 1 Goals
- ✅ 10,000+ visitors tracked
- ✅ 50+ hot leads converted
- ✅ Data-driven optimizations
- ✅ Proven ROI

---

## License & Credits

**Created by:** NexOperandi AI Team
**Version:** 1.0.0 (Google Sheets Edition)
**Last Updated:** October 24, 2025

**Built with:**
- n8n (workflow automation)
- Claude 3.5 Haiku (AI insights)
- Google Sheets (data storage)

---

## Get Started Now

**3 Simple Steps:**

1. **Read:** [QUICK-START.md](QUICK-START.md) (5 minutes)
2. **Setup:** Follow the guide (10 minutes)
3. **Test:** Send test visitor (2 minutes)

**Total time:** 17 minutes to working visitor intelligence!

---

**Questions?** Check [GOOGLE-SHEETS-SETUP.md](GOOGLE-SHEETS-SETUP.md) for detailed troubleshooting.

**Ready to upgrade?** See [MONITORING-GUIDE.md](MONITORING-GUIDE.md) for PostgreSQL migration.

🚀 **Let's track some visitors!**
