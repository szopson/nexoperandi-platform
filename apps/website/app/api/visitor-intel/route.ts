import { NextRequest, NextResponse } from 'next/server';

/**
 * Visitor Intelligence API Route
 * Forwards visitor tracking data to n8n workflow
 */

const N8N_WEBHOOK_URL = process.env.N8N_VISITOR_INTEL_URL || 'https://piotr108-20108.wykr.es/webhook-test/visitor-intel';

// Temporary: Enable test mode for debugging
const TEST_MODE = process.env.VISITOR_INTEL_TEST_MODE === 'true';

export async function POST(request: NextRequest) {
  try {
    // Parse incoming visitor data
    const data = await request.json();

    console.log('📊 Visitor Intelligence - Received data:', {
      url: data.url,
      timeOnPage: data.timeOnPage,
      device: data.device,
      timestamp: new Date().toISOString()
    });

    // TEST MODE: Return mock response without calling n8n
    if (TEST_MODE) {
      console.log('🧪 TEST MODE: Skipping n8n webhook, returning mock data');
      return NextResponse.json({
        success: true,
        test_mode: true,
        message: 'Test mode - data logged but not sent to n8n',
        visitor: {
          url: data.url,
          timeOnPage: data.timeOnPage,
          device: data.device
        },
        intelligence: {
          score: 45,
          category: 'Warm',
          action: 'engage_email',
          insight: 'Test visitor - n8n not called'
        }
      }, { status: 200 });
    }

    // PRODUCTION MODE: Forward to n8n workflow
    console.log('🔄 Forwarding to n8n webhook:', N8N_WEBHOOK_URL);

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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
    console.log('✅ n8n webhook success');

    // Return success with intelligence data
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('❌ Visitor Intelligence Error:', error);

    // Return error but don't break user experience
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process visitor data',
        message: error instanceof Error ? error.message : 'Unknown error',
        hint: 'Make sure n8n workflow is active at: ' + N8N_WEBHOOK_URL
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
