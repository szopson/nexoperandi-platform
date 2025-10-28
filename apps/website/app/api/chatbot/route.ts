import { NextRequest, NextResponse } from 'next/server';

/**
 * AI Chatbot API Route
 * Sends customer messages to n8n workflow for AI-powered responses
 */

const N8N_CHATBOT_URL = process.env.N8N_CHATBOT_URL || '';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  message: string;
  sessionId: string;
  conversationHistory?: ChatMessage[];
  userId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message, sessionId, conversationHistory = [], userId = 'anonymous' } = body;

    console.log('💬 Chatbot - Received message:', {
      sessionId,
      userId,
      messageLength: message?.length || 0,
      historyLength: conversationHistory.length,
      timestamp: new Date().toISOString()
    });

    // Validate required fields
    if (!message || !sessionId) {
      console.error('❌ Missing required fields');
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields (message, sessionId)'
        },
        { status: 400 }
      );
    }

    // Check if webhook is configured
    if (!N8N_CHATBOT_URL) {
      console.error('⚠️  N8N_CHATBOT_URL is not configured');
      console.log('💡 Add N8N_CHATBOT_URL to .env.local to enable AI chatbot');

      // Return mock response for development/testing
      return NextResponse.json({
        success: true,
        response: "I'm currently in demo mode. To enable full AI capabilities, please configure the N8N_CHATBOT_URL environment variable with your n8n webhook endpoint. I can help you with information about NexOperandi's AI automation services, pricing, and scheduling consultations!",
        sessionId,
        timestamp: new Date().toISOString(),
        metadata: {
          intent: 'general',
          sentiment: 'neutral',
          urgency: 'low',
          suggestedAction: 'continue_chat',
          keyTopics: ['demo_mode']
        },
        note: 'Demo mode - Configure N8N_CHATBOT_URL to enable AI responses'
      });
    }

    // Prepare data for n8n workflow
    const payload = {
      message,
      sessionId,
      userId,
      conversationHistory,
      timestamp: new Date().toISOString(),
      source: 'NexOperandi Website Chatbot',
    };

    console.log('🔄 Forwarding to n8n chatbot workflow:', N8N_CHATBOT_URL);

    // Send to n8n for AI processing
    const response = await fetch(N8N_CHATBOT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('📡 n8n response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ n8n webhook error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`n8n webhook failed: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('✅ Chatbot message processed successfully');

    // Return AI response
    return NextResponse.json({
      success: true,
      response: result.response,
      sessionId: result.sessionId,
      timestamp: result.timestamp,
      metadata: result.metadata,
      conversationContext: result.conversationContext
    });

  } catch (error) {
    console.error('❌ Chatbot error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process chat message',
        message: error instanceof Error ? error.message : 'Unknown error',
        hint: 'Make sure n8n chatbot workflow is active at: ' + N8N_CHATBOT_URL
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'AI Chatbot API',
    configured: !!N8N_CHATBOT_URL,
    timestamp: new Date().toISOString()
  });
}
