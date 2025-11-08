# n8n Workflow Activation Guide

## ⚠️ Current Issue

Your n8n webhook is returning:
```
404 - "The requested webhook 'visitor-intel' is not registered."
```

This means the workflow needs to be **activated** in n8n.

---

## ✅ Quick Fix (5 Minutes)

### Step 1: Go to n8n
```
https://n8n.srv1108737.hstgr.cloud
```

### Step 2: Import Workflow

1. **Click "Workflows"** (left sidebar)
2. **Check if workflow exists:**
   - Look for: "Visitor Intelligence Agent - Google Sheets"
   - If NOT found → Continue to Step 3
   - If found → Skip to Step 4

3. **Import the workflow:**
   - Click **"+ Add workflow"** (top left or center)
   - Click **"..."** menu (top right)
   - Select **"Import from Clipboard"**
   - Open file: `visitor-intelligence-GOOGLE-SHEETS.json`
   - Copy **ALL contents** (Ctrl+A, Ctrl+C)
   - Paste into n8n
   - Click **"Import"**

### Step 3: Configure Webhook Path

The workflow webhook path needs to match your URL structure.

**Your URL:** `https://n8n.srv1108737.hstgr.cloud/webhook-test/visitor-intel`

In the workflow:
1. Click on **"Webhook Trigger"** node (first node)
2. In the parameters panel:
   - **Path:** Should be `visitor-intel` (not `/webhook-test/visitor-intel`)
   - **Method:** POST
   - **Response Mode:** "Response Node"

**Important:** The base path `/webhook-test/` is configured in your n8n settings. The workflow only needs `visitor-intel`.

### Step 4: Configure Google Sheets (If Not Done)

1. **Click on "Save to Google Sheets" node**
2. **Credentials:**
   - Click dropdown
   - If no credentials exist:
     - Click "Create New"
     - Select "Google Sheets OAuth2 API"
     - Click "Connect my account"
     - Sign in to Google
     - Allow access
     - Click "Save"

3. **Document ID:**
   - Click dropdown
   - Select "NexOperandi - Visitor Intelligence"
   - (Or manually paste your spreadsheet ID)

4. **Sheet Name:**
   - Click dropdown
   - Select "All Visitors" (or "gid=0")

5. **Repeat for "Save to Hot Leads Sheet" node:**
   - Same spreadsheet
   - Sheet: "Hot Leads" (or "gid=1")

### Step 5: Configure Anthropic API

1. **Click on "AI Behavioral Insights" node**
2. **Credentials:**
   - Select your Anthropic credentials
   - If not set up:
     - Click "Create New"
     - Name: `anthropic-credentials`
     - API Key: Your Anthropic API key
     - Click "Save"

### Step 6: Save Workflow

1. **Click "Save" button** (top right)
2. Give it a name if prompted: "Visitor Intelligence Agent - Google Sheets"

### Step 7: ACTIVATE Workflow ⭐

This is the most important step!

1. **Toggle "Active" switch** (top right corner)
2. Switch should turn **GREEN**
3. You should see: **"Workflow activated"** message

**Before activation:**
```
Inactive [     ] Active
```

**After activation:**
```
Inactive [■■■■■] Active  ← Should be GREEN
```

---

## 🧪 Test After Activation

### Test 1: Direct Webhook Test

```bash
curl -X POST https://n8n.srv1108737.hstgr.cloud/webhook-test/visitor-intel \
  -H "Content-Type: application/json" \
  -d '{"url":"https://test.com","timeOnPage":45,"pagesViewed":3,"device":"desktop"}'
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "visitor": { ... },
  "intelligence": { ... },
  "saved": { "google_sheets": true }
}
```

**If you still get 404:**
- Check workflow is ACTIVE (green toggle)
- Check webhook path is `visitor-intel` (not full URL)
- Click "Execute Workflow" button in n8n
- Try test again

### Test 2: From Website

1. **Your dev server should still be running**
   - If not: `npm run dev` in `apps/website`
   - Open: `http://localhost:3003`

2. **Browse around for 10+ seconds**

3. **Check terminal output:**
   ```
   📊 Visitor Intelligence - Received data: {...}
   🔄 Forwarding to n8n webhook: https://n8n.srv1108737.hstgr.cloud/webhook-test/visitor-intel
   📡 n8n response status: 200    ← Should be 200!
   ✅ n8n webhook success
   POST /api/visitor-intel 200 in XXXms
   ```

4. **Check Google Sheets:**
   - Open "All Visitors" tab
   - Should see new row with your visit data!

---

## 🔍 Troubleshooting

### Still Getting 404?

**Check 1: Workflow is Active**
```
n8n → Workflows → Look for green "Active" indicator
```

**Check 2: Webhook Path**
```
Click "Webhook Trigger" node
→ Path should be: visitor-intel
→ NOT: /webhook-test/visitor-intel
```

**Check 3: Test in n8n UI**
```
1. Click "Webhook Trigger" node
2. Click "Execute Workflow" button (top)
3. Immediately run curl test
4. Should work once
5. Then activate workflow for permanent access
```

### Getting Different Error?

**500 Error:**
- Check Google Sheets credentials are connected
- Check spreadsheet has correct sheet names
- Check Anthropic API key is valid

**Timeout:**
- n8n might be processing slowly
- Check n8n execution logs
- Verify all nodes are configured

**Empty Response:**
- Check all nodes are connected properly
- Look at n8n execution to see where it failed

---

## 📊 Verify in n8n Dashboard

After successful test:

1. **Go to n8n → Executions** (left sidebar)
2. You should see:
   - Workflow: "Visitor Intelligence Agent - Google Sheets"
   - Status: ✅ Success
   - Mode: Production (if workflow active)

3. **Click on execution to see:**
   - Input data (webhook received)
   - Lead score calculation
   - AI insight generated
   - Google Sheets save successful

---

## ✅ Success Checklist

- [ ] Workflow imported to n8n
- [ ] Google Sheets credentials connected
- [ ] Spreadsheet selected ("NexOperandi - Visitor Intelligence")
- [ ] Both sheets configured ("All Visitors" + "Hot Leads")
- [ ] Anthropic API credentials connected
- [ ] Workflow SAVED
- [ ] Workflow ACTIVATED (green toggle)
- [ ] Webhook test returns 200 OK
- [ ] Website test works (browse 10+ seconds)
- [ ] Data appears in Google Sheets

---

## 🎯 Quick Summary

**Problem:** Webhook returns 404
**Cause:** Workflow not activated
**Solution:** Toggle "Active" switch in n8n (must be green)
**Test:** Refresh website and browse for 10 seconds

---

## 📞 Need Help?

If you're still stuck:

1. **Screenshot of n8n workflow:**
   - Show the workflow canvas
   - Show the "Active" toggle state
   - Show webhook trigger node settings

2. **Check n8n logs:**
   - Settings → Log files
   - Look for webhook registration errors

3. **Verify webhook URL:**
   - Your workflow uses: `visitor-intel`
   - Your base URL is: `https://n8n.srv1108737.hstgr.cloud/webhook-test/`
   - Final URL: `https://n8n.srv1108737.hstgr.cloud/webhook-test/visitor-intel`

---

**Once activated, everything will work automatically!** 🚀

The website is already set up and ready. It's just waiting for n8n to respond with 200 instead of 404.
