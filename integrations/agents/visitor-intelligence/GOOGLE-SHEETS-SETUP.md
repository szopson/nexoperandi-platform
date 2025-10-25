# Google Sheets Setup Guide - Visitor Intelligence Agent

## Overview

This guide will walk you through setting up the Visitor Intelligence Agent with Google Sheets storage in **10 minutes**.

**What you'll get:**
- ✅ Automatic visitor tracking
- ✅ Real-time data in Google Sheets
- ✅ Hot leads in separate sheet
- ✅ Built-in charts and analytics
- ✅ Easy team sharing

---

## Step 1: Create Google Sheet (2 minutes)

### 1.1 Create New Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"Blank"** to create new spreadsheet
3. Name it: **"NexOperandi - Visitor Intelligence"**

### 1.2 Set Up Sheet 1: All Visitors

**Rename Sheet1:**
- Click on "Sheet1" tab at bottom
- Rename to: **"All Visitors"**

**Add Header Row (Row 1):**
Copy and paste these column headers into row 1:

```
Timestamp	Date	Time	Session ID	Visitor ID	URL	Page Title	Time on Page	Pages Viewed	Scroll Depth	Device	Browser	OS	Referrer	UTM Source	UTM Medium	UTM Campaign	Lead Score	Category	Action	AI Insight	Email	Name	Company
```

**Format Header Row:**
1. Select row 1
2. Click **Format** → **Text wrapping** → **Wrap**
3. Click **Format** → **Text** → **Bold**
4. Click **View** → **Freeze** → **1 row**
5. (Optional) Add background color to header

### 1.3 Set Up Sheet 2: Hot Leads

**Create Second Sheet:**
1. Click **+** at bottom left to add new sheet
2. Rename to: **"Hot Leads"**

**Add Header Row (Row 1):**
Copy and paste these column headers into row 1:

```
Timestamp	Date	Session ID	URL	Lead Score	AI Insight	Device	Referrer	Email	Name	Company	Status	Contacted	Notes
```

**Format Header Row:**
- Same formatting as Sheet 1 (bold, freeze, wrap)

### 1.4 Get Your Spreadsheet ID

1. Look at the URL of your Google Sheet:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
   ```
2. Copy the **SPREADSHEET_ID_HERE** part
3. Save it somewhere - you'll need it for n8n

**Example:**
```
https://docs.google.com/spreadsheets/d/1abc-DEF_ghi123JKL456mno/edit
                                     ↑ This is your Spreadsheet ID
```

---

## Step 2: Import Workflow to n8n (3 minutes)

### 2.1 Open the Workflow File

1. Open file: `visitor-intelligence-GOOGLE-SHEETS.json`
2. Copy the entire contents (Ctrl+A, Ctrl+C)

### 2.2 Import to n8n

1. Go to n8n: `http://piotr108.mikrus.xyz:40233`
2. Click **"Add workflow"** button (top left)
3. Click **"..."** menu (top right)
4. Select **"Import from Clipboard"**
5. Paste the JSON
6. Click **"Import"**

You should now see the workflow with 8 nodes!

---

## Step 3: Connect Google Sheets to n8n (5 minutes)

### 3.1 Create Google Sheets Credentials in n8n

1. In n8n, click on the **"Save to Google Sheets"** node
2. Under **"Credentials"**, click the dropdown
3. Click **"Create New Credential"**
4. You'll see **"Google Sheets OAuth2 API"**

### 3.2 Set Up OAuth2 Connection

**Important: You have 2 options:**

#### Option A: Use n8n's OAuth (Easiest - Recommended)

1. In the credentials form, you'll see pre-filled fields
2. Click the **"Connect my account"** button
3. A popup will open asking you to sign in to Google
4. Sign in with your Google account
5. Click **"Allow"** to grant n8n access to Google Sheets
6. The popup will close automatically
7. Click **"Save"** in n8n

**Done! Skip to Step 3.3**

#### Option B: Use Your Own OAuth App (Advanced)

