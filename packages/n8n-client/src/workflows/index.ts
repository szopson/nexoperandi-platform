import { N8nWorkflow, WorkflowTemplate, N8nNodeType } from "../types";

/**
 * Lead Capture Workflow Template
 *
 * Basic workflow for capturing and processing contact form submissions
 */
export const leadCaptureTemplate: WorkflowTemplate = {
  id: "lead-capture",
  name: "Lead Capture & Qualification",
  description: "Capture leads from contact forms and qualify them with AI",
  category: "Lead Generation",
  tags: ["leads", "qualification", "contact-form"],
  workflow: {
    name: "Lead Capture & Qualification",
    active: true,
    nodes: [
      {
        id: "webhook",
        name: "On form submission",
        type: N8nNodeType.WEBHOOK,
        typeVersion: 1,
        position: [250, 300],
        webhookId: "",
        parameters: {
          httpMethod: "POST",
          path: "contact-form",
          responseMode: "onReceived",
        },
      },
      {
        id: "set",
        name: "Format Lead Data",
        type: N8nNodeType.SET,
        typeVersion: 1,
        position: [450, 300],
        parameters: {
          values: {
            string: [
              { name: "name", value: "={{ $json['What is your name?'] }}" },
              { name: "email", value: "={{ $json['What is your email?'] }}" },
              { name: "website", value: "={{ $json['What is your company website?'] }}" },
              { name: "message", value: "={{ $json['What can we help you with?'] }}" },
            ],
          },
        },
      },
    ],
    connections: {
      webhook: {
        main: [[{ node: "set", type: "main", index: 0 }]],
      },
    },
  },
};

/**
 * Get all workflow templates
 */
export function getWorkflowTemplates(): WorkflowTemplate[] {
  return [leadCaptureTemplate];
}

/**
 * Get a workflow template by ID
 */
export function getWorkflowTemplate(id: string): WorkflowTemplate | undefined {
  return getWorkflowTemplates().find((template) => template.id === id);
}

/**
 * Create a workflow from a template
 */
export function createWorkflowFromTemplate(
  templateId: string,
  customizations?: Partial<N8nWorkflow>
): N8nWorkflow | undefined {
  const template = getWorkflowTemplate(templateId);
  if (!template) return undefined;

  return {
    ...template.workflow,
    ...customizations,
  };
}
