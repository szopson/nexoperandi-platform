import { NextRequest, NextResponse } from 'next/server';

/**
 * Enhanced AI Chatbot API Route
 * Features: Lead scoring, contact capture, knowledge base, smart CTAs
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
  userName?: string;
  userEmail?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const {
      message,
      sessionId,
      conversationHistory = [],
      userId = 'anonymous',
      userName = '',
      userEmail = ''
    } = body;

    console.log('💬 Chatbot Enhanced - Received message:', {
      sessionId,
      userId,
      userName: userName || 'Not provided',
      userEmail: userEmail || 'Not provided',
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
      console.log('💡 Add N8N_CHATBOT_URL to .env.local to enable enhanced AI chatbot');

      // Return enhanced demo response
      return NextResponse.json({
        success: true,
        response: getDemoResponse(message, !!userEmail),
        sessionId,
        timestamp: new Date().toISOString(),
        leadIntelligence: {
          score: 50,
          quality: 'warm',
          intent: 'general',
          sentiment: 'positive',
          urgency: 'low',
          hasContactInfo: !!userEmail,
          reasonForScore: 'Demo mode - moderate engagement'
        },
        suggestedAction: 'continue_chat',
        callToAction: {
          show: true,
          buttons: [
            { label: "Our Services", action: "services" },
            { label: "Get Pricing", action: "pricing" },
            { label: "Book Consultation", action: "book" }
          ]
        },
        requestContactInfo: !userEmail && conversationHistory.length >= 2,
        analytics: {
          keyTopics: ['demo_mode'],
          messageCount: conversationHistory.length + 2,
          sessionDuration: 'calculating...'
        },
        note: 'Demo mode - Configure N8N_CHATBOT_URL to enable full AI capabilities'
      });
    }

    // Prepare enhanced payload for n8n
    const payload = {
      message,
      sessionId,
      userId,
      userName,
      userEmail,
      conversationHistory,
      timestamp: new Date().toISOString(),
      source: 'NexOperandi Website Chatbot Enhanced',
    };

    console.log('🔄 Forwarding to n8n enhanced chatbot workflow:', N8N_CHATBOT_URL);

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
    console.log('✅ Enhanced chatbot message processed successfully');
    console.log('📊 Lead Intelligence:', result.leadIntelligence);

    // Return enhanced AI response
    return NextResponse.json({
      success: true,
      response: result.response,
      sessionId: result.sessionId,
      timestamp: result.timestamp,
      leadIntelligence: result.leadIntelligence,
      suggestedAction: result.suggestedAction,
      callToAction: result.callToAction,
      requestContactInfo: result.requestContactInfo,
      analytics: result.analytics,
      userData: result.userData
    });

  } catch (error) {
    console.error('❌ Enhanced chatbot error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process chat message',
        message: error instanceof Error ? error.message : 'Unknown error',
        hint: 'Make sure n8n enhanced chatbot workflow is active at: ' + N8N_CHATBOT_URL
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'Enhanced AI Chatbot API',
    version: '2.0.0',
    features: [
      'Lead Scoring (0-100)',
      'Contact Info Capture',
      'Knowledge Base Integration',
      'Smart Call-to-Actions',
      'Intent Detection (7 types)',
      'Sentiment Analysis',
      'Hot Lead Alerts'
    ],
    configured: !!N8N_CHATBOT_URL,
    timestamp: new Date().toISOString()
  });
}

/**
 * Demo response generator for when webhook is not configured
 */
function getDemoResponse(message: string, hasContactInfo: boolean): string {
  const lowerMessage = message.toLowerCase();

  // Pricing inquiry
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
    return "Great question! Our AI automation solutions start at $500 USD for single agent implementations. However, we believe every business deserves a tailored solution.\n\nHere's how we work:\n1️⃣ Free consultation - We analyze your needs\n2️⃣ Custom proposal - Best price/value for YOU\n3️⃣ Fast delivery - Results quickly\n\nWould you like to schedule a free consultation?";
  }

  // Services inquiry
  if (lowerMessage.includes('service') || lowerMessage.includes('what do you') || lowerMessage.includes('what can you')) {
    return "We specialize in AI automation for serious businesses! Our services include:\n\n✅ AI Agents & Chatbots (like this one!)\n✅ Workflow Automation with n8n\n✅ Lead Generation & Qualification\n✅ Customer Service Automation\n✅ Custom AI Solutions\n\nWhich area interests you most?";
  }

  // Booking/consultation
  if (lowerMessage.includes('book') || lowerMessage.includes('consultation') || lowerMessage.includes('call') || lowerMessage.includes('meeting')) {
    return "Excellent! I'd love to connect you with our team for a free consultation. We'll analyze your needs and show you exactly what's possible.\n\nTo get started, I'll need your contact information. What's the best email to reach you?";
  }

  // General/default
  return `I'm here to help! ${hasContactInfo ? "Let me know" : "Tell me more about"} what you're looking for:\n\n• AI automation solutions?\n• Pricing information?\n• Schedule a consultation?\n• Technical questions?\n\nFeel free to ask anything!`;
}