Only if Option A doesn't work or you want more control:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project: "n8n Integration"
3. Enable Google Sheets API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://piotr108.mikrus.xyz:40233/rest/oauth2-credential/callback`
6. Copy Client ID and Client Secret
7. Paste into n8n credentials form
8. Click "Connect my account"
9. Authorize access
10. Save

### 3.3 Configure the "Save to Google Sheets" Node

1. Click on **"Save to Google Sheets"** node
2. Under **"Document ID"**, click the dropdown
3. You should see your spreadsheet: **"NexOperandi - Visitor Intelligence"**
4. Select it
5. Under **"Sheet Name"**, select **"All Visitors"**
6. The column mappings are already configured!

### 3.4 Configure the "Save to Hot Leads Sheet" Node

1. Click on **"Save to Hot Leads Sheet"** node
2. Select same credentials (should auto-select)
3. Under **"Document ID"**, select same spreadsheet
4. Under **"Sheet Name"**, select **"Hot Leads"**
5. Column mappings already configured!

### 3.5 Configure Anthropic Credentials

1. Click on **"AI Behavioral Insights"** node
2. Under **"Credentials"**, select your existing Anthropic credentials
3. If you don't have it yet:
   - Click **"Create New Credential"**
   - Name: `anthropic-credentials`
   - API Key: Your Anthropic API key
   - Save

---

## Step 4: Activate Workflow (1 minute)

### 4.1 Save and Activate

1. Click **"Save"** button (top right)
2. Toggle the **"Active"** switch (top right) to ON
3. You should see: ✅ **"Active"**

### 4.2 Note Your Webhook URL

The webhook URL is:
```
http://piotr108.mikrus.xyz:40233/webhook/visitor-intel
```

Save this - you'll need it to send visitor data!

---

## Step 5: Test the Workflow (2 minutes)

### 5.1 Send Test Request

Open your terminal or use a tool like Postman:

```bash
curl -X POST http://piotr108.mikrus.xyz:40233/webhook/visitor-intel \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://nexoperandi.ai/pricing",
    "timeOnPage": 45,
    "pagesViewed": 3,
    "device": "desktop",
    "browser": "Chrome",
    "referrer": "https://google.com",
    "utmSource": "google",
    "utmMedium": "cpc",
    "utmCampaign": "ai-automation"
  }'
```

### 5.2 Check Results

**In n8n:**
1. Click **"Executions"** (left sidebar)
2. You should see a successful execution ✅
3. Click on it to see details

**In Google Sheets:**
1. Open your Google Sheet
2. Go to **"All Visitors"** tab
3. You should see a new row with the visitor data! 🎉
4. Check the **AI Insight** column for the behavioral analysis

**If it's a Hot Lead (score 60+):**
- Also check **"Hot Leads"** tab
- Should see the same visitor there

---

## Step 6: Add More Test Data (Optional)

Test different scenarios:

**Test 1: Cold Visitor (Low Score)**
```bash
curl -X POST http://piotr108.mikrus.xyz:40233/webhook/visitor-intel \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://nexoperandi.ai/blog",
    "timeOnPage": 5,
    "pagesViewed": 1,
    "device": "mobile",
    "referrer": "direct"
  }'
```

Expected: Score ~15 (Cold, monitor)

**Test 2: Warm Visitor (Medium Score)**
```bash
curl -X POST http://piotr108.mikrus.xyz:40233/webhook/visitor-intel \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://nexoperandi.ai/solutions",
    "timeOnPage": 60,
    "pagesViewed": 2,
    "device": "desktop",
    "referrer": "https://linkedin.com"
  }'
```

Expected: Score ~51 (Warm, engage_email)

**Test 3: Hot Visitor with Contact Info**
```bash
curl -X POST http://piotr108.mikrus.xyz:40233/webhook/visitor-intel \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://nexoperandi.ai/demo",
    "timeOnPage": 120,
    "pagesViewed": 5,
    "device": "desktop",
    "email": "john@acmecorp.com",
    "name": "John Smith",
    "company": "Acme Corp",
    "referrer": "https://google.com",
    "utmSource": "google",
    "utmCampaign": "demo-request"
  }'
```

