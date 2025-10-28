# Contact Form AI Lead Qualification - Visual Workflow

## 🎯 Complete System Architecture

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                    👤 USER VISITS WEBSITE                     ┃
┃                  http://localhost:3003                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                        │
                        │ Fills out contact form:
                        │ • Name: "John Doe"
                        │ • Email: "john@company.com"
                        │ • Website: "https://company.com"
                        │ • Message: "I need AI automation..."
                        │
                        ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃            📤 SUBMIT BUTTON CLICKED                           ┃
┃                 Frontend sends POST                           ┃
┗━━━━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                        │
                        ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃         ⚙️  NEXT.JS API ROUTE (Your Website)                  ┃
┃         📍 /app/api/contact/route.ts                          ┃
┃                                                               ┃
┃  Actions:                                                     ┃
┃  ✅ Validate required fields (name, email, message)           ┃
┃  ✅ Validate email format                                     ┃
┃  ✅ Log submission details                                    ┃
┃  ✅ Check if webhook is configured                            ┃
┃                                                               ┃
┃  Console Output:                                              ┃
┃  📨 Contact Form - Received submission:                       ┃
┃     { name: "John Doe", email: "john@...", ... }             ┃
┗━━━━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                        │
                        │ Forward to n8n webhook
                        │ URL: https://piotr108-20108.wykr.es/webhook/contact-form
                        │
                        ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃              🎣 N8N WEBHOOK TRIGGER (Node 1)                  ┃
┃          📍 https://piotr108-20108.wykr.es                    ┃
┃                                                               ┃
┃  Receives JSON:                                               ┃
┃  {                                                            ┃
┃    "name": "John Doe",                                        ┃
┃    "email": "john@company.com",                               ┃
┃    "website": "https://company.com",                          ┃
┃    "message": "I need AI automation with $50k budget",        ┃
┃    "timestamp": "2025-10-26T10:00:00Z",                       ┃
┃    "source": "NexOperandi Website"                            ┃
┃  }                                                            ┃
┗━━━━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                        │
                        ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃           🔍 EXTRACT & STRUCTURE DATA (Node 2)                ┃
┃                                                               ┃
┃  Extracts:                                                    ┃
┃  • Name                                                       ┃
┃  • Email                                                      ┃
┃  • Website                                                    ┃
┃  • Message                                                    ┃
┃  • Timestamp                                                  ┃
┃  • Source                                                     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                        │
                        ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃        🤖 AI LEAD QUALIFICATION - CLAUDE (Node 3)             ┃
┃              Model: claude-3-5-haiku-20241022                 ┃
┃              Provider: Anthropic                              ┃
┃              Cost: ~$0.001 per lead                           ┃
┃                                                               ┃
┃  AI Prompt:                                                   ┃
┃  "You are an expert B2B lead qualification specialist.        ┃
┃   Analyze this contact form submission and provide:           ┃
┃   1. Lead Quality Score (0-100)                               ┃
┃   2. Priority Level (High/Medium/Low)                         ┃
┃   3. Business Intent                                          ┃
┃   4. Recommended Next Action                                  ┃
┃   5. Key Insights                                             ┃
┃                                                               ┃
┃   Contact Details:                                            ┃
┃   Name: John Doe                                              ┃
┃   Message: I need AI automation with $50k budget..."          ┃
┃                                                               ┃
┃  AI Analyzes:                                                 ┃
┃  💰 Budget Signals: "$50k" → Strong budget indication         ┃
┃  ⏰ Urgency Signals: "need", timeline mentions                ┃
┃  ✅ Fit Signals: AI automation = perfect fit                  ┃
┃  📊 Quality: Specific, professional, decision-ready           ┃
┃                                                               ┃
┃  AI Returns JSON:                                             ┃
┃  {                                                            ┃
┃    "score": 85,                                               ┃
┃    "priority": "High",                                        ┃
┃    "intent": "Enterprise AI automation implementation",       ┃
┃    "action": "Schedule discovery call within 24 hours",       ┃
┃    "insights": "Strong buyer signals detected...",            ┃
┃    "signals": {                                               ┃
┃      "budget_signals": "$50k mentioned explicitly",           ┃
┃      "urgency_signals": "Timeline indicates urgency",         ┃
┃      "fit_signals": "Perfect fit - enterprise automation"     ┃
┃    }                                                          ┃
┃  }                                                            ┃
┗━━━━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                        │
                        ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃         📊 STRUCTURE COMPLETE LEAD DATA (Node 4)              ┃
