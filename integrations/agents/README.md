# AI Agent Workflows

This folder contains n8n workflow definitions for all AI agents built in the NexOperandi platform.

## Structure

Each agent folder contains:
- `workflow.json` - The n8n workflow definition (exported from Claude Desktop)
- `README.md` - Agent documentation and setup instructions
- `test-data.json` - Sample input/output for testing
- `.env.example` - Required environment variables

## Agent List

### 1. Customer Service Agent
**Status:** 🔄 In Development
**ROI:** $3.50 return per $1 invested
**Location:** `./customer-service/`

### 2. Lead Generation Agent
**Status:** 🔄 In Development
**ROI:** 7x conversion improvement
**Location:** `./lead-generation/`

### 3. Meeting Scheduler Agent
**Status:** 🔄 In Development
**ROI:** Saves 11+ hours/week per rep
**Location:** `./meeting-scheduler/`

### 4. Document Generator Agent
**Status:** 🔄 In Development
**ROI:** 80% time reduction
**Location:** `./document-generator/`

### 5. Visitor Intelligence Agent
**Status:** 🔄 In Development
**ROI:** 3-5x lead conversion
**Location:** `./visitor-intelligence/`

## Workflow Development Process

### Phase 1: Build in Claude Desktop (Current)
1. Use Claude Desktop with n8n MCP tools
2. Build workflow using templates and validation
3. Test on production n8n instance
4. Export workflow JSON
5. Document all inputs/outputs

### Phase 2: Import to Codebase (Next)
1. Place workflow.json in agent folder
2. Create README.md with setup instructions
3. Add test-data.json with examples
4. Create .env.example with required vars
5. Update agent status in demos page

### Phase 3: Website Integration (Final)
1. Update `apps/website/app/demos/[agent]/page.tsx`
2. Connect to n8n client SDK
3. Enable live demo
4. Add analytics tracking

## Environment Variables

All workflows require the following base environment variables:

```env
# n8n Instance
N8N_API_URL=https://n8n.srv1108737.hstgr.cloud
N8N_API_KEY=your-api-key-here

# AI Models
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# Database
DATABASE_URL=postgresql://...

# Optional: Agent-specific variables
# Add to individual agent .env.example files
```

## Deployment

Workflows are deployed to the n8n instance at:
- **Production:** https://n8n.srv1108737.hstgr.cloud
- **Webhook Base:** https://n8n.srv1108737.hstgr.cloud/webhook/

## Testing

Each agent includes test data for validation:

```bash
# Test customer service agent
curl -X POST https://n8n.srv1108737.hstgr.cloud/webhook/customer-service \
  -H "Content-Type: application/json" \
  -d @integrations/agents/customer-service/test-data.json
```

## Documentation Template

When adding a new agent, copy this template to the agent folder's README:

```markdown
# [Agent Name]

## Overview
[Brief description of what this agent does]

## ROI Metrics
- Metric 1: X% improvement
- Metric 2: $X saved per month
- Metric 3: Xhrs time saved

## Workflow Details

### Trigger
- Type: Webhook/Schedule/Email
- URL: /webhook/[agent-name]
- Method: POST

### Input Schema
\`\`\`json
{
  "field1": "string",
  "field2": "number"
}
\`\`\`

### Output Schema
\`\`\`json
{
  "result": "string",
  "success": true
}
\`\`\`

### Required Environment Variables
- `VAR_NAME`: Description
- `VAR_NAME_2`: Description

## Setup Instructions

1. Import workflow to n8n instance
2. Configure environment variables
3. Test with sample data
4. Enable webhook endpoint
5. Update website demo page

## Maintenance

- Last Updated: [Date]
- n8n Version: 1.x
- Breaking Changes: None
```

## Support

For questions about workflows:
1. Check agent README.md
2. Review n8n-agent-expert.md in .claude folder
3. Test with sample data in test-data.json
4. Check n8n instance logs

---

**Next Steps:**
1. ✅ Build workflows in Claude Desktop
2. ⏳ Export and document each workflow
3. ⏳ Import to this folder structure
4. ⏳ Integrate with website demos
