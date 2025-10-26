import { NextRequest, NextResponse } from 'next/server';

/**
 * Visitor Intelligence API Route
 * Forwards visitor tracking data to n8n workflow
 */

const N8N_WEBHOOK_URL = process.env.N8N_VISITOR_INTEL_URL || 'http://piotr108.mikrus.xyz:40233/webhook/visitor-intel';

export async function POST(request: NextRequest) {
  try {
    // Parse incoming visitor data
    const data = await request.json();

    // Forward to n8n workflow
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`n8n webhook failed: ${response.status}`);
    }

    const result = await response.json();

    // Return success with intelligence data
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('Visitor Intelligence Error:', error);

    // Return error but don't break user experience
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process visitor data',
        message: error instanceof Error ? error.message : 'Unknown error'
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
