/**
 * n8n Workflow TypeScript Types
 *
 * These types define the structure of n8n workflows and their metadata
 * for type-safe integration with the NexOperandi platform.
 */

export interface WorkflowMetadata {
  name: string;
  description: string;
  webhookUrl: string;
  requiredEnvVars: string[];
  category: 'customer-service' | 'lead-generation' | 'meeting-scheduler' | 'document-generator' | 'visitor-intelligence';
  version: string;
  lastUpdated: string;
  author?: string;
  templateUrl?: string;
}

export interface WorkflowInput<T = Record<string, unknown>> {
  data: T;
  metadata?: {
    source?: string;
    timestamp?: string;
    userId?: string;
    sessionId?: string;
  };
}

export interface WorkflowOutput<T = Record<string, unknown>> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  executionId?: string;
  executionTime?: number;
}

// Agent-specific input/output types

export interface CustomerServiceInput {
  email: string;
  message: string;
  context?: {
    previousMessages?: Array<{ role: 'user' | 'agent'; content: string }>;
    customerInfo?: {
      name?: string;
      company?: string;
      tier?: 'starter' | 'growth' | 'enterprise';
    };
  };
}

export interface CustomerServiceOutput {
  response: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  requiresHumanEscalation: boolean;
  suggestedActions?: string[];
  confidence: number;
}

export interface LeadGenerationInput {
  email: string;
  name?: string;
  company?: string;
  website?: string;
  message?: string;
  source: 'website' | 'linkedin' | 'email' | 'referral';
}

export interface LeadGenerationOutput {
  leadScore: number;
  enrichedData: {
    company?: {
      name: string;
      industry?: string;
      size?: string;
      revenue?: string;
    };
    contact?: {
      title?: string;
      linkedin?: string;
    };
  };
  buyingSignals: string[];
  recommendedAction: 'immediate-contact' | 'nurture' | 'disqualify';
  crmRecordId?: string;
}

export interface MeetingSchedulerInput {
  email: string;
  name: string;
  preferredTimes: Array<{
    date: string;
    timeSlots: string[];
  }>;
  meetingType: 'discovery' | 'demo' | 'consultation' | 'follow-up';
  timezone: string;
}

export interface MeetingSchedulerOutput {
  scheduledTime?: string;
  calendarEventId?: string;
  confirmationSent: boolean;
  meetingLink?: string;
  nextSteps: string[];
}

export interface DocumentGeneratorInput {
  type: 'proposal' | 'contract' | 'sow' | 'invoice';
  clientInfo: {
    name: string;
    company: string;
    email: string;
  };
  projectDetails: {
    title: string;
    description: string;
    budget?: number;
    timeline?: string;
  };
  templateId?: string;
  customFields?: Record<string, unknown>;
}

export interface DocumentGeneratorOutput {
  documentUrl: string;
  documentId: string;
  format: 'pdf' | 'docx' | 'html';
  generatedAt: string;
  expiresAt?: string;
}

export interface VisitorIntelligenceInput {
  sessionId: string;
  pageUrl: string;
  referrer?: string;
  ipAddress?: string;
  userAgent: string;
  events: Array<{
    type: 'pageview' | 'click' | 'form-submit' | 'scroll';
    timestamp: string;
    data?: Record<string, unknown>;
  }>;
}

export interface VisitorIntelligenceOutput {
  visitorId: string;
  company?: {
    name: string;
    domain: string;
    industry?: string;
  };
  intentScore: number;
  buyingStage: 'awareness' | 'consideration' | 'decision';
  recommendedEngagement?: {
    type: 'chat' | 'email' | 'call';
    priority: 'high' | 'medium' | 'low';
    message: string;
  };
  shouldCreateLead: boolean;
}

// Workflow execution types

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: 'running' | 'success' | 'error' | 'waiting';
  startedAt: string;
  finishedAt?: string;
  mode: 'manual' | 'webhook' | 'schedule';
  data?: {
    input?: unknown;
    output?: unknown;
  };
}

export interface WorkflowDefinition {
  id?: string;
  name: string;
  active: boolean;
  nodes: WorkflowNode[];
  connections: WorkflowConnections;
  settings?: WorkflowSettings;
  staticData?: Record<string, unknown>;
  tags?: string[];
}

export interface WorkflowNode {
  id: string;
  name: string;
  type: string;
  typeVersion: number;
  position: [number, number];
  parameters: Record<string, unknown>;
  credentials?: Record<string, string>;
  webhookId?: string;
  disabled?: boolean;
}

export interface WorkflowConnections {
  [sourceNodeName: string]: {
    [outputType: string]: Array<
      Array<{
        node: string;
        type: string;
        index: number;
      }>
    >;
  };
}

export interface WorkflowSettings {
  errorWorkflow?: string;
  timezone?: string;
  saveManualExecutions?: boolean;
  saveExecutionProgress?: boolean;
  saveDataErrorExecution?: 'all' | 'none';
  saveDataSuccessExecution?: 'all' | 'none';
  executionTimeout?: number;
}

// n8n API Response types

export interface N8nApiResponse<T = unknown> {
  data: T;
}

export interface N8nApiError {
  message: string;
  name: string;
  httpStatusCode?: number;
  code?: string;
}

export interface N8nWebhookResponse<T = unknown> {
  workflowId: string;
  executionId: string;
  data: T;
}

// Export all types
export type WorkflowCategory = WorkflowMetadata['category'];
export type AgentInputType =
  | CustomerServiceInput
  | LeadGenerationInput
  | MeetingSchedulerInput
  | DocumentGeneratorInput
  | VisitorIntelligenceInput;
export type AgentOutputType =
  | CustomerServiceOutput
  | LeadGenerationOutput
  | MeetingSchedulerOutput
  | DocumentGeneratorOutput
  | VisitorIntelligenceOutput;
