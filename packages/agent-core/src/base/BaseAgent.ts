import {
  AgentConfig,
  AgentContext,
  AgentResponse,
  AgentStatus,
  AgentMessage,
  AgentEvent,
  AgentEventHandler,
} from "../types";

/**
 * Base Agent Class
 *
 * All agents should extend this class to inherit common functionality
 * including state management, event handling, and message processing.
 */
export abstract class BaseAgent {
  protected config: AgentConfig;
  protected context: AgentContext;
  protected status: AgentStatus = AgentStatus.IDLE;
  protected eventHandlers: Map<string, AgentEventHandler[]> = new Map();

  constructor(config: AgentConfig) {
    this.config = config;
    this.context = {
      conversationId: this.generateId(),
      messages: [],
    };
  }

  /**
   * Process a message from the user
   */
  abstract process(input: string, context?: Partial<AgentContext>): Promise<AgentResponse>;

  /**
   * Get current agent status
   */
  getStatus(): AgentStatus {
    return this.status;
  }

  /**
   * Update agent status and emit event
   */
  protected setStatus(status: AgentStatus): void {
    this.status = status;
    this.emit({ type: "status", data: status });
  }

  /**
   * Add a message to the conversation context
   */
  protected addMessage(message: AgentMessage): void {
    this.context.messages.push(message);
    this.emit({ type: "message", data: message });
  }

  /**
   * Get conversation history
   */
  getContext(): AgentContext {
    return { ...this.context };
  }

  /**
   * Update conversation context
   */
  updateContext(updates: Partial<AgentContext>): void {
    this.context = { ...this.context, ...updates };
  }

  /**
   * Clear conversation history
   */
  clearContext(): void {
    this.context = {
      conversationId: this.generateId(),
      messages: [],
    };
  }

  /**
   * Register an event handler
   */
  on(eventType: string, handler: AgentEventHandler): void {
    if (!this.eventHandlers.has(eventType)) {
      this.eventHandlers.set(eventType, []);
    }
    this.eventHandlers.get(eventType)!.push(handler);
  }

  /**
   * Remove an event handler
   */
  off(eventType: string, handler: AgentEventHandler): void {
    const handlers = this.eventHandlers.get(eventType);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index !== -1) {
        handlers.splice(index, 1);
      }
    }
  }

  /**
   * Emit an event to all registered handlers
   */
  protected emit(event: AgentEvent): void {
    const handlers = this.eventHandlers.get(event.type) || [];
    handlers.forEach((handler) => {
      try {
        handler(event);
      } catch (error) {
        console.error(`Error in event handler for ${event.type}:`, error);
      }
    });
  }

  /**
   * Generate a unique ID
   */
  protected generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Create a user message
   */
  protected createUserMessage(content: string): AgentMessage {
    return {
      id: this.generateId(),
      role: "user",
      content,
      timestamp: new Date(),
    };
  }

  /**
   * Create an assistant message
   */
  protected createAssistantMessage(content: string): AgentMessage {
    return {
      id: this.generateId(),
      role: "assistant",
      content,
      timestamp: new Date(),
    };
  }

  /**
   * Handle errors gracefully
   */
  protected handleError(error: Error): AgentResponse {
    this.setStatus(AgentStatus.ERROR);
    this.emit({ type: "error", data: error });

    return {
      message: this.createAssistantMessage(
        "I encountered an error processing your request. Please try again."
      ),
      status: AgentStatus.ERROR,
      error,
    };
  }
}