┃                                                               ┃
┃  Combines:                                                    ┃
┃  • Contact data from Node 2                                   ┃
┃  • AI analysis from Node 3                                    ┃
┃                                                               ┃
┃  Adds:                                                        ┃
┃  • Priority emoji: 🔥 (High), ⚡ (Medium), 📋 (Low)          ┃
┃  • Score color: Green (70+), Yellow (40-69), Red (0-39)      ┃
┃                                                               ┃
┃  Final Structured Data:                                       ┃
┃  {                                                            ┃
┃    name: "John Doe",                                          ┃
┃    email: "john@company.com",                                 ┃
┃    website: "https://company.com",                            ┃
┃    message: "I need AI automation...",                        ┃
┃    lead_score: 85,                                            ┃
┃    priority: "High",                                          ┃
┃    priority_emoji: "🔥",                                      ┃
┃    score_color: "#22c55e",                                    ┃
┃    intent: "Enterprise AI automation implementation",         ┃
┃    recommended_action: "Schedule discovery call...",          ┃
┃    ai_insights: "Strong buyer signals detected...",           ┃
┃    budget_signals: "$50k mentioned explicitly",               ┃
┃    urgency_signals: "Timeline indicates urgency",             ┃
┃    fit_signals: "Perfect fit - enterprise automation"         ┃
┃  }                                                            ┃
┗━━━━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                        │
                        ├─────────────┬──────────────┐
                        ↓             ↓              ↓
        ┏━━━━━━━━━━━━━━━━━━━━┓ ┏━━━━━━━━━━━━━━┓ ┏━━━━━━━━━━━━━━┓
        ┃  💾 SAVE TO        ┃ ┃ 📧 SEND EMAIL ┃ ┃ ✅ WEBHOOK   ┃
        ┃  GOOGLE SHEETS     ┃ ┃ NOTIFICATION  ┃ ┃ RESPONSE     ┃
        ┃  (Node 5)          ┃ ┃ (Node 6)      ┃ ┃ (Node 7)     ┃
        ┗━━━━━━━━┯━━━━━━━━━━┛ ┗━━━━┯━━━━━━━━━┛ ┗━━━━┯━━━━━━━━━┛
                 │                  │               │
                 ↓                  ↓               ↓

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                   💾 GOOGLE SHEETS                            ┃
┃        "NexOperandi - Contact Form Leads"                     ┃
┃                                                               ┃
┃  New row added:                                               ┃
┃  ┌────────┬───────┬────────┬─────────┬──────────┬───────┐   ┃
┃  │ Time   │ Name  │ Email  │ Website │ Message  │ Score │   ┃
┃  ├────────┼───────┼────────┼─────────┼──────────┼───────┤   ┃
┃  │10:00:00│John D.│john@...│company..│I need AI │  85   │   ┃
┃  └────────┴───────┴────────┴─────────┴──────────┴───────┘   ┃
┃                                                               ┃
┃  + priority, intent, insights, signals...                     ┃
┃                                                               ┃
┃  ✅ Saved successfully!                                       ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                📧 EMAIL TO YOU                                ┃
┃            ecotoddlershop@gmail.com                           ┃
┃                                                               ┃
┃  Subject: 🔥 New High Priority Lead: John Doe                ┃
┃                                                               ┃
┃  ┌─────────────────────────────────────────────────────┐     ┃
┃  │ 🔥 New High Priority Lead: John Doe                 │     ┃
┃  │ Lead Score: 85/100 - High Priority                  │     ┃
┃  ├─────────────────────────────────────────────────────┤     ┃
┃  │ 👤 Contact Information                              │     ┃
┃  │ Name:      John Doe                                 │     ┃
┃  │ Email:     john@company.com                         │     ┃
┃  │ Website:   https://company.com                      │     ┃
┃  │ Submitted: 2025-10-26 10:00:00                      │     ┃
┃  ├─────────────────────────────────────────────────────┤     ┃
┃  │ 💬 Their Message                                    │     ┃
┃  │ "I need AI automation with $50k budget..."          │     ┃
┃  ├─────────────────────────────────────────────────────┤     ┃
┃  │ 🤖 AI Lead Qualification                            │     ┃
┃  │                                                      │     ┃
┃  │ Business Intent:                                    │     ┃
┃  │ Enterprise AI automation implementation             │     ┃
┃  │                                                      │     ┃
┃  │ AI Insights:                                        │     ┃
┃  │ Strong buyer signals detected. Mentioned specific   │     ┃
┃  │ budget ($50k). Enterprise context suggests serious  │     ┃
┃  │ inquiry with decision-making authority.             │     ┃
┃  │                                                      │     ┃
┃  │ Recommended Next Action:                            │     ┃
┃  │ Schedule discovery call within 24 hours.            │     ┃
┃  │ Prepare enterprise AI automation proposal.          │     ┃
┃  │                                                      │     ┃
┃  │ 💰 Budget Signals: $50k mentioned explicitly        │     ┃
┃  │ ⏰ Urgency Signals: Timeline indicates urgency      │     ┃
┃  │ ✅ Fit Signals: Perfect fit - enterprise automation │     ┃
┃  ├─────────────────────────────────────────────────────┤     ┃
┃  │ ⚡ Quick Actions                                    │     ┃
┃  │ [📧 Reply to Lead] [🌐 Visit Their Website]        │     ┃
┃  └─────────────────────────────────────────────────────┘     ┃
┃                                                               ┃
┃  ✅ Email sent!                                               ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃              ✅ SUCCESS RESPONSE TO WEBSITE                   ┃
┃                                                               ┃
┃  Returns to Next.js API:                                      ┃
┃  {                                                            ┃
┃    "success": true,                                           ┃
┃    "message": "Thank you! We've received your message...",    ┃
┃    "lead": {                                                  ┃
┃      "priority": "High",                                      ┃
┃      "score": 85                                              ┃
┃    }                                                          ┃
┃  }                                                            ┃
┗━━━━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                        │
                        ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃              👤 USER SEES SUCCESS MESSAGE                     ┃
