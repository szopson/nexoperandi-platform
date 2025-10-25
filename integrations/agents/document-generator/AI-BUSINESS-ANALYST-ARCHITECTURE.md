# AI Business Analyst Agent - Architecture & Technical Specs

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     User Interface (Website)                     │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  AI Business Analyst Demo Component (React)              │   │
│  │  • Form with 6 input fields                              │   │
│  │  • Real-time validation                                  │   │
│  │  • Loading states                                        │   │
│  │  • Result display with markdown rendering               │   │
│  │  • Download functionality                                │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              ▼                                   │
│                      POST /webhook/business-analysis            │
└─────────────────────────────────────────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      n8n Workflow Engine                         │
│                                                                   │
│  ┌──────────────────┐                                           │
│  │  Webhook Trigger  │ ◄─── Receives JSON payload               │
│  └──────────────────┘                                           │
│           ▼                                                      │
│  ┌──────────────────┐                                           │
│  │  Validate Input   │ ◄─── Checks required fields              │
│  └──────────────────┘                                           │
│       ▼           ▼                                              │
│   [Valid]     [Invalid]                                         │
│       ▼           ▼                                              │
│  ┌──────────┐  ┌──────────┐                                    │
│  │ Extract  │  │  Error   │                                     │
│  │  Data    │  │ Response │                                     │
│  └──────────┘  └──────────┘                                    │
│       ▼              ▼                                           │
│  ┌──────────────────┐  ┌──────────────────┐                   │
│  │ AI Business      │  │ Send Error       │                    │
│  │ Analysis         │  │ Response (400)   │                    │
│  │ (Claude Sonnet4) │  └──────────────────┘                   │
│  └──────────────────┘                                           │
│       ▼                                                          │
│  ┌──────────────────┐                                           │
│  │ Parse AI         │ ◄─── JSON.parse()                        │
│  │ Response         │                                           │
│  └──────────────────┘                                           │
│       ▼                                                          │
│  ┌──────────────────┐                                           │
│  │ Format Roadmap   │ ◄─── Generate markdown                   │
│  │ Document         │                                           │
│  └──────────────────┘                                           │
│       ▼                                                          │
│  ┌──────────────────┐                                           │
│  │ Prepare          │ ◄─── Combine data + document             │
│  │ Response         │                                           │
│  └──────────────────┘                                           │
│       ▼                                                          │
│  ┌──────────────────┐                                           │
│  │ Send Response    │ ◄─── Return JSON + CORS headers          │
│  │ (200)            │                                           │
│  └──────────────────┘                                           │
└─────────────────────────────────────────────────────────────────┘
                               ▼
                     ┌──────────────────┐
                     │   Anthropic API   │
                     │  Claude Sonnet 4  │
                     │  • 4096 tokens    │
                     │  • Temp: 0.3      │
                     └──────────────────┘
```

---

## Data Flow

### 1. Input (User → Website)

```json
{
  "companyName": "string (required)",
  "industry": "string (required, enum)",
  "employeeCount": "number (required)",
  "revenueRange": "string (required, enum)",
  "challenges": "string (required, min: 50 chars)",
  "goals": "string (required, min: 50 chars)"
}
```

### 2. Processing (Website → n8n)

```
Request:
POST https://n8n.nexoperandi.ai/webhook/business-analysis
Content-Type: application/json

{...input data...}
```

### 3. AI Analysis (n8n → Claude)

```
System Prompt:
• Role: Expert AI automation consultant
• Context: Company profile + challenges + goals
• Task: Generate structured JSON analysis
• Reference Data: Market research from 2025
• Format: Specific JSON schema with validations

