# AI Business Analyst Agent - Implementation Guide

## Overview

The **AI Business Analyst Agent** is a powerful demo workflow for NexOperandi.ai that showcases your AI automation expertise. It analyzes businesses in real-time and generates customized automation roadmaps with ROI projections.

### What It Does

1. **Accepts business information** via webhook (company details, challenges, goals)
2. **AI-powered analysis** using Claude Sonnet 4 with industry knowledge
3. **Generates comprehensive roadmap** with:
   - Prioritized AI agent recommendations
   - ROI calculations based on real market data
   - 3-phase implementation plan
   - Financial projections (payback period, 3-year value)
   - Risk assessment and next steps
4. **Returns structured data** + formatted markdown document

### Key Features

✅ **Instant Analysis** - Results in 10-30 seconds  
✅ **Real ROI Data** - Based on 2025 market research  
✅ **Industry-Specific** - Tailored recommendations per sector  
✅ **Professional Output** - Executive-ready documents  
✅ **Website Integration** - React component included  
✅ **Mobile-Friendly** - Responsive design  

---

## Installation & Setup

### 1. Import Workflow to n8n

```bash
# Option 1: Via n8n UI
1. Open n8n Editor
2. Click "Import workflow"
3. Upload: ai-business-analyst-agent.json
4. Click "Import"

# Option 2: Via API (if using n8n cloud/self-hosted)
curl -X POST https://your-n8n-instance.com/api/v1/workflows \
  -H "X-N8N-API-KEY: your-api-key" \
  -H "Content-Type: application/json" \
  -d @ai-business-analyst-agent.json
```

### 2. Configure Credentials

**Required: Anthropic API Key**

```bash
# In n8n Editor:
1. Click "Credentials" (left sidebar)
2. Click "+ Add credential"
3. Search for "Anthropic"
4. Enter your API key from: https://console.anthropic.com/
5. Name it: "Anthropic API"
6. Test & Save
```

**Get Anthropic API Key:**
- Sign up at https://console.anthropic.com/
- Navigate to API Keys
- Create new key
- Copy and save securely

### 3. Activate Webhook

```bash
# In n8n Editor:
1. Open the workflow
2. Click on "Webhook Trigger" node
3. Copy the Production URL
4. Note: URL format is usually:
   https://your-n8n-instance.com/webhook/business-analysis
```

### 4. Test the Workflow

**Using curl:**

```bash
curl -X POST https://your-n8n-instance.com/webhook/business-analysis \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Acme Corp",
    "industry": "SaaS",
    "employeeCount": 50,
    "revenueRange": "$5M-$10M",
    "challenges": "High customer service costs, slow response times, manual lead qualification",
    "goals": "Reduce operational costs by 30%, improve customer satisfaction, scale without adding headcount"
  }'
```

**Expected Response:**

```json
{
  "success": true,
  "message": "AI Business Analysis Complete",
  "data": {
    "companyName": "Acme Corp",
    "generatedAt": "January 24, 2025",
    "analysis": { ... },
    "document": "# AI Automation Roadmap\n...",
    "summary": {
      "automationReadiness": "high",
      "recommendedAgents": 4,
      "estimatedROI": "340%",
      "paybackPeriod": "4 months"
    }
  }
}
```

---

## Website Integration

### Setup React Component

**1. Install dependencies:**

```bash
cd apps/website
pnpm add react-markdown
```

**2. Add component:**

Copy `ai-business-analyst-demo-component.tsx` to:
```
apps/website/src/components/ai-business-analyst-demo.tsx
```

**3. Configure environment variable:**

```bash
# .env.local
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/business-analysis
```

**4. Use in your page:**

```tsx
// apps/website/src/app/demo/business-analyst/page.tsx

import { AIBusinessAnalystDemo } from '@/components/ai-business-analyst-demo';

export default function BusinessAnalystDemoPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          AI Business Analyst Agent
        </h1>
        <p className="text-xl text-muted-foreground">
          Get a customized automation roadmap with ROI projections in seconds
        </p>
      </div>
      
      <AIBusinessAnalystDemo />
    </div>
  );
}
```