┃                                                               ┃
┃  "Thank you! We've received your message and will get         ┃
┃   back to you soon."                                          ┃
┃                                                               ┃
┃  (Optional: Show lead score if you want!)                     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## 📊 Parallel Processing

Notice how the workflow splits into 3 parallel paths after structuring data:

```
                    Structured Data
                         │
         ┌───────────────┼───────────────┐
         ↓               ↓               ↓
   Google Sheets     Email Send    Webhook Response
         │               │               │
         └───────────────┴───────────────┘
                         │
                    All complete
```

This means:
- **Google Sheets saves** while email is sending
- **Email sends** while response is preparing
- **Everything happens in parallel** for speed!
- Total time: ~3-5 seconds (instead of 10+ sequential)

---

## ⏱️ Timing Breakdown

| Step | Time | Notes |
|------|------|-------|
| User fills form | ~30s | Human time |
| Submit to Next.js | ~50ms | Network latency |
| Validation | ~5ms | Email regex, field check |
| Forward to n8n | ~100ms | Network to n8n |
| Extract data | ~10ms | Simple data mapping |
| AI qualification | **2-3s** | Claude API call (biggest delay) |
| Structure data | ~20ms | JavaScript processing |
| Save to Sheets | ~500ms | Google API (parallel) |
| Send email | ~800ms | SMTP send (parallel) |
| Webhook response | ~10ms | Return JSON (parallel) |
| **Total** | **~3-5s** | From submit to success |

---

## 🎯 Lead Score Calculation Examples

### Example 1: High Score (85/100) 🔥

**Input Message:**
> "Hi, I'm the CTO at TechCorp (Series B, 50 employees). We need to automate our customer onboarding process. Current manual process takes 2 hours per customer. We're processing 100+ customers/week. Budget approved: $75k. Need to implement by Q1 2026. Can we schedule a call this week to discuss?"

**AI Analysis:**
- ✅ Title/Authority: "CTO" (+15 points)
- ✅ Company Context: "Series B, 50 employees" (+10 points)
- ✅ Specific Problem: "automate customer onboarding" (+15 points)
- ✅ Quantified Impact: "2 hours x 100/week" (+10 points)
- ✅ Budget: "$75k approved" (+20 points)
- ✅ Timeline: "Q1 2026" (+10 points)
- ✅ Call to Action: "schedule call this week" (+5 points)

**Score:** 85/100
**Priority:** High 🔥
**Action:** "Contact within 4 hours with proposal"