Expected: Score ~75 (Hot, trigger_chat) + appears in Hot Leads sheet

---

## Google Sheets Data Structure

### All Visitors Sheet

| Column | Description | Example |
|--------|-------------|---------|
| Timestamp | Full ISO timestamp | 2025-10-24T14:30:00.000Z |
| Date | Date only | 2025-10-24 |
| Time | Time only | 14:30:00 |
| Session ID | Unique session identifier | session-1729780200000 |
| Visitor ID | Unique visitor ID (if provided) | visitor-abc123 |
| URL | Page visited | https://nexoperandi.ai/pricing |
| Page Title | Page title | Pricing - NexOperandi |
| Time on Page | Seconds on page | 45 |
| Pages Viewed | Total pages in session | 3 |
| Scroll Depth | % scrolled | 75 |
| Device | Device type | desktop |
| Browser | Browser name | Chrome |
| OS | Operating system | Windows |
| Referrer | Referring URL | https://google.com |
| UTM Source | Traffic source | google |
| UTM Medium | Traffic medium | cpc |
| UTM Campaign | Campaign name | ai-automation |
| Lead Score | Calculated score (0-85) | 69 |
| Category | Hot/Warm/Cold | Hot |
| Action | Recommended action | trigger_chat |
| AI Insight | Claude's analysis | Strong buying intent... |
| Email | Visitor email (if known) | john@acme.com |
| Name | Visitor name (if known) | John Smith |
| Company | Company name (if known) | Acme Corp |

### Hot Leads Sheet

Subset of columns for quick review of high-intent visitors:

| Column | Description |
|--------|-------------|
| Timestamp | When detected |
| Date | Date detected |
| Session ID | Session identifier |
| URL | Page they were on |
| Lead Score | Score (60-85) |
| AI Insight | Behavioral analysis |
| Device | Device type |
| Referrer | Where they came from |
| Email | Contact email |
| Name | Contact name |
| Company | Company name |
| Status | New/Contacted/Qualified/Converted |
| Contacted | Date/time contacted |
| Notes | Sales team notes |

---

## Built-in Analytics with Google Sheets

### Create Charts (5 minutes)

**1. Lead Score Distribution (Pie Chart)**
1. Select columns: `Category` and `Lead Score`
2. Insert → Chart
3. Chart type: Pie chart
4. Shows: Hot vs Warm vs Cold breakdown

**2. Daily Visitor Trend (Line Chart)**
1. Select columns: `Date` and `Session ID`
2. Insert → Chart → Line chart
3. Shows: Visitors over time

**3. Traffic Sources (Bar Chart)**
1. Select columns: `UTM Source` and `Lead Score`
2. Insert → Chart → Bar chart
3. Shows: Which sources bring quality traffic

**4. Device Breakdown (Pie Chart)**
1. Select columns: `Device`
2. Insert → Chart → Pie chart
3. Shows: Desktop vs Mobile vs Tablet

### Create Pivot Tables (Advanced)

**Example: Avg Lead Score by Traffic Source**
1. Select all data
2. Insert → Pivot table
3. Rows: UTM Source
4. Values: Lead Score (Average)
5. Shows: Which channels bring highest quality leads

---

## Daily Monitoring Workflow

### Morning Routine (2 minutes):

1. **Open "Hot Leads" sheet**
   - Review new hot leads from yesterday
   - Update "Status" column as you contact them
   - Add notes in "Notes" column

2. **Check "All Visitors" sheet**
   - Sort by Lead Score (highest first)
   - Look for patterns in high-scoring visitors
   - Check UTM data for campaign performance

3. **Review Charts**
   - Check daily visitor trend
   - Monitor lead score distribution
   - Analyze traffic source performance

---

## Sharing with Team

### Share the Spreadsheet:

1. Click **"Share"** button (top right)
2. Add team members:
   - **Sales team:** Editor access (can update Status/Notes)
   - **Marketing team:** Viewer access (can see data)
   - **Executives:** Viewer access (dashboards only)
3. Click **"Send"**