### Alternative: Embed as Modal

```tsx
// Example: Trigger from homepage CTA
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AIBusinessAnalystDemo } from '@/components/ai-business-analyst-demo';

export function HomepageCTA() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">
          Try AI Business Analyst
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <AIBusinessAnalystDemo />
      </DialogContent>
    </Dialog>
  );
}
```

---

## Customization

### 1. Adjust AI Analysis Prompt

Edit the `AI Business Analysis` node prompt to:
- Add industry-specific knowledge
- Customize recommendation criteria
- Change output format
- Adjust ROI calculation methods

### 2. Modify Document Template

Edit the `Format Roadmap Document` node to:
- Change branding (logo, colors, contact info)
- Add/remove sections
- Customize formatting
- Include charts/graphs

### 3. Add Lead Capture

**Connect to CRM:**

Add after "Parse AI Response" node:

```json
{
  "name": "Save to CRM",
  "type": "n8n-nodes-base.httpRequest",
  "parameters": {
    "method": "POST",
    "url": "https://your-crm.com/api/leads",
    "authentication": "predefinedCredentialType",
    "nodeCredentialType": "yourCrmApi",
    "sendBody": true,
    "bodyParameters": {
      "parameters": [
        {
          "name": "company",
          "value": "={{ $json.companyName }}"
        },
        {
          "name": "industry",
          "value": "={{ $('Extract Input Data').item.json.industry }}"
        },
        {
          "name": "analysis",
          "value": "={{ JSON.stringify($json.analysis) }}"
        }
      ]
    }
  }
}
```

**Send Email Notification:**

Add Slack/Email node:

```json
{
  "name": "Notify Team",
  "type": "n8n-nodes-base.slack",
  "parameters": {
    "resource": "message",
    "operation": "post",
    "channel": "#sales-leads",
    "text": "=🎯 New Business Analysis Request\n\nCompany: {{ $json.companyName }}\nIndustry: {{ $('Extract Input Data').item.json.industry }}\nEstimated ROI: {{ $json.analysis.totalProjection.netROI }}"
  }
}
```

### 4. Add Analytics Tracking

**Google Analytics / Mixpanel:**

```json
{
  "name": "Track Event",
  "type": "n8n-nodes-base.httpRequest",
  "parameters": {
    "method": "POST",
    "url": "https://api.mixpanel.com/track",
    "sendBody": true,
    "bodyParameters": {
      "parameters": [
        {
          "name": "event",
          "value": "business_analysis_completed"
        },
        {
          "name": "properties",
          "value": "={{ {\n  company: $json.companyName,\n  industry: $('Extract Input Data').item.json.industry,\n  readiness: $json.analysis.businessContext.automationReadiness\n} }}"
        }
      ]
    }
  }
}
```

---

## Performance Optimization

### 1. Response Time

**Current:** 10-30 seconds (Claude Sonnet 4 processing)

**Optimize:**
- Use streaming responses (show progress)
- Cache common industry insights
- Parallel processing for multi-step analysis

### 2. Cost Management

**Cost per analysis:**
- Claude Sonnet 4: ~$0.15-0.30 per request
- n8n execution: Free (self-hosted) or minimal (cloud)

**Optimization strategies:**
- Set rate limits (e.g., 100 analyses/day)
- Require email for high-volume usage
- Cache similar requests (24hr TTL)

### 3. Scale Considerations

**For high traffic (1000+ analyses/day):**
- Use load balancer
- Queue system (Bull/BullMQ)
- Database for caching results
- CDN for static content

---

## Security Best Practices

### 1. Input Validation

**Already implemented:**
- Required field validation
- Type checking via TypeScript
- Error handling with proper responses

**Recommended additions:**
- Rate limiting (100 requests/hour per IP)
- CAPTCHA for public access
- Input sanitization for XSS prevention

### 2. Webhook Security

