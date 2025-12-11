import { NextRequest, NextResponse } from 'next/server';

/**
 * Contact Form API Route with AI Lead Qualification
 * Handles submissions from:
 * - Contact form (source: 'contact')
 * - Quiz modal (source: 'quiz')
 * - Exit-intent popup (source: 'exit-intent')
 *
 * Sends contact submissions to n8n for AI analysis, scoring, and email notification
 */

type SubmissionSource = 'contact' | 'quiz' | 'exit-intent';

interface QuizAnswers {
  challenge?: string;
  currentSolution?: string;
  businessStage?: string;
  urgency?: string;
}

interface ContactPayload {
  name?: string;
  email: string;
  website?: string;
  message?: string;
  source?: SubmissionSource;
  quizAnswers?: QuizAnswers;
  recommendation?: string;
  leadMagnet?: string;
  timestamp?: string;
}

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || '';

// Helper function to generate message based on source
function generateMessageFromSource(
  src: SubmissionSource,
  answers?: QuizAnswers,
  rec?: string,
  magnet?: string
): string {
  switch (src) {
    case 'quiz':
      return `Quiz completed. Recommendation: ${rec || 'N/A'}. ` +
        `Challenge: ${answers?.challenge || 'N/A'}, ` +
        `Stage: ${answers?.businessStage || 'N/A'}, ` +
        `Urgency: ${answers?.urgency || 'N/A'}`;
    case 'exit-intent':
      return `Exit-intent lead magnet request: ${magnet || 'automation-checklist'}`;
    default:
      return 'Contact form submission';
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json();
    const {
      name,
      email,
      website,
      message,
      source = 'contact',
      quizAnswers,
      recommendation,
      leadMagnet,
      timestamp
    } = body;

    // Validate required fields based on source
    if (source === 'contact') {
      if (!name || !email || !message) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        );
      }
    } else {
      // Quiz and exit-intent only require email
      if (!email) {
        return NextResponse.json(
          { error: 'Email is required' },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if webhook is configured
    if (!N8N_WEBHOOK_URL) {
      // Return success anyway (for development/testing)
      return NextResponse.json({
        success: true,
        message: 'Form submitted successfully (webhook not configured)',
        note: 'Configure N8N_WEBHOOK_URL to enable AI lead qualification'
      });
    }

    // Prepare data for n8n workflow
    const payload = {
      name: name || 'Not provided',
      email,
      website: website || 'Not provided',
      message: message || generateMessageFromSource(source, quizAnswers, recommendation, leadMagnet),
      timestamp: timestamp || new Date().toISOString(),
      source: `NexOperandi Website - ${source}`,
      // Include additional metadata for n8n to process
      metadata: {
        submissionType: source,
        ...(quizAnswers && { quizAnswers }),
        ...(recommendation && { recommendation }),
        ...(leadMagnet && { leadMagnet }),
      },
    };

    // Send to n8n for AI qualification
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`n8n webhook failed: ${response.status} - ${errorText}`);
    }

    // Try to parse JSON response, but handle empty responses
    let result: unknown = null;
    const responseText = await response.text();

    if (responseText) {
      try {
        result = JSON.parse(responseText);
      } catch {
        // Silently handle non-JSON responses
      }
    }

    // Return success with lead info (if available)
    const responseData: { success: boolean; message: string; lead?: unknown } = {
      success: true,
      message: 'Thank you! We\'ve received your message and will get back to you soon.',
    };

    // Include lead score if returned from n8n
    if (result && typeof result === 'object' && 'lead' in result) {
      responseData.lead = (result as { lead: unknown }).lead;
    }

    return NextResponse.json(responseData);

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit form',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