### Create a Dashboard Tab:

1. Add new sheet: **"Dashboard"**
2. Add summary metrics:
   ```
   =COUNTA(FILTER('All Visitors'!A:A, 'All Visitors'!B:B = TODAY()))
   ```
   (Today's visitor count)
3. Embed charts from other sheets
4. Share this tab with executives

---

## Troubleshooting

### Issue: "No data appearing in Google Sheets"

**Check:**
1. Is workflow active? (toggle should be green)
2. Are credentials connected? (test the connection)
3. Is the spreadsheet ID correct?
4. Check n8n executions for errors

**Fix:**
1. Go to n8n Executions
2. Click on failed execution
3. Read error message
4. Usually: re-authenticate Google Sheets

---

### Issue: "Duplicate rows in sheets"

**Cause:** Workflow executed multiple times

**Solution:**
1. Check webhook isn't being called twice
2. Remove duplicates: Data → Remove duplicates

---

### Issue: "Hot leads not saving to second sheet"

**Check:**
1. "Hot Leads" sheet exists
2. Header row is correct
3. Sheet name in n8n matches exactly

---

### Issue: "AI Insight column is empty"

**Check:**
1. Anthropic API key is valid
2. You have API credits
3. Check n8n execution logs for AI node errors

**Fix:**
1. Test Anthropic credentials
2. Check API usage at console.anthropic.com

---

## Data Management

### Prevent Sheet from Getting Too Large:

**Option 1: Archive Monthly**
1. Create new tab: "Archive - October 2025"
2. Move old data there
3. Keep last 30 days in main sheet

**Option 2: Auto-Delete Old Data**
1. Use Google Apps Script
2. Delete rows older than 90 days
3. Schedule to run daily

**Option 3: Export to Database**
1. Once you hit 10K rows, migrate to PostgreSQL
2. Use database version of workflow
3. Keep Google Sheets for last 30 days only

---

## Next Steps

### After Setup:

**Week 1: Monitor & Learn**
- Watch data collection
- Review AI insights quality
- Check scoring accuracy
- Adjust if needed

**Week 2: Add Integrations**
- Connect to your website (client-side tracking)
- Add UTM tracking to marketing campaigns
- Train sales team on hot leads workflow

**Week 3: Optimize**
- Review what pages convert best
- Adjust scoring weights if needed
- Create custom charts
- Set up Slack/email alerts for hot leads

**Week 4: Scale**
- Consider migrating to PostgreSQL database
- Build custom dashboard
- Add more advanced analytics

---

## Cost Breakdown

**Current Setup (Free!):**
- ✅ Google Sheets: Free (up to 5M cells)
- ✅ n8n: Already running
- ✅ Anthropic API: ~$0.0001 per visitor
  - 1000 visitors/month = ~$0.10
  - 10,000 visitors/month = ~$1.00

**When to Upgrade:**
- Google Sheets limit: 5M cells ≈ 50K visitors
- If you hit this, migrate to PostgreSQL database
- Cost: ~$50-150/month for managed database

---

## Support

**Need Help?**
1. Check n8n executions for errors
2. Review this guide
3. Check Google Sheets has correct headers
4. Verify credentials are connected

**Common Questions:**
- Q: Can I add more columns?
  - A: Yes! Add to Google Sheets, then update n8n column mapping

- Q: Can I use multiple sheets?
  - A: Yes! Duplicate the "Save to Google Sheets" node for each sheet

- Q: Can I add notifications?
  - A: Yes! Add Slack/Telegram node after "Check if Hot Lead"

---

**Setup Complete! 🎉**

You now have:
- ✅ Automatic visitor tracking
- ✅ Real-time Google Sheets updates
- ✅ Hot leads in separate sheet
- ✅ AI behavioral insights
- ✅ Ready for analytics and charts

**Webhook URL:** `http://piotr108.mikrus.xyz:40233/webhook/visitor-intel`

**Next:** Integrate this webhook with your website's client-side tracking!

---

**Created:** October 24, 2025
**Last Updated:** October 24, 2025
**Version:** 1.0.0
