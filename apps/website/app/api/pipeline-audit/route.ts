import { NextRequest, NextResponse } from 'next/server';

/**
 * Pipeline Audit Form API Route
 * Handles submissions from the pipeline audit lead magnet page.
 * Sends data to n8n for processing via webhook.
 */

interface PipelineAuditPayload {
  company: string;
  industry: string;
  leadVolume?: string;
  challenge: string;
  name: string;
  email: string;
  phone?: string;
  lang?: string;
}

const N8N_PIPELINE_AUDIT_WEBHOOK_URL = process.env.N8N_PIPELINE_AUDIT_WEBHOOK_URL || '';

export async function POST(request: NextRequest) {
  try {
    const body: PipelineAuditPayload = await request.json();
    const { company, industry, leadVolume, challenge, name, email, phone, lang } = body;

    // Validate required fields
    if (!company || !industry || !challenge || !name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
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
    if (!N8N_PIPELINE_AUDIT_WEBHOOK_URL) {
      return NextResponse.json({
        success: true,
        message: 'Pipeline audit request received (webhook not configured)',
        note: 'Configure N8N_PIPELINE_AUDIT_WEBHOOK_URL to enable processing',
      });
    }

    // Prepare payload for n8n
    const payload = {
      company,
      industry,
      leadVolume: leadVolume || 'Not specified',
      challenge,
      name,
      email,
      phone: phone || 'Not provided',
      lang: lang || 'en',
      timestamp: new Date().toISOString(),
      source: 'NexOperandi Website - Pipeline Audit',
    };

    // Send to n8n
    const response = await fetch(N8N_PIPELINE_AUDIT_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`n8n webhook failed: ${response.status} - ${errorText}`);
    }

    return NextResponse.json({
      success: true,
      message: 'Pipeline audit request submitted successfully.',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit pipeline audit request',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
