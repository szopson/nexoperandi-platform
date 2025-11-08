# 🤖 Contact Form AI Lead Qualification

Automatically qualify, score, and route contact form submissions using AI.

---

## ✨ Features

- 🤖 **AI-Powered Analysis** - Claude analyzes every submission
- 📊 **Lead Scoring** - 0-100 score with High/Medium/Low priority
- 📧 **Email Notifications** - Beautiful HTML emails to `ecotoddlershop@gmail.com`
- 💾 **Google Sheets Tracking** - All leads saved automatically
- 🎯 **Smart Insights** - AI identifies budget, urgency, and fit signals
- ⚡ **Real-time** - Instant analysis and notification

---

## 🚀 Quick Start

### 1. Import to n8n
```bash
# Upload this file to n8n:
contact-form-ai-qualification.json
```

### 2. Configure (5 minutes)
1. **Google Sheets** - Connect OAuth2
2. **Anthropic API** - Add your Claude API key
3. **Email SMTP** - Gmail app password

### 3. Activate
Toggle "Active" switch to GREEN

### 4. Add to Website
```env
# apps/website/.env.local
N8N_WEBHOOK_URL=https://n8n.srv1108737.hstgr.cloud/webhook/contact-form
```

**Done!** Your contact form now has AI lead qualification! 🎉

---

## 📋 What You Get

Every contact submission is:

1. **Received** → Webhook captures form data
2. **Analyzed** → AI reads message and context
3. **Scored** → 0-100 lead quality score
4. **Qualified** → High/Medium/Low priority
5. **Emailed** → You get beautiful notification
6. **Saved** → Google Sheets for tracking

---

## 📧 Email Preview

```
🔥 New High Priority Lead: John Doe

Lead Score: 85/100 - High Priority

📋 Contact Information
Name: John Doe
Email: john@example.com
Website: https://example.com
Submitted: 2025-10-26 10:30:00

💬 Their Message
"I need help building an AI automation system for our
enterprise. We have a budget of $50k and need this done
urgently within 2 weeks."

🤖 AI Lead Qualification

Business Intent: Enterprise AI automation implementation

AI Insights: Strong buyer signals detected. Mentioned
specific budget ($50k) and urgent timeline (2 weeks).
Enterprise context suggests serious inquiry with decision-
making authority.

Recommended Next Action: Schedule discovery call within
24 hours. Prepare enterprise AI automation proposal.

💰 Budget Signals: $50k mentioned explicitly
⏰ Urgency Signals: 2-week deadline indicates high urgency
✅ Fit Signals: Perfect fit - enterprise AI automation

[Reply to Lead Button] [Visit Their Website Button]
```

---

## 📊 Lead Scoring System

| Score | Priority | Typical Signals |
|-------|----------|----------------|
| **70-100** | 🔥 **High** | Budget mentioned, urgent timeline, specific problem, decision maker |
| **40-69** | ⚡ **Medium** | Specific inquiry, some context, qualified prospect |
| **0-39** | 📋 **Low** | Vague inquiry, no context, tire-kickers |

---

## 🎯 AI Analyzes

- **Budget Signals:** $ amounts, "enterprise", "large", "investment"
- **Urgency Signals:** "urgent", "ASAP", deadlines, "need this now"
- **Fit Signals:** Relevant problem, industry match, company size
- **Intent:** What they actually want to accomplish
- **Quality:** How serious/qualified they are

---

## 📁 Files

- **contact-form-ai-qualification.json** - n8n workflow (import this!)
- **SETUP-GUIDE.md** - Detailed step-by-step setup instructions
- **README.md** - This quick reference

---

## 🔧 Configuration

### Email Recipient
Default: `ecotoddlershop@gmail.com`

To change, edit the "📧 Send Email Notification" node:
```javascript
toEmail: "your-email@domain.com"
```

### Google Sheets
Create spreadsheet named: "NexOperandi - Contact Form Leads"

Headers:
```
timestamp | name | email | website | message | lead_score |
priority | intent | recommended_action | ai_insights |
budget_signals | urgency_signals | fit_signals
```

### Anthropic API
Get your API key: https://console.anthropic.com/settings/keys

Model: `claude-3-5-haiku-20241022` (cheapest, fastest)

---

## 🧪 Test

### Direct Test:
```bash
curl -X POST https://n8n.srv1108737.hstgr.cloud/webhook/contact-form \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Lead",
    "email": "test@example.com",
    "message": "I have a $100k budget for AI automation",
    "timestamp": "2025-10-26T10:00:00Z"
  }'
```

### Website Test:
1. Go to `http://localhost:3003`
2. Fill contact form
3. Submit
4. Check email!

---

## 💰 Costs

- **Anthropic AI:** ~$0.001 per lead (~$1/month for 500 leads)
- **Google Sheets:** Free
- **Gmail:** Free
- **n8n:** Already running

**Total:** ~$1-2/month 🎉

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| No email received | Check spam folder, verify Gmail app password |
| 404 webhook error | Activate workflow (toggle to green) |
| Not saving to sheets | Verify OAuth2 connection, check sheet name |
| AI not working | Verify Anthropic API key and credits |

**Full troubleshooting:** See [SETUP-GUIDE.md](SETUP-GUIDE.md)

---

## 🚀 Next Steps

After basic setup works:

1. **Test with real data** - Submit a few test contacts
2. **Monitor Google Sheets** - See how AI scores different inquiries
3. **Customize email template** - Match your branding
4. **Add more features:**
   - Auto-reply to contact
   - Slack notifications for hot leads
   - CRM integration
   - Lead enrichment
   - Meeting scheduler links

---

## 📚 Documentation

- **[SETUP-GUIDE.md](SETUP-GUIDE.md)** - Complete setup walkthrough
- **[Anthropic Docs](https://docs.anthropic.com)** - Claude API reference
- **[n8n Docs](https://docs.n8n.io)** - Workflow automation guide

---

## ✅ Status

- ✅ AI qualification workflow created
- ✅ Email notification with beautiful HTML
- ✅ Google Sheets integration
- ✅ Lead scoring (0-100)
- ✅ Priority assignment (High/Medium/Low)
- ✅ Signal detection (budget, urgency, fit)
- ⏳ **Next:** Import to n8n and configure

---

**Ready to set up?** Follow [SETUP-GUIDE.md](SETUP-GUIDE.md) for step-by-step instructions! 🎯