---

### Example 2: Medium Score (55/100) ⚡

**Input Message:**
> "I'm interested in learning more about your AI automation services. We're a small business looking to improve our processes. What are your rates and what kind of projects do you typically work on?"

**AI Analysis:**
- ⚡ General Interest: "interested in learning" (+10 points)
- ⚡ Business Type: "small business" (+10 points)
- ⚡ Vague Need: "improve processes" (+10 points)
- ❌ No Budget: Price shopping (-5 points)
- ⚡ Questions Only: Not ready to buy (+5 points)
- ⚡ No Timeline: Not urgent (+0 points)
- ⚡ No Specifics: Unclear problem (+5 points)

**Score:** 55/100
**Priority:** Medium ⚡
**Action:** "Send informational email with case studies"

---

### Example 3: Low Score (20/100) 📋

**Input Message:**
> "Hi, can you help me with AI stuff? Thanks"

**AI Analysis:**
- ❌ Extremely Vague: "AI stuff" (+5 points)
- ❌ No Context: No business info (+0 points)
- ❌ No Problem: Unclear need (+0 points)
- ❌ No Contact Info: Just "Thanks" (+0 points)
- ❌ Likely Not Serious: Tire-kicker (+5 points)

**Score:** 20/100
**Priority:** Low 📋
**Action:** "Send automated FAQ email, low priority follow-up"

---

## 🔄 Error Handling Flow

```
Contact Form Submission
         │
         ↓
    Validation ──────── FAIL ──→ Return 400 Error
         │                       "Missing required fields"
         ↓ PASS
         │
    Email Format ───── FAIL ──→ Return 400 Error
    Validation                  "Invalid email address"
         │
         ↓ PASS
         │
    Webhook ────────── NOT ───→ Return 200 Success
    Configured?        SET      "Webhook not configured"
         │                      (Dev mode - still works)
         ↓ SET
         │
    Forward to ──────── FAIL ──→ Return 500 Error
    n8n                         "n8n webhook failed"
         │                      Shows detailed error
         ↓ SUCCESS
         │
    Return 200 OK
    with lead data
```

---

## 💰 Cost Flow

```
Contact Form Submission
         │
         ↓
    FREE - Next.js API route
         │
         ↓
    FREE - n8n workflow execution
         │
         ↓
    $0.001-0.003 - Claude AI analysis
         │              ↑
         │              └── ONLY COST!
         ↓
    FREE - Google Sheets save
         │
         ↓
    FREE - Gmail send (25k/day limit)
         │
         ↓
    Total: ~$0.001 per lead
```

**Monthly (500 leads):** ~$0.50-1.50

---

## 🎨 Email Color Coding

```
Lead Score → Color in Email

90-100: Dark Green  (#16a34a) 🔥 VERY HOT
80-89:  Green       (#22c55e) 🔥 HOT
70-79:  Light Green (#4ade80) 🔥 HOT
60-69:  Yellow      (#eab308) ⚡ WARM
50-59:  Orange      (#f59e0b) ⚡ WARM
40-49:  Light Red   (#fb923c) ⚡ LUKEWARM
30-39:  Orange-Red  (#f97316) 📋 COLD
20-29:  Red         (#ef4444) 📋 COLD
0-19:   Dark Red    (#dc2626) 📋 VERY COLD
```

---

## 🚀 Performance Optimization

The workflow is optimized for speed:

1. **Parallel Execution**
   - Google Sheets, Email, Response all happen at once
   - Saves 2-3 seconds vs sequential

2. **Lightweight AI Model**
   - Claude 3.5 Haiku (fastest Anthropic model)
   - 2-3 second response time
   - Still highly accurate

3. **Minimal Processing**
   - Simple data extraction
   - No heavy computations
   - Fast JSON parsing

4. **Efficient Logging**
   - Console logs for debugging
   - No unnecessary database writes

**Result:** 3-5 second total processing time! ⚡

---

## 📈 Scaling Considerations

Current setup handles:
- **Up to 1,000 leads/month** - No changes needed
- **Up to 10,000 leads/month** - Consider PostgreSQL instead of Sheets
- **Up to 100,000 leads/month** - Need dedicated infrastructure

For your use case (likely <1,000/month), current setup is perfect! 🎯

---

This is the complete visual breakdown of your AI lead qualification system!
