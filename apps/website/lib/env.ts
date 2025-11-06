/**
 * Environment Variable Validation
 * Validates required environment variables at build/runtime
 */

const requiredEnvVars = {
  server: [
    'N8N_WEBHOOK_URL',
    'N8N_VISITOR_INTEL_URL',
    'N8N_CHATBOT_URL',
  ],
  client: [
    'NEXT_PUBLIC_SITE_URL',
  ],
} as const;

export function validateEnv() {
  const missing: string[] = [];

  // Validate server-side env vars
  if (typeof window === 'undefined') {
    requiredEnvVars.server.forEach((varName) => {
      if (!process.env[varName]) {
        missing.push(varName);
      }
    });
  }

  // Validate client-side env vars
  requiredEnvVars.client.forEach((varName) => {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  });

  if (missing.length > 0) {
    console.warn(
      '⚠️  Missing environment variables:',
      missing.join(', '),
      '\nSome features may not work correctly. Check your .env.local file.'
    );
  }

  return missing.length === 0;
}

// Auto-validate in development
if (process.env.NODE_ENV === 'development') {
  validateEnv();
}
