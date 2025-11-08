# Workflow Import Guide

## Overview

This guide explains how to import n8n workflows built in Claude Desktop into the NexOperandi platform codebase.

---

## Step-by-Step Process

### Step 1: Export from Claude Desktop

After building your workflow in Claude Desktop using n8n MCP tools:

1. **Get the workflow JSON:**
   ```
   Use n8n MCP tool: get_workflow_json(workflowId)
   ```

2. **Test the workflow:**
   ```
   Use n8n MCP tool: n8n_trigger_webhook_workflow(webhookPath, testData)
   ```

3. **Validate the workflow:**
   ```
   Use n8n MCP tool: n8n_validate_workflow(workflowId)
   ```

4. **Export metadata:**
   - Webhook URL
   - Required environment variables
   - Input/output schemas
   - Test data examples

### Step 2: Prepare Workflow Files

Create the following files in the agent folder (e.g., `integrations/agents/customer-service/`):

#### 1. `workflow.json`
```json
{
  "name": "Customer Service Agent",
  "nodes": [...],
  "connections": {...},
  "active": true,
  "settings": {...}
}
```

#### 2. `README.md`
```markdown
# Customer Service Agent

## Overview
24/7 autonomous support agent with sentiment analysis and smart escalation.

## ROI Metrics
- 70-90% inquiry resolution without human intervention
- $3.50 return per $1 invested
- 60% operational cost reduction

## Workflow Details

### Trigger
- **Type:** Webhook
- **URL:** `/webhook/customer-service`
- **Method:** POST

### Input Schema
\`\`\`typescript
{
  email: string;
  message: string;
  context?: {
    previousMessages?: Array<{role: string, content: string}>;
    customerInfo?: {
      name?: string;
      company?: string;
      tier?: 'starter' | 'growth' | 'enterprise';
    };
  };
}
\`\`\`

### Output Schema
\`\`\`typescript
{
  response: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  requiresHumanEscalation: boolean;
  confidence: number;
}
\`\`\`

### Environment Variables Required
- `OPENAI_API_KEY` - OpenAI API key for AI responses
- `CRM_API_KEY` - CRM integration (Salesforce/HubSpot)
- `SLACK_WEBHOOK_URL` - For escalation notifications

## Setup Instructions

1. Import workflow to n8n:
   \`\`\`bash
   # Using n8n CLI
   n8n import:workflow --input=workflow.json
   \`\`\`

2. Configure environment variables in n8n settings

3. Test with sample data:
   \`\`\`bash
   curl -X POST https://n8n.srv1108737.hstgr.cloud/webhook/customer-service \\
     -H "Content-Type: application/json" \\
     -d @test-data.json
   \`\`\`

4. Verify webhook is active and responding

## Template Attribution
Based on template by [Author Name] (@username)
View at: https://n8n.io/workflows/[template-id]

## Maintenance
- **Last Updated:** 2025-10-22
- **n8n Version:** 1.x
- **Breaking Changes:** None
```

#### 3. `test-data.json`
```json
{
  "data": {
    "email": "customer@example.com",
    "message": "I need help with my account login",
    "context": {
      "customerInfo": {
        "name": "John Doe",
        "company": "Acme Corp",
        "tier": "growth"
      }
    }
  },
  "metadata": {
    "source": "test",
    "timestamp": "2025-10-22T12:00:00Z"
  }
}
```

#### 4. `.env.example`
```env
# Customer Service Agent Environment Variables

# AI Model
OPENAI_API_KEY=sk-...

# CRM Integration
CRM_API_KEY=your-crm-api-key
CRM_API_URL=https://api.crm-provider.com

# Escalation
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...

# Optional: Database
DATABASE_URL=postgresql://...
```

### Step 3: Update Website Integration

#### 1. Update demos page status
Edit `apps/website/app/demos/page.tsx`:
```typescript
{
  id: "customer-service",
  name: "AI Customer Service Agent",
  // Change status from "coming-soon" to "live"
  status: "live",
  // ... rest of config
}
```

