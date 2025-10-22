import { N8nClientConfig, N8nWorkflow, N8nExecution } from "../types";

/**
 * n8n API Client
 *
 * Type-safe wrapper for n8n API operations
 */
export class N8nClient {
  private config: Required<N8nClientConfig>;

  constructor(config: N8nClientConfig) {
    this.config = {
      baseUrl: config.baseUrl || "http://localhost:5678",
      timeout: config.timeout || 30000,
      apiKey: config.apiKey,
    };
  }

  /**
   * Make an API request to n8n
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const headers = {
      "X-N8N-API-KEY": this.config.apiKey,
      "Content-Type": "application/json",
      ...options.headers,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`n8n API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(`n8n request timeout after ${this.config.timeout}ms`);
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Get all workflows
   */
  async getWorkflows(): Promise<N8nWorkflow[]> {
    return this.request<N8nWorkflow[]>("/api/v1/workflows");
  }

  /**
   * Get a workflow by ID
   */
  async getWorkflow(id: string): Promise<N8nWorkflow> {
    return this.request<N8nWorkflow>(`/api/v1/workflows/${id}`);
  }

  /**
   * Create a new workflow
   */
  async createWorkflow(workflow: Omit<N8nWorkflow, "id">): Promise<N8nWorkflow> {
    return this.request<N8nWorkflow>("/api/v1/workflows", {
      method: "POST",
      body: JSON.stringify(workflow),
    });
  }

  /**
   * Update an existing workflow
   */
  async updateWorkflow(id: string, workflow: Partial<N8nWorkflow>): Promise<N8nWorkflow> {
    return this.request<N8nWorkflow>(`/api/v1/workflows/${id}`, {
      method: "PATCH",
      body: JSON.stringify(workflow),
    });
  }

  /**
   * Delete a workflow
   */
  async deleteWorkflow(id: string): Promise<void> {
    await this.request<void>(`/api/v1/workflows/${id}`, {
      method: "DELETE",
    });
  }

  /**
   * Activate a workflow
   */
  async activateWorkflow(id: string): Promise<N8nWorkflow> {
    return this.updateWorkflow(id, { active: true });
  }

  /**
   * Deactivate a workflow
   */
  async deactivateWorkflow(id: string): Promise<N8nWorkflow> {
    return this.updateWorkflow(id, { active: false });
  }

  /**
   * Execute a workflow
   */
  async executeWorkflow(id: string, data?: Record<string, unknown>): Promise<N8nExecution> {
    return this.request<N8nExecution>(`/api/v1/workflows/${id}/execute`, {
      method: "POST",
      body: JSON.stringify({ data }),
    });
  }

  /**
   * Get workflow executions
   */
  async getExecutions(workflowId?: string): Promise<N8nExecution[]> {
    const query = workflowId ? `?workflowId=${workflowId}` : "";
    return this.request<N8nExecution[]>(`/api/v1/executions${query}`);
  }

  /**
   * Get a specific execution
   */
  async getExecution(id: string): Promise<N8nExecution> {
    return this.request<N8nExecution>(`/api/v1/executions/${id}`);
  }

  /**
   * Trigger a webhook workflow
   */
  async triggerWebhook(
    webhookPath: string,
    data?: Record<string, unknown>,
    method: "GET" | "POST" = "POST"
  ): Promise<unknown> {
    const url = `${this.config.baseUrl}/webhook/${webhookPath}`;

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: method === "POST" ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Webhook trigger failed: ${response.status}`);
    }

    return await response.json();
  }

  /**
   * Test webhook connection
   */
  async testWebhook(webhookPath: string): Promise<boolean> {
    try {
      await this.triggerWebhook(webhookPath, { test: true });
      return true;
    } catch {
      return false;
    }
  }
}
