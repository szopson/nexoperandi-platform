# Visitor Intelligence - Quick Start Guide

## ⚡ 10-Minute Setup

### Step 1: Create Google Sheet (2 min)
1. Go to [sheets.google.com](https://sheets.google.com)
2. Create new spreadsheet: "NexOperandi - Visitor Intelligence"
3. Sheet 1: "All Visitors" with headers:
   ```
   Timestamp | Date | Time | Session ID | Visitor ID | URL | Page Title | Time on Page | Pages Viewed | Scroll Depth | Device | Browser | OS | Referrer | UTM Source | UTM Medium | UTM Campaign | Lead Score | Category | Action | AI Insight | Email | Name | Company
   ```
4. Sheet 2: "Hot Leads" with headers:
   ```
   Timestamp | Date | Session ID | URL | Lead Score | AI Insight | Device | Referrer | Email | Name | Company | Status | Contacted | Notes
   ```
5. Copy Spreadsheet ID from URL

### Step 2: Import to n8n (3 min)
1. Open file: `visitor-intelligence-GOOGLE-SHEETS.json`
2. Copy contents
3. n8n → Add workflow → Import from Clipboard
4. Paste and import

### Step 3: Connect Google Sheets (3 min)
1. Click "Save to Google Sheets" node
2. Credentials → Create New
3. Click "Connect my account"
4. Sign in to Google and allow access
5. Select your spreadsheet
6. Select "All Visitors" sheet
7. Repeat for "Save to Hot Leads Sheet" (select "Hot Leads" sheet)

### Step 4: Add Anthropic API (1 min)
1. Click "AI Behavioral Insights" node
2. Select your Anthropic credentials
3. (Or create new with your API key)

### Step 5: Activate (1 min)
1. Save workflow
2. Toggle "Active" switch ON
3. Note webhook URL: `http://piotr108.mikrus.xyz:40233/webhook/visitor-intel`

---

## 🧪 Test It

```bash
curl -X POST http://piotr108.mikrus.xyz:40233/webhook/visitor-intel \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://nexoperandi.ai/pricing",
    "timeOnPage": 45,
    "pagesViewed": 3,
    "device": "desktop",
    "referrer": "https://google.com"
  }'
```

Check Google Sheets → You should see a new row! 🎉

---

## 📊 Data Fields

**Required:**
- `url` - Page URL

**Optional:**
- `timeOnPage` - Seconds (affects score)
- `pagesViewed` - Number (affects score)
- `device` - desktop/mobile/tablet
- `referrer` - Referring URL
- `utmSource`, `utmMedium`, `utmCampaign` - UTM tracking
- `email`, `name`, `company` - Contact info (if known)

---

## 🎯 Scoring System

```
Base:              10 points
Time (1pt/10sec):  0-30 points
Pages (5pts/page): 0-25 points
High-value page:   +20 points (pricing/demo/contact/enterprise/solutions)
──────────────────────────────
Total:             0-85 points

Categories:
• 0-29:  Cold (monitor)
• 30-59: Warm (engage_email)
• 60-85: Hot (trigger_chat)
```

---

## 📈 View Your Data

**Google Sheets:**
- All Visitors → Complete data
- Hot Leads → High-intent visitors only

**Create Charts:**
1. Select data range
2. Insert → Chart
3. Suggested: Pie chart (Category), Line chart (Date)

**Share with Team:**
1. Click "Share" button
2. Add team emails
3. Set permissions (Editor/Viewer)

---

## 🔥 Hot Lead Workflow

When score ≥ 60:
1. ✅ Saved to "Hot Leads" sheet
2. ✅ Status: "New"
3. 📧 Sales team reviews daily
4. ✏️ Update "Status" column when contacted
5. 📝 Add notes in "Notes" column

---

## 💡 Daily Monitoring

**2-Minute Morning Check:**
1. Open "Hot Leads" sheet
2. Filter by Status = "New"
3. Review and contact
4. Update Status → "Contacted"

**Weekly Review:**
1. Check "All Visitors" sheet
2. Sort by Lead Score
3. Analyze traffic sources (UTM columns)
4. Review AI Insights for patterns

---

## 🚨 Troubleshooting

**No data in sheets?**
→ Check n8n Executions for errors
→ Verify workflow is Active (green toggle)
→ Re-authenticate Google Sheets credentials

**AI Insight empty?**
→ Check Anthropic API key is valid
→ Verify API credits at console.anthropic.com

**Duplicate rows?**
→ Check webhook isn't called twice
→ Use Data → Remove duplicates

---

## 📱 Next Steps

**Week 1:** Monitor data collection, verify accuracy
**Week 2:** Add to website (client-side tracking script)
**Week 3:** Train sales team on hot leads workflow
**Week 4:** Build charts and dashboard

---

## 🔗 Files Reference

- **Workflow:** `visitor-intelligence-GOOGLE-SHEETS.json`
- **Full Guide:** `GOOGLE-SHEETS-SETUP.md`
- **Monitoring:** `MONITORING-GUIDE.md`

---

## 🎯 Quick Stats

**Setup Time:** 10 minutes
**Cost:** $0 (free tier)
**Capacity:** 5M cells ≈ 50K visitors
**AI Cost:** ~$0.10 per 1000 visitors

---

**Webhook URL:**
```
http://piotr108.mikrus.xyz:40233/webhook/visitor-intel
```

**Ready to track visitors!** 🚀