#### 2. Create agent demo page
Create `apps/website/app/demos/customer-service/page.tsx`:
```typescript
"use client";

import { useState } from "react";
import { createN8nClient } from "@nexoperandi/n8n-client";
import type { CustomerServiceInput, CustomerServiceOutput } from "@nexoperandi/n8n-client/types";

export default function CustomerServiceDemo() {
  const [input, setInput] = useState<CustomerServiceInput>({
    email: "",
    message: "",
  });
  const [output, setOutput] = useState<CustomerServiceOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const client = createN8nClient();
    const result = await client.executeWorkflow<CustomerServiceInput, CustomerServiceOutput>(
      'customer-service',
      { data: input }
    );

    if (result.success && result.data) {
      setOutput(result.data);
    }
    setLoading(false);
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">AI Customer Service Agent</h1>
        <p className="text-xl text-gray-600 mb-8">
          Experience our 24/7 AI customer service agent. Ask any question and get
          instant, intelligent responses.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields */}
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={input.email}
              onChange={(e) => setInput({...input, email: e.target.value})}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              value={input.message}
              onChange={(e) => setInput({...input, message: e.target.value})}
              className="w-full px-4 py-2 border rounded-md"
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Get Response"}
          </button>
        </form>

        {output && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="font-bold mb-2">AI Response:</h3>
            <p className="mb-4">{output.response}</p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Sentiment:</span> {output.sentiment}
              </div>
              <div>
                <span className="font-semibold">Confidence:</span> {output.confidence}%
              </div>
            </div>

            {output.requiresHumanEscalation && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-sm text-yellow-800">
                  This inquiry has been flagged for human review.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
```

### Step 4: Testing

1. **Test locally:**
   ```bash
   pnpm --filter website dev
   # Visit http://localhost:3000/demos/customer-service
   ```

2. **Test API endpoint:**
   ```bash
   curl -X POST http://localhost:3000/api/workflows/customer-service \\
     -H "Content-Type: application/json" \\
     -d '{"data": {"email": "test@example.com", "message": "Test"}}'
   ```

3. **Test n8n webhook directly:**
   ```bash
   curl -X POST https://n8n.srv1108737.hstgr.cloud/webhook/customer-service \\
     -H "Content-Type: application/json" \\
     -d @integrations/agents/customer-service/test-data.json
   ```

### Step 5: Documentation

Update the main README:
```markdown
### Customer Service Agent
**Status:** ✅ Live
**Demo:** /demos/customer-service
**Webhook:** /webhook/customer-service
```

---

## Checklist for Each Agent

- [ ] Export workflow.json from Claude Desktop
- [ ] Create agent folder in `integrations/agents/[agent-name]/`
- [ ] Add workflow.json
- [ ] Write README.md with setup instructions
- [ ] Create test-data.json with sample payloads
- [ ] Add .env.example with required variables
- [ ] Update demos page status to "live"
- [ ] Create demo page in `apps/website/app/demos/[agent-name]/`
- [ ] Test workflow execution locally
- [ ] Test n8n webhook directly
- [ ] Commit and push to GitHub
- [ ] Deploy to production
- [ ] Monitor execution logs

---

## Common Issues

### Issue: Workflow not found
**Solution:** Verify workflow is imported to n8n instance

### Issue: Environment variables not set
**Solution:** Add variables to `.env.local` and restart dev server

### Issue: CORS errors
**Solution:** Configure n8n webhook to accept requests from website domain

### Issue: Webhook timeout
**Solution:** Increase timeout in N8nClient config or optimize workflow

---

## Best Practices

1. **Always validate workflows** before importing
2. **Test with realistic data** that matches production
3. **Document all environment variables** with examples
4. **Version workflows** using Git tags
5. **Monitor execution logs** after deployment
6. **Set up alerts** for failed executions
7. **Keep workflows DRY** - reuse sub-workflows when possible
8. **Add error handling** for all external API calls

---

## Support

If you encounter issues:
1. Check workflow README
2. Review test-data.json for correct format
3. Validate environment variables
4. Check n8n execution logs
5. Test webhook directly with curl

For more help, see `.claude/n8n-agent-expert.md`