```bash
# Add webhook authentication
1. In n8n Webhook node settings
2. Enable "Authentication"
3. Set type: "Header Auth"
4. Header name: "X-N8N-Auth-Token"
5. Generate secure token

# Update frontend:
const response = await fetch(webhookUrl, {
  headers: {
    'X-N8N-Auth-Token': process.env.NEXT_PUBLIC_N8N_AUTH_TOKEN
  }
});
```

### 3. CORS Configuration

**n8n settings:**
```bash
# docker-compose.yml or .env
N8N_CORS_ORIGIN=https://nexoperandi.ai
```

**Or in Webhook node:**
- Already configured with `Access-Control-Allow-Origin: *`
- For production, restrict to your domain

---

## Monitoring & Analytics

### 1. Workflow Execution Tracking

**Built-in n8n monitoring:**
```bash
# View executions
1. Open n8n UI
2. Click "Executions" tab
3. Filter by workflow
4. Check success rate, duration, errors
```

### 2. Business Metrics to Track

- Total analyses generated
- Industry distribution
- Average ROI projected
- Conversion rate (analysis → consultation)
- Most common pain points
- Agent type recommendations frequency

### 3. Error Monitoring

**Set up alerts:**
```json
{
  "name": "Error Alert",
  "type": "n8n-nodes-base.slack",
  "parameters": {
    "resource": "message",
    "operation": "post",
    "channel": "#alerts",
    "text": "=⚠️ Workflow Error\n\nWorkflow: {{ $workflow.name }}\nError: {{ $json.error }}"
  }
}
```

---

## Troubleshooting

### Common Issues

**1. "Invalid API Key" Error**
```bash
Solution:
- Verify Anthropic API key is correct
- Check credential name matches node configuration
- Ensure API key has sufficient credits
```

**2. "Webhook not found" Error**
```bash
Solution:
- Activate workflow in n8n
- Check webhook path matches frontend URL
- Verify n8n instance is publicly accessible
```

**3. "JSON Parse Error"**
```bash
Solution:
- Check AI response format
- Increase max tokens in Claude node (currently 4096)
- Add error handling in Parse AI Response node
```

**4. Slow Response Times**
```bash
Potential causes:
- Large input text (>2000 words)
- Claude API latency
- Network issues

Solutions:
- Limit input field lengths
- Use streaming responses
- Add timeout handling (60s)
```

### Debug Mode

**Enable verbose logging:**
```bash
# In n8n settings
1. Click Settings (gear icon)
2. Enable "Save execution progress"
3. Set "Execution timeout" to 120s
4. Check "Save manual executions"
```

---

## Next Steps

### Immediate (Week 1)
- [ ] Deploy workflow to production n8n
- [ ] Configure Anthropic API credentials
- [ ] Test with 10+ sample companies
- [ ] Add webhook to website homepage
- [ ] Set up basic analytics

### Short-term (Month 1)
- [ ] Integrate with CRM (HubSpot/Salesforce)
- [ ] Add email notifications for team
- [ ] Create lead scoring system
- [ ] A/B test different prompts
- [ ] Collect user feedback

### Long-term (Quarter 1)
- [ ] Build agent comparison tool
- [ ] Add industry benchmarking
- [ ] Create ROI calculator widget
- [ ] Multi-language support
- [ ] White-label version for partners

---

## Support & Resources

### Documentation
- [n8n Docs](https://docs.n8n.io/)
- [Claude API Reference](https://docs.anthropic.com/)
- [React Component Library](https://ui.shadcn.com/)

### Get Help
- **n8n Community**: https://community.n8n.io/
- **NexOperandi Support**: hello@nexoperandi.ai
- **GitHub Issues**: [Your repo]

### Version History
- **v1.0.0** (Jan 2025): Initial release
  - Claude Sonnet 4 integration
  - Comprehensive roadmap generation
  - React component with shadcn/ui

---

## License

This workflow is part of the NexOperandi platform and is licensed for use within your organization. Redistribution requires attribution.

---

**Built with ❤️ by NexOperandi.ai**  
*AI automation for serious businesses*
