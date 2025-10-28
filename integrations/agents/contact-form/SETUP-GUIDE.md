# Contact Form AI Lead Qualification - Setup Guide

## 🎯 Overview

This workflow automatically:
1. ✅ **Receives** contact form submissions from your website
2. 🤖 **Uses AI (Claude)** to analyze and qualify the lead
3. 📊 **Scores** the lead (0-100) and assigns priority (High/Medium/Low)
4. 📧 **Emails you** at `ecotoddlershop@gmail.com` with beautiful formatted lead details
5. 💾 **Saves** to Google Sheets for tracking

---

## 📋 Prerequisites

Before you start, you need:
- ✅ n8n account (you already have this)
- ✅ Google account for Sheets
- ✅ Anthropic API key (for Claude AI)
- ✅ Gmail account for sending emails

---

## 🚀 Setup Instructions

### Step 1: Import Workflow to n8n (2 minutes)

1. **Open n8n:** `https://piotr108-20108.wykr.es`
2. **Click "Add workflow"** (+ button top right)
3. **Click the "⋮" menu** → Select "Import from File"
4. **Upload:** `contact-form-ai-qualification.json`
5. **Click "Import"**

✅ Workflow imported!

---

### Step 2: Configure Google Sheets (5 minutes)

#### A. Create Spreadsheet

1. **Go to Google Sheets:** https://sheets.google.com
2. **Create new spreadsheet**
3. **Name it:** "NexOperandi - Contact Form Leads"
4. **Rename Sheet1 to:** "Contact Form Leads"

#### B. Add Column Headers

In row 1, add these exact headers:

| A | B | C | D | E | F | G | H | I | J | K | L | M |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| timestamp | name | email | website | message | lead_score | priority | intent | recommended_action | ai_insights | budget_signals | urgency_signals | fit_signals |

#### C. Format the Sheet (Optional but Nice)

1. **Select row 1** (headers)
2. **Make it bold** and add background color
3. **Freeze row 1:** View → Freeze → 1 row

#### D. Get Spreadsheet ID

From your Google Sheets URL:
```
https://docs.google.com/spreadsheets/d/1ABC123XYZ456/edit
                                      ↑ This is your ID
```

Copy the ID and save it for later!

---

### Step 3: Connect Google Sheets in n8n (3 minutes)

1. **In n8n workflow**, click the **"💾 Save to Google Sheets"** node
2. **Click "Create New Credential"** for Google Sheets OAuth2
3. **Sign in with Google** and grant permissions
4. **In the node settings:**
   - Authentication: OAuth2
   - Select: URL
   - **Paste your spreadsheet URL** (full URL with the ID you copied)
   - Sheet Name: `Contact Form Leads`
5. **Click "Execute Node"** to test
6. ✅ Should show success!

---

### Step 4: Configure Anthropic AI (2 minutes)

1. **Get Anthropic API Key:**
   - Go to: https://console.anthropic.com/settings/keys
   - Click "Create Key"
   - Copy the key (starts with `sk-ant-...`)

2. **In n8n workflow**, click **"🤖 AI Lead Qualification (Claude)"** node
3. **Click "Create New Credential"** for Anthropic API
4. **Paste your API key**
5. **Save**
6. ✅ AI configured!

---

### Step 5: Configure Email Notifications (5 minutes)

#### Option A: Use Gmail (Recommended)

1. **Enable 2-Step Verification** on your Gmail account:
   - Go to: https://myaccount.google.com/security
   - Turn on 2-Step Verification

2. **Create App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - App: "Mail"
   - Device: "n8n"
   - Click "Generate"
   - **Copy the 16-character password**

3. **In n8n workflow**, click **"📧 Send Email Notification"** node
4. **Click "Create New Credential"** for SMTP
5. **Fill in:**
   ```
   User: ecotoddlershop@gmail.com
   Password: [paste the 16-character app password]
   Host: smtp.gmail.com
   Port: 587
   SSL/TLS: Yes
   ```
6. **Save**

#### Option B: Use Custom SMTP