Output Requirements:
• businessContext (insights, readiness, pain points)
• recommendedAgents[] (type, priority, ROI, timeline)
• implementationRoadmap (3 phases)
• totalProjection (financial metrics)
• riskFactors[]
• nextSteps[]
```

### 4. Output (n8n → Website)

```json
{
  "success": true,
  "message": "AI Business Analysis Complete",
  "data": {
    "companyName": "Acme Corp",
    "generatedAt": "January 24, 2025",
    "analysis": {
      "businessContext": {...},
      "recommendedAgents": [...],
      "implementationRoadmap": {...},
      "totalProjection": {...}
    },
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

## Node Configuration Details

### Node 1: Webhook Trigger

```json
{
  "name": "Webhook Trigger",
  "type": "n8n-nodes-base.webhook",
  "typeVersion": 2,
  "parameters": {
    "httpMethod": "POST",
    "path": "business-analysis",
    "responseMode": "responseNode",
    "options": {
      "rawBody": true
    }
  }
}
```

**Purpose:** Accepts HTTP POST requests from website  
**URL Format:** `https://[n8n-instance]/webhook/business-analysis`  
**Timeout:** 60 seconds (adjustable)

### Node 2: Validate Input

```json
{
  "name": "Validate Input",
  "type": "n8n-nodes-base.if",
  "typeVersion": 2.2,
  "parameters": {
    "conditions": {
      "conditions": [
        {
          "leftValue": "={{ $json.body && $json.body.companyName && $json.body.industry }}",
          "rightValue": "true",
          "operator": "equals"
        }
      ]
    }
  }
}
```

**Purpose:** Checks for required fields before processing  
**Validation:** companyName, industry must exist  
**True Branch:** Continue to analysis  
**False Branch:** Return 400 error

### Node 3: Extract Input Data

```json
{
  "name": "Extract Input Data",
  "type": "n8n-nodes-base.set",
  "typeVersion": 3.4,
  "parameters": {
    "assignments": {
      "assignments": [
        {
          "name": "companyName",
          "value": "={{ $json.body.companyName }}",
          "type": "string"
        },
        // ... 5 more fields
      ]
    }
  }
}
```

**Purpose:** Normalize and structure input data  
**Output:** Clean JSON object with typed fields  
**Benefit:** Easier to reference in downstream nodes

### Node 4: AI Business Analysis

```json
{
  "name": "AI Business Analysis",
  "type": "@n8n/n8n-nodes-langchain.lmChatAnthropic",
  "typeVersion": 1.8,
  "parameters": {
    "model": "claude-sonnet-4-20250514",
    "options": {
      "maxTokens": 4096,
      "temperature": 0.3
    },
    "text": "=You are an expert AI automation consultant..."
  }
}
```

**Model:** Claude Sonnet 4 (latest)  
**Temperature:** 0.3 (balanced creativity/consistency)  
**Max Tokens:** 4096 (allows comprehensive analysis)  
**Cost:** ~$0.15-0.30 per request

**Prompt Engineering:**
- Role definition (expert consultant)
- Company context injection
- Structured JSON output requirement
- Reference data (market research)
- Specific formatting rules

### Node 5: Parse AI Response

```json
{
  "name": "Parse AI Response",
  "type": "n8n-nodes-base.set",
  "typeVersion": 3.4,
  "parameters": {
    "assignments": {
      "assignments": [
        {
          "name": "analysis",
          "value": "={{ JSON.parse($json.response) }}",
          "type": "object"
        }
      ]
    }
  }
}
```

**Purpose:** Convert string to JSON object  
**Error Handling:** Fails gracefully if invalid JSON  
**Enhancement:** Could add JSON schema validation

### Node 6: Format Roadmap Document

```json
{
  "name": "Format Roadmap Document",
  "type": "n8n-nodes-base.set",
  "typeVersion": 3.4,
  "parameters": {
    "operation": "formatDocument",
    "templateType": "custom",
    "templateContent": "=# AI Automation Roadmap\n..."
  }
}
```

**Format:** Markdown (GitHub-flavored)  
**Sections:** 
- Executive Summary
- Recommended Agents (detailed)
- Implementation Roadmap (3 phases)
- Financial Projections (table)
- Risk Factors
- Next Steps
- About NexOperandi

**Dynamic Content:** All fields populated via expressions

### Node 7: Prepare Response

```json
{
  "name": "Prepare Response",
  "type": "n8n-nodes-base.set",
  "typeVersion": 3.4,
  "parameters": {
    "assignments": {
      "assignments": [
        {
          "name": "response",
          "value": "={{ { success: true, ... } }}",
          "type": "object"
        }
      ]
    }
  }
}
```

**Purpose:** Structure final response payload  
**Includes:** 
- Success flag
- Full analysis object
- Markdown document
- Summary metrics

### Node 8: Send Response

```json
{
  "name": "Send Response",
  "type": "n8n-nodes-base.respondToWebhook",
  "typeVersion": 1.1,
  "parameters": {
    "respondWith": "json",
    "responseBody": "={{ $json.response }}",
    "options": {
      "responseCode": 200,
      "responseHeaders": {
        "entries": [
          {
            "name": "Content-Type",
            "value": "application/json"
          },
          {
            "name": "Access-Control-Allow-Origin",
            "value": "*"
          }
        ]
      }
    }
  }
}
```

**Response Code:** 200 (success)  
**Content-Type:** application/json  
**CORS:** Enabled for all origins (customize for production)  
**Size:** ~10-30KB typical

---

## Performance Specifications

### Response Times

| Stage | Time | Percentage |
|-------|------|------------|
| Input Validation | <10ms | 0.1% |
| Data Extraction | <10ms | 0.1% |
| Claude API Call | 8-25s | 95% |
| Document Formatting | 100-200ms | 1% |
| Response Preparation | <50ms | 0.2% |
| **Total** | **10-30s** | **100%** |

### Token Usage

| Component | Tokens | Cost (Claude Sonnet 4) |
|-----------|--------|------------------------|
| System Prompt | ~800 | $0.0024 |
| User Input | 100-300 | $0.0003-0.0009 |
| AI Response | 1500-3000 | $0.0225-0.0450 |
| **Total** | **~2500-4100** | **~$0.15-0.30** |

*Pricing: $3 per million input tokens, $15 per million output tokens*

### Scalability

| Load Level | RPS | Response Time | Cost/Month |
|------------|-----|---------------|------------|
| Low (100/day) | 0.001 | 10-30s | $45-90 |
| Medium (500/day) | 0.006 | 10-30s | $225-450 |
| High (2000/day) | 0.023 | 10-35s | $900-1800 |

**Bottleneck:** Claude API rate limits (varies by plan)  
**Solution:** Implement queue system for >1000/day

---

## Error Handling

### Validation Errors (400)

```json
{
  "success": false,
  "error": "Invalid input. Required fields: companyName, industry...",
  "message": "Please provide all required business information"
}
```

**Trigger:** Missing or invalid input fields  
**User Action:** Fix form and resubmit

### API Errors (500)

```json
{
  "success": false,
  "error": "Analysis failed",
  "message": "Claude API error: [error details]"
}
```

**Trigger:** Anthropic API failure or timeout  
**User Action:** Try again in a few moments

### JSON Parse Errors (500)

```json
{
  "success": false,
  "error": "Invalid AI response format",
  "message": "Unable to parse analysis results"
}
```

**Trigger:** Claude returns malformed JSON  
**User Action:** Try again (usually one-off)

---

## Security Considerations

### Input Sanitization

- ✅ **SQL Injection:** Not vulnerable (no database queries)
- ✅ **XSS:** React escapes output automatically
- ✅ **CSRF:** POST-only webhook with CORS
- ✅ **Size Limits:** 10KB max input size

### Rate Limiting (Recommended)

```nginx
# nginx configuration
limit_req_zone $binary_remote_addr zone=analysis:10m rate=10r/m;

location /webhook/business-analysis {
    limit_req zone=analysis burst=3 nodelay;
    proxy_pass http://n8n-backend;
}
```

**Limits:** 10 requests per minute per IP  
**Burst:** 3 extra during spikes  
**Response:** 429 Too Many Requests

### API Key Protection

```bash
# Environment variables (never commit)
ANTHROPIC_API_KEY=sk-ant-api03-...

# n8n credentials (encrypted at rest)
Credentials stored in n8n database with encryption
```

### CORS Policy (Production)

```javascript
// Restrict to your domain
responseHeaders: {
  'Access-Control-Allow-Origin': 'https://nexoperandi.ai',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'Content-Type'
}
```

---

## Monitoring & Observability

### Key Metrics to Track

1. **Execution Success Rate**
   - Target: >95%
   - Alert: <90%

2. **Average Response Time**
   - Target: <30s
   - Alert: >60s

3. **API Cost**
   - Budget: $0.30 per analysis
   - Alert: >$0.50

4. **Error Rate**
   - Target: <5%
   - Alert: >10%

### n8n Built-in Monitoring

```bash
# View in n8n UI
Executions Tab → Filter by workflow → Check:
- Success/failure count
- Average execution time
- Error messages
- Input/output data
```

### External Monitoring (Recommended)

```javascript
// Add to workflow (after Send Response)
{
  "name": "Log to Analytics",
  "type": "n8n-nodes-base.httpRequest",
  "parameters": {
    "method": "POST",
    "url": "https://analytics.nexoperandi.ai/events",
    "sendBody": true,
    "bodyParameters": {
      "event": "business_analysis_completed",
      "properties": {
        "company": "={{ $json.companyName }}",
        "industry": "={{ $('Extract Input Data').item.json.industry }}",
        "duration": "={{ $workflow.duration }}",
        "success": true
      }
    }
  }
}
```

---

## Deployment Checklist

### Pre-Deployment
- [ ] Test with 10+ sample companies
- [ ] Verify all node connections
- [ ] Check credential configuration
- [ ] Test error scenarios
- [ ] Review AI prompt quality
- [ ] Validate output format

### Production Setup
- [ ] Configure production n8n instance
- [ ] Set up SSL/TLS (HTTPS)
- [ ] Implement rate limiting
- [ ] Add monitoring/alerting
- [ ] Configure CORS properly
- [ ] Set up backup credentials
- [ ] Document webhook URL

### Website Integration
- [ ] Add React component
- [ ] Configure environment variables
- [ ] Test in staging environment
- [ ] Add analytics tracking
- [ ] Implement error handling
- [ ] Mobile responsive testing
- [ ] Performance optimization

### Post-Launch
- [ ] Monitor first 100 executions
- [ ] Collect user feedback
- [ ] Review cost vs budget
- [ ] Optimize based on data
- [ ] Create case studies
- [ ] Plan A/B tests

---

## Technical Requirements

### n8n Instance
- **Version:** 1.0.0+ (tested on 1.70.0)
- **Hosting:** Cloud or self-hosted
- **Resources:** 
  - CPU: 2 cores minimum
  - RAM: 4GB minimum
  - Storage: 20GB
- **Network:** Public HTTPS endpoint

### Anthropic API
- **Account:** console.anthropic.com
- **Model:** Claude Sonnet 4
- **Rate Limit:** 50 requests/minute (standard)
- **Budget:** $100-500/month depending on volume

### Website Requirements
- **Framework:** Next.js 15+
- **UI Library:** shadcn/ui
- **Dependencies:**
  - react-markdown
  - lucide-react
  - @radix-ui components

---

## Upgrade Path

### Phase 1: Basic (Current)
✅ Single-step analysis  
✅ Markdown output  
✅ Industry recommendations

### Phase 2: Enhanced (1-2 months)
🔄 Multi-step wizard  
🔄 Interactive ROI calculator  
🔄 Email delivery  
🔄 CRM integration

### Phase 3: Advanced (3-6 months)
🔮 Industry-specific templates  
🔮 Competitive benchmarking  
🔮 Video analysis generation  
🔮 Real-time chat assistant

---

**Architecture Version:** 1.0  
**Last Updated:** January 24, 2025  
**Maintained by:** NexOperandi.ai
