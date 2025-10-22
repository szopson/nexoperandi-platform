# @nexoperandi/agent-core

Core agent logic and types for the NexOperandi platform.

## Overview

This package provides the foundational classes, types, and utilities for building AI agents. All agent implementations should extend the `BaseAgent` class to inherit common functionality.

## Installation

```bash
pnpm add @nexoperandi/agent-core
```

## Usage

### Creating a Custom Agent

```typescript
import { BaseAgent, AgentConfig, AgentResponse, AgentStatus } from "@nexoperandi/agent-core";

class MyCustomAgent extends BaseAgent {
  async process(input: string): Promise<AgentResponse> {
    try {
      this.setStatus(AgentStatus.PROCESSING);

      // Add user message to context
      const userMessage = this.createUserMessage(input);
      this.addMessage(userMessage);

      // Your agent logic here
      const responseText = await this.processWithAI(input);

      // Create response message
      const assistantMessage = this.createAssistantMessage(responseText);
      this.addMessage(assistantMessage);

      this.setStatus(AgentStatus.IDLE);

      return {
        message: assistantMessage,
        status: AgentStatus.IDLE,
      };
    } catch (error) {
      return this.handleError(error as Error);
    }
  }

  private async processWithAI(input: string): Promise<string> {
    // Your AI processing logic
    return "Response from AI";
  }
}
```

### Using the Agent

```typescript
const config: AgentConfig = {
  id: "my-agent",
  name: "My Custom Agent",
  type: AgentType.CHAT,
  systemPrompt: "You are a helpful assistant.",
};

const agent = new MyCustomAgent(config);

// Listen to events
agent.on("status", (event) => {
  console.log("Status changed:", event.data);
});

agent.on("message", (event) => {
  console.log("New message:", event.data);
});

// Process a message
const response = await agent.process("Hello, how can you help me?");
console.log(response.message.content);

// Get conversation history
const context = agent.getContext();
console.log("Message history:", context.messages);
```

## API

### BaseAgent

Abstract class that all agents should extend.

#### Methods

- `process(input: string, context?: Partial<AgentContext>): Promise<AgentResponse>` - Process user input (must be implemented)
- `getStatus(): AgentStatus` - Get current agent status
- `getContext(): AgentContext` - Get conversation context
- `updateContext(updates: Partial<AgentContext>): void` - Update context
- `clearContext(): void` - Clear conversation history
- `on(eventType: string, handler: AgentEventHandler): void` - Register event handler
- `off(eventType: string, handler: AgentEventHandler): void` - Remove event handler

### Types

#### AgentType
```typescript
enum AgentType {
  VOICE = "voice",
  CHAT = "chat",
  WORKFLOW = "workflow",
  CUSTOM = "custom",
}
```

#### AgentStatus
```typescript
enum AgentStatus {
  IDLE = "idle",
  PROCESSING = "processing",
  LISTENING = "listening",
  SPEAKING = "speaking",
  ERROR = "error",
}
```

#### AgentConfig
```typescript
interface AgentConfig {
  id: string;
  name: string;
  type: AgentType;
  description?: string;
  systemPrompt?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  metadata?: Record<string, unknown>;
}
```

#### AgentContext
```typescript
interface AgentContext {
  conversationId: string;
  userId?: string;
  messages: AgentMessage[];
  metadata?: Record<string, unknown>;
}
```

#### AgentMessage
```typescript
interface AgentMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}
```

### Utilities

- `truncateText(text: string, maxLength: number): string`
- `formatTimestamp(date: Date): string`
- `sanitizeInput(input: string): string`
- `estimateTokens(text: string): number`
- `wait(ms: number): Promise<void>`

## License

ISC