If you have your own email service, use your SMTP settings instead.

---

### Step 6: Update Spreadsheet Link in Email (1 minute)

1. **In n8n workflow**, click **"📧 Send Email Notification"** node
2. **Scroll down** to the HTML email template
3. **Find this line** (at the bottom):
   ```html
   <a href=\"https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID_HERE\" target=\"_blank\">Google Sheets Dashboard</a>
   ```
4. **Replace** `YOUR_SPREADSHEET_ID_HERE` with your actual spreadsheet ID
5. **Save**

---

### Step 7: Activate Workflow (1 minute)

1. **Click the "Active" toggle** (top right) to turn it GREEN
2. ✅ Workflow is now live!

---

### Step 8: Get Webhook URL (1 minute)

1. **Click the "📥 Contact Form Webhook" node**
2. **Look for "Webhook URLs"** section
3. **Copy the Production URL** - it will look like:
   ```
   https://piotr108-20108.wykr.es/webhook/contact-form
   ```
4. **Save this URL** - you'll need it for the website!

---

### Step 9: Update Website Configuration (2 minutes)

1. **Open:** `apps/website/.env.local`
2. **Add this line:**
   ```env
   N8N_WEBHOOK_URL=https://piotr108-20108.wykr.es/webhook/contact-form
   ```
   *(Replace with your actual webhook URL from Step 8)*

3. **Save the file**

---

### Step 10: Restart Dev Server (1 minute)

```bash
cd apps/website
npm run dev
```

✅ Your contact form is now connected to AI lead qualification!

---

## 🧪 Testing

### Test 1: Direct Webhook Test

```bash
curl -X POST https://piotr108-20108.wykr.es/webhook/contact-form \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "website": "https://example.com",
    "message": "I need help building an AI automation system for our enterprise. We have a budget of $50k and need this done urgently within 2 weeks.",
    "timestamp": "2025-10-26T10:00:00Z",
    "source": "Test"
  }'
```

**Expected Results:**
- ✅ Should return success JSON
- ✅ Email sent to `ecotoddlershop@gmail.com`
- ✅ New row in Google Sheets
- ✅ High priority score (this message has strong signals!)

### Test 2: Website Contact Form

1. **Open:** `http://localhost:3003`
2. **Scroll to contact form**
3. **Fill in:**
   - Name: Your name
   - Email: Your email
   - Website: Your website (optional)
   - Message: "I'm interested in AI automation for my business"
4. **Submit**
5. **Check:**
   - ✅ Terminal shows success
   - ✅ Email received at `ecotoddlershop@gmail.com`
   - ✅ Data in Google Sheets

---

## 📧 What the Email Looks Like

You'll receive a beautiful HTML email with:

**Header:**
- 🔥/⚡/📋 Priority emoji
- Lead score badge (color-coded)
- Priority level (High/Medium/Low)

**Contact Information:**
- Name, Email, Website, Timestamp
- Clickable email link to reply

**Their Message:**
- Full message in a styled box

**AI Qualification:**
- **Business Intent:** What they want
- **AI Insights:** 2-3 sentences analyzing the lead
- **Recommended Next Action:** What you should do
- **Signals:**
  - 💰 Budget Signals
  - ⏰ Urgency Signals
  - ✅ Fit Signals

**Quick Actions:**
- 📧 Reply button (opens email client)
- 🌐 Visit website button

---

## 🎯 How AI Qualification Works

The AI analyzes:

1. **Message Content:**
   - Keywords indicating budget ("$50k", "enterprise", "large")
   - Urgency signals ("urgent", "ASAP", "deadline")
   - Problem complexity
   - Technical depth

2. **Lead Quality Indicators:**
   - Has website = more serious
   - Specific problem description = higher quality
   - Mentions budget = ready to buy
   - Timeline mentioned = high intent

3. **Scoring System:**
   - **0-29:** Low priority (tire-kickers, generic inquiries)
   - **30-69:** Medium priority (qualified prospects)
   - **70-100:** High priority (hot leads, ready to buy)

---

## 📊 Lead Score Examples

