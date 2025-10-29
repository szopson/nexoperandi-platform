import { NextRequest, NextResponse } from 'next/server';

/**
 * Contact Form API Route with AI Lead Qualification
 * Sends contact submissions to n8n for AI analysis, scoring, and email notification
 */

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, website, message } = body;

    console.log('📨 Contact Form - Received submission:', {
      name,
      email,
      hasWebsite: !!website,
      messageLength: message?.length || 0,
      timestamp: new Date().toISOString()
    });

    // Validate required fields
    if (!name || !email || !message) {
      console.error('❌ Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('❌ Invalid email format:', email);
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if webhook is configured
    if (!N8N_WEBHOOK_URL) {
      console.error('⚠️  N8N_WEBHOOK_URL is not configured');
      console.log('💡 Add N8N_WEBHOOK_URL to .env.local to enable AI lead qualification');

      // Return success anyway (for development/testing)
      return NextResponse.json({
        success: true,
        message: 'Form submitted successfully (webhook not configured)',
        note: 'Configure N8N_WEBHOOK_URL to enable AI lead qualification'
      });
    }

    // Prepare data for n8n workflow
    const payload = {
      name,
      email,
      website: website || 'Not provided',
      message,
      timestamp: new Date().toISOString(),
      source: 'NexOperandi Website',
    };

    console.log('🔄 Forwarding to n8n webhook:', N8N_WEBHOOK_URL);

    // Send to n8n for AI qualification
    const response = await fetch(N8N_WEBHOOK_URL, {
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

    // Try to parse JSON response, but handle empty responses
    let result: any = null;
    const responseText = await response.text();

    if (responseText) {
      try {
        result = JSON.parse(responseText);
        console.log('✅ Contact form processed successfully with response:', result);
      } catch (parseError) {
        console.log('⚠️  n8n returned non-JSON response:', responseText);
      }
    } else {
      console.log('✅ Contact form processed successfully (empty response from n8n)');
    }

    // Return success with lead info (if available)
    return NextResponse.json({
      success: true,
      message: 'Thank you! We\'ve received your message and will get back to you soon.',
      ...(result?.lead && { lead: result.lead }) // Include lead score if returned
    });

  } catch (error) {
    console.error('❌ Contact form error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit form',
        message: error instanceof Error ? error.message : 'Unknown error',
        hint: 'Make sure n8n workflow is active at: ' + N8N_WEBHOOK_URL
      },
      { status: 500 }
    );
  }
}
