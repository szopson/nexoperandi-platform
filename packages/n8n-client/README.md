# @nexoperandi/n8n-client

Type-safe n8n API client and workflow tools for the NexOperandi platform.

## Overview

This package provides a clean, type-safe interface for interacting with n8n workflows, including API operations, webhook triggers, and pre-built workflow templates.

## Installation

```bash
pnpm add @nexoperandi/n8n-client
```

## Usage

### Basic Client Setup

```typescript
import { N8nClient } from "@nexoperandi/n8n-client";

const client = new N8nClient({
  apiKey: process.env.N8N_API_KEY!,
  baseUrl: "https://your-n8n-instance.com",
  timeout: 30000, // optional
});
```

### Working with Workflows

```typescript
// Get all workflows
const workflows = await client.getWorkflows();

// Get a specific workflow
const workflow = await client.getWorkflow("workflow-id");

// Create a new workflow
const newWorkflow = await client.createWorkflow({
  name: "My Workflow",
  active: true,
  nodes: [...],
  connections: {...},
});

// Update a workflow
await client.updateWorkflow("workflow-id", {
  name: "Updated Name",
  active: true,
});

// Activate/Deactivate
await client.activateWorkflow("workflow-id");
await client.deactivateWorkflow("workflow-id");

// Delete a workflow
await client.deleteWorkflow("workflow-id");
```

### Triggering Webhooks

```typescript
// Trigger a webhook workflow
const result = await client.triggerWebhook("contact-form", {
  name: "John Doe",
  email: "john@example.com",
  message: "I need help with AI automation",
});

// Test webhook connection
const isConnected = await client.testWebhook("contact-form");
if (isConnected) {
  console.log("Webhook is working!");
}
```

### Working with Executions

```typescript
// Get all executions
const executions = await client.getExecutions();

// Get executions for a specific workflow
const workflowExecutions = await client.getExecutions("workflow-id");

// Get a specific execution
const execution = await client.getExecution("execution-id");

// Execute a workflow manually
const result = await client.executeWorkflow("workflow-id", {
  customData: "value",
});
```

### Using Workflow Templates

```typescript
import { getWorkflowTemplates, createWorkflowFromTemplate } from "@nexoperandi/n8n-client";

// Get all available templates
const templates = getWorkflowTemplates();

// Create a workflow from a template
const workflow = createWorkflowFromTemplate("lead-capture", {
  name: "My Custom Lead Capture",
  tags: ["production", "leads"],
});

// Deploy the workflow
if (workflow) {
  const deployed = await client.createWorkflow(workflow);
  console.log("Workflow deployed:", deployed.id);
}
```

### Available Templates

#### Lead Capture & Qualification
Captures leads from contact forms and processes them with AI qualification.

```typescript
const leadWorkflow = createWorkflowFromTemplate("lead-capture");
```

**Features:**
- Webhook trigger for form submissions
- Data formatting and validation
- Ready for AI qualification integration

## API Reference

### N8nClient

#### Constructor
```typescript
new N8nClient(config: N8nClientConfig)
```

#### Methods

**Workflows:**
- `getWorkflows(): Promise<N8nWorkflow[]>`
- `getWorkflow(id: string): Promise<N8nWorkflow>`
- `createWorkflow(workflow: Omit<N8nWorkflow, "id">): Promise<N8nWorkflow>`
- `updateWorkflow(id: string, workflow: Partial<N8nWorkflow>): Promise<N8nWorkflow>`
- `deleteWorkflow(id: string): Promise<void>`
- `activateWorkflow(id: string): Promise<N8nWorkflow>`
- `deactivateWorkflow(id: string): Promise<N8nWorkflow>`

**Executions:**
- `executeWorkflow(id: string, data?: Record<string, unknown>): Promise<N8nExecution>`
- `getExecutions(workflowId?: string): Promise<N8nExecution[]>`
- `getExecution(id: string): Promise<N8nExecution>`

**Webhooks:**
- `triggerWebhook(webhookPath: string, data?: Record<string, unknown>, method?: "GET" | "POST"): Promise<unknown>`
- `testWebhook(webhookPath: string): Promise<boolean>`

### Types

See [src/types/index.ts](./src/types/index.ts) for all available types.

## Environment Variables

```env
N8N_API_KEY=your-api-key
N8N_BASE_URL=https://your-n8n-instance.com
```

## Best Practices

1. **Always use environment variables** for API keys
2. **Test webhooks** before deploying to production
3. **Handle errors gracefully** - network issues, timeouts, etc.
4. **Use templates** as starting points for common workflows
5. **Validate data** before sending to n8n
6. **Monitor executions** to catch failures early

## Integration with n8n MCP Servers

This client works seamlessly with the n8n MCP servers configured in your environment. For advanced workflow creation and validation, use the MCP tools directly (see `.claude/n8n-agent-expert.md`).

## License

ISC