### High Score (70-95):
> "Hi, I'm CTO at a Series B startup. We need to automate our customer onboarding process. We have a $75k budget allocated and need to implement this by Q1. Can we schedule a call this week?"

**Why High:**
- Clear title/authority (CTO)
- Specific problem (onboarding automation)
- Budget mentioned ($75k)
- Timeline (Q1)
- Ready to talk (schedule call this week)

### Medium Score (40-65):
> "I'm interested in learning more about your AI automation services. We're a small business looking to improve efficiency. What are your rates?"

**Why Medium:**
- General interest (not specific)
- Small business (smaller budget likely)
- Asking about rates (price shopping)
- No timeline or urgency

### Low Score (10-35):
> "Hi, can you help me? I need AI stuff."

**Why Low:**
- Extremely vague
- No context
- No budget signals
- Likely not serious

---

## 🔧 Customization Options

### Change Email Recipient

Edit the **"📧 Send Email Notification"** node:
```
toEmail: "your-email@domain.com"
```

### Adjust AI Analysis

Edit the **"🤖 AI Lead Qualification"** node prompt to focus on different signals:
- Industry-specific keywords
- Company size indicators
- Technical vs non-technical
- B2B vs B2C

### Add More Data to Google Sheets

Edit the **"💾 Save to Google Sheets"** node to add columns like:
- IP address
- User agent
- Referrer URL
- UTM parameters

### Send to Multiple People

In the **"📧 Send Email Notification"** node:
```
toEmail: "sales@company.com, ceo@company.com"
```

Or add a second email node for different recipients based on priority!

---

## 🐛 Troubleshooting

### Email Not Sending

**Check:**
1. Gmail App Password is correct (16 characters)
2. SMTP credentials are saved
3. Node execution shows no errors
4. Check spam folder

**Solution:**
- Verify 2-Step Verification is enabled
- Regenerate App Password
- Test with a simple email first

### Google Sheets Not Saving

**Check:**
1. OAuth2 credentials are connected
2. Spreadsheet URL is correct
3. Sheet name matches exactly: "Contact Form Leads"
4. Headers in row 1 match column names

**Solution:**
- Re-authenticate Google OAuth2
- Verify sheet permissions
- Test node execution manually

### AI Not Responding

**Check:**
1. Anthropic API key is valid
2. You have API credits
3. Node shows execution

**Solution:**
- Verify API key at https://console.anthropic.com/settings/keys
- Check usage/billing
- Try executing the node manually

### Webhook Returns 404

**Check:**
1. Workflow is ACTIVATED (toggle is green)
2. Webhook URL is correct
3. n8n instance is running

**Solution:**
- Activate workflow
- Copy webhook URL from the webhook node
- Update .env.local with correct URL

---

## 💰 Costs

### Anthropic AI (Claude):
- **Model:** Claude 3.5 Haiku (cheapest, fastest)
- **Cost per lead:** ~$0.001-0.003 (less than a penny!)
- **500 leads/month:** ~$0.50-1.50/month

### Google Sheets:
- **Free** (up to millions of cells)

### Gmail:
- **Free** (25,000 emails/day limit)

### n8n:
- You're already running it!

**Total cost:** ~$1-2/month for 500 leads! 🎉

---

## 📈 Next Steps

### Want More Features?

1. **Slack Notifications** for hot leads
2. **Auto-reply email** to the contact
3. **CRM Integration** (HubSpot, Salesforce)
4. **Lead enrichment** (company data lookup)
5. **SMS notifications** for high-priority leads
6. **Meeting scheduler** link in auto-reply
7. **Lead routing** (sales team assignment)

Let me know what you'd like to add!

---

## 🎉 You're Done!

Your contact form now has:
- ✅ AI-powered lead qualification
- ✅ Automatic email notifications
- ✅ Google Sheets tracking
- ✅ Priority scoring
- ✅ Behavioral insights

Every contact is automatically analyzed and you get beautiful emails with actionable intelligence! 🚀

**Questions?** Check the troubleshooting section or test the workflow manually in n8n.
