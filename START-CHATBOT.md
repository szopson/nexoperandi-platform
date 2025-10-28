# 🚀 START YOUR CHATBOT NOW!

## ⚡ Quick Start (Copy & Paste)

### Windows (PowerShell):
```powershell
cd apps\website
pnpm dev
```

### Mac/Linux:
```bash
cd apps/website
pnpm dev
```

---

## 📍 Then Open:

```
http://localhost:3000
```

---

## 🎯 What to Do:

1. **Look for blue chat button** (bottom-right corner)
2. **Click it** to open chat
3. **Type a message** like:
   - "What are your pricing options?"
   - "Tell me about your services"
   - "I need help with automation"

---

## ✅ It's Working If:

- Chat button appears
- Clicking opens chat window
- AI responds within 2-3 seconds
- Action buttons appear
- No errors in console

---

## 🐛 Not Working?

### Quick Fixes:

**1. Chat button not showing?**
```bash
# Hard refresh browser
Ctrl+Shift+R (Windows)
Cmd+Shift+R (Mac)
```

**2. "Demo mode" response?**
```bash
# Check .env.local has this line:
N8N_CHATBOT_URL=https://piotr108-20108.wykr.es/webhook/customer-chat

# Then restart:
Ctrl+C
pnpm dev
```

**3. No AI response?**
- Check n8n workflow is ACTIVE (green toggle)
- Go to: https://piotr108-20108.wykr.es/
- Find "AI Customer Service Chatbot - FIXED"
- Make sure toggle is ON

---

## 📖 Need More Help?

See detailed testing guide:
```
integrations/agents/customer-service/TEST-NOW.md
```

---

## 🎉 That's It!

**Time to test:** 30 seconds
**Complexity:** Just run pnpm dev!

Your AI chatbot is ready to chat! 💬
