import { z } from "zod";

/**
 * Agent Types
 */
export enum AgentType {
  VOICE = "voice",
  CHAT = "chat",
  WORKFLOW = "workflow",
  CUSTOM = "custom",
}

/**
 * Agent Status
 */
export enum AgentStatus {
  IDLE = "idle",
  PROCESSING = "processing",
  LISTENING = "listening",
  SPEAKING = "speaking",
  ERROR = "error",
}

/**
 * Agent Message Schema
 */
export const AgentMessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});

export type AgentMessage = z.infer<typeof AgentMessageSchema>;

/**
 * Agent Configuration
 */
export interface AgentConfig {
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

/**
 * Agent Context
 */
export interface AgentContext {
  conversationId: string;
  userId?: string;
  messages: AgentMessage[];
  metadata?: Record<string, unknown>;
}

/**
 * Agent Response
 */
export interface AgentResponse {
  message: AgentMessage;
  status: AgentStatus;
  error?: Error;
  metadata?: Record<string, unknown>;
}

/**
 * Agent Event
 */
export type AgentEvent =
  | { type: "message"; data: AgentMessage }
  | { type: "status"; data: AgentStatus }
  | { type: "error"; data: Error }
  | { type: "custom"; data: unknown };

/**
 * Agent Event Handler
 */
export type AgentEventHandler = (event: AgentEvent) => void | Promise<void>;
