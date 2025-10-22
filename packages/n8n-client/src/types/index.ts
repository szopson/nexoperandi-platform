import { z } from "zod";

/**
 * n8n Client Configuration
 */
export interface N8nClientConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
}

/**
 * n8n Workflow Schema
 */
export const N8nWorkflowSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  active: z.boolean(),
  nodes: z.array(z.any()),
  connections: z.record(z.any()),
  settings: z.record(z.any()).optional(),
  tags: z.array(z.string()).optional(),
});

export type N8nWorkflow = z.infer<typeof N8nWorkflowSchema>;

/**
 * n8n Execution
 */
export interface N8nExecution {
  id: string;
  workflowId: string;
  status: "success" | "error" | "waiting" | "running";
  startedAt: string;
  stoppedAt?: string;
  data?: Record<string, unknown>;
  mode: "manual" | "trigger" | "webhook";
}

/**
 * n8n Webhook Configuration
 */
export interface N8nWebhookConfig {
  workflowId: string;
  path?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  responseMode?: "onReceived" | "lastNode";
}

/**
 * n8n Node Types
 */
export enum N8nNodeType {
  WEBHOOK = "n8n-nodes-base.webhook",
  HTTP_REQUEST = "n8n-nodes-base.httpRequest",
  CODE = "n8n-nodes-base.code",
  IF = "n8n-nodes-base.if",
  SET = "n8n-nodes-base.set",
  MERGE = "n8n-nodes-base.merge",
  SWITCH = "n8n-nodes-base.switch",
}

/**
 * Workflow Template
 */
export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  workflow: N8nWorkflow;
  category: string;
  tags: string[];
}
