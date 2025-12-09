import { NextRequest, NextResponse } from 'next/server';

/**
 * Visitor Intelligence API Route
 * Forwards visitor tracking data to n8n workflow
 *
 * Performance: Uses AbortController with 5s timeout to prevent
 * slow n8n responses from blocking resources
 */

const N8N_WEBHOOK_URL = process.env.N8N_VISITOR_INTEL_URL || 'https://n8n.srv1108737.hstgr.cloud/webhook/visitor-intel';

// Temporary: Enable test mode for debugging
const TEST_MODE = process.env.VISITOR_INTEL_TEST_MODE === 'true';

// Timeout for n8n webhook (5 seconds) - prevents resource blocking
const WEBHOOK_TIMEOUT_MS = 5000;

export async function POST(request: NextRequest) {
  try {
    // Parse incoming visitor data
    const data = await request.json();

    // Minimal logging in production for performance
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Visitor Intelligence - Received data:', {
        url: data.url,
        timeOnPage: data.timeOnPage,
        device: data.device,
        timestamp: new Date().toISOString()
      });
    }

    // TEST MODE: Return mock response without calling n8n
    if (TEST_MODE) {
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

    // PRODUCTION MODE: Forward to n8n workflow with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ n8n webhook error:', response.status);
        throw new Error(`n8n webhook failed: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      return NextResponse.json(result, { status: 200 });

    } catch (fetchError) {
      clearTimeout(timeoutId);

      // Handle timeout specifically
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.warn('⏱️ n8n webhook timeout after', WEBHOOK_TIMEOUT_MS, 'ms');
        // Return success anyway - don't block user experience for analytics
        return NextResponse.json({
          success: true,
          timeout: true,
          message: 'Visitor data queued (webhook timeout)',
        }, { status: 200 });
      }

      throw fetchError;
    }

  } catch (error) {
    console.error('❌ Visitor Intelligence Error:', error instanceof Error ? error.message : 'Unknown');

    // Return success anyway to not affect client-side metrics
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process visitor data',
      },
      { status: 200 } // Return 200 to prevent client retries
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
