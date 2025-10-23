/**
 * N8nClient - TypeScript client for executing n8n workflows
 *
 * This client provides a type-safe interface to interact with
 * n8n workflows deployed on the NexOperandi platform.
 */

import type {
  WorkflowInput,
  WorkflowOutput,
  WorkflowExecution,
  WorkflowDefinition,
  N8nApiResponse,
  N8nWebhookResponse,
} from '../types/workflow';

export interface N8nClientConfig {
  baseUrl: string;
  apiKey?: string;
  timeout?: number;
  retryAttempts?: number;
}

export class N8nClient {
  private baseUrl: string;
  private apiKey?: string;
  private timeout: number;
  private retryAttempts: number;

  constructor(config: N8nClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, ''); // Remove trailing slash
    this.apiKey = config.apiKey;
    this.timeout = config.timeout || 30000; // 30 second default
    this.retryAttempts = config.retryAttempts || 3;
  }

  /**
   * Execute a workflow via webhook
   */
  async executeWorkflow<I = unknown, O = unknown>(
    webhookPath: string,
    input: WorkflowInput<I>
  ): Promise<WorkflowOutput<O>> {
    const url = `${this.baseUrl}/webhook/${webhookPath}`;

    try {
      const response = await this.fetchWithRetry(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { Authorization: `Bearer ${this.apiKey}` }),
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Workflow execution failed: ${response.statusText}`);
      }

      const result: N8nWebhookResponse<O> = await response.json();

      return {
        success: true,
        data: result.data,
        executionId: result.executionId,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'EXECUTION_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error',
          details: error,
        },
      };
    }
  }

  /**
   * Get workflow execution status
   */
  async getExecution(executionId: string): Promise<WorkflowExecution | null> {
    if (!this.apiKey) {
      throw new Error('API key required for this operation');
    }

    const url = `${this.baseUrl}/api/v1/executions/${executionId}`;

    try {
      const response = await fetch(url, {
        headers: {
          'X-N8N-API-KEY': this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch execution: ${response.statusText}`);
      }

      const result: N8nApiResponse<WorkflowExecution> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching execution:', error);
      return null;
    }
  }

  /**
   * List all workflow executions
   */
  async listExecutions(filters?: {
    workflowId?: string;
    status?: 'success' | 'error' | 'running' | 'waiting';
    limit?: number;
  }): Promise<WorkflowExecution[]> {
    if (!this.apiKey) {
      throw new Error('API key required for this operation');
    }

    const params = new URLSearchParams();
    if (filters?.workflowId) params.append('workflowId', filters.workflowId);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const url = `${this.baseUrl}/api/v1/executions?${params.toString()}`;

    try {
      const response = await fetch(url, {
        headers: {
          'X-N8N-API-KEY': this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to list executions: ${response.statusText}`);
      }

      const result: N8nApiResponse<{ data: WorkflowExecution[] }> = await response.json();
      return result.data.data;
    } catch (error) {
      console.error('Error listing executions:', error);
      return [];
    }
  }

  /**
   * Get workflow definition
   */
  async getWorkflow(workflowId: string): Promise<WorkflowDefinition | null> {
    if (!this.apiKey) {
      throw new Error('API key required for this operation');
    }

    const url = `${this.baseUrl}/api/v1/workflows/${workflowId}`;

    try {
      const response = await fetch(url, {
        headers: {
          'X-N8N-API-KEY': this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch workflow: ${response.statusText}`);
      }

      const result: N8nApiResponse<WorkflowDefinition> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching workflow:', error);
      return null;
    }
  }

  /**
   * Test webhook connectivity
   */
  async testWebhook(webhookPath: string): Promise<boolean> {
    const url = `${this.baseUrl}/webhook/${webhookPath}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Webhook test failed:', error);
      return false;
    }
  }

  /**
   * Fetch with retry logic
   */
  private async fetchWithRetry(
    url: string,
    options: RequestInit,
    attempt = 1
  ): Promise<Response> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      if (attempt < this.retryAttempts) {
        // Exponential backoff: 1s, 2s, 4s
        const delay = Math.pow(2, attempt - 1) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.fetchWithRetry(url, options, attempt + 1);
      }

      throw error;
    }
  }
}

// Export a pre-configured client instance
export function createN8nClient(config?: Partial<N8nClientConfig>): N8nClient {
  const defaultConfig: N8nClientConfig = {
    baseUrl: process.env.N8N_API_URL || 'http://piotr108.mikrus.xyz:40233',
    apiKey: process.env.N8N_API_KEY,
    timeout: 30000,
    retryAttempts: 3,
  };

  return new N8nClient({ ...defaultConfig, ...config });
}
