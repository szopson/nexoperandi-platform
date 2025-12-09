# Environment Variables Reference

> Required environment variables for NexOperandi platform

## Apps/Website (`apps/website/.env.local`)

```bash
# Base URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# n8n Integration
N8N_WEBHOOK_URL=https://your-n8n.com/webhook
N8N_API_KEY=your-api-key
N8N_BASE_URL=https://your-n8n.com

# Analytics (optional)
NEXT_PUBLIC_ANALYTICS_ID=

# Feature flags (optional)
NEXT_PUBLIC_ENABLE_VOICE_DEMO=false
NEXT_PUBLIC_ENABLE_CHAT_DEMO=false
```

## Apps/Admin (`apps/admin/.env.local`)

```bash
# Base URL
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXTAUTH_URL=http://localhost:3001

# Auth
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32

# Database
DATABASE_URL=postgresql://user:pass@host:5432/db

# Supabase (alternative to direct PostgreSQL)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# n8n Integration
N8N_API_KEY=your-api-key
N8N_BASE_URL=https://your-n8n.com
```

## Packages/Voice Engine (`packages/voice-engine/.env`)

```bash
# ElevenLabs
ELEVENLABS_API_KEY=xxx

# OpenAI (for Realtime API)
OPENAI_API_KEY=xxx
```

## Production Environment (Vercel)

Set these in Vercel dashboard → Project → Settings → Environment Variables:

### Website
```
NEXT_PUBLIC_APP_URL=https://nexoperandi.cloud
N8N_WEBHOOK_URL=https://n8n.nexoperandi.cloud/webhook
N8N_API_KEY=***
```

### Admin
```
NEXT_PUBLIC_APP_URL=https://admin.nexoperandi.cloud
NEXTAUTH_URL=https://admin.nexoperandi.cloud
NEXTAUTH_SECRET=***
DATABASE_URL=***
N8N_API_KEY=***
N8N_BASE_URL=https://n8n.nexoperandi.cloud
```

---

## n8n Instance

### Hostinger VPS
```bash
# Docker environment
N8N_HOST=n8n.nexoperandi.cloud
N8N_PORT=5678
N8N_PROTOCOL=https

# Database
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=localhost
DB_POSTGRESDB_PORT=5432
DB_POSTGRESDB_DATABASE=n8n
DB_POSTGRESDB_USER=n8n
DB_POSTGRESDB_PASSWORD=***

# Execution
EXECUTIONS_MODE=regular
GENERIC_TIMEZONE=Europe/Warsaw

# Webhooks
WEBHOOK_URL=https://n8n.nexoperandi.cloud/
N8N_EDITOR_BASE_URL=https://n8n.nexoperandi.cloud/
```

---

## Generating Secrets

```bash
# NextAuth secret
openssl rand -base64 32

# Generic API key
openssl rand -hex 32
```

---

## Local Development Setup

1. Copy example env files:
```bash
cp apps/website/.env.example apps/website/.env.local
cp apps/admin/.env.example apps/admin/.env.local
```

2. Fill in required values (minimum for local dev):
```bash
# Website - can run without n8n for basic dev
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Admin - needs auth secret
NEXTAUTH_SECRET=dev-secret-change-in-prod
NEXTAUTH_URL=http://localhost:3001
```

3. Optional: Set up local n8n for webhook testing
```bash
docker run -d --name n8n -p 5678:5678 n8nio/n8n
```

---

## Validation

Check if required env vars are set:

```typescript
// lib/env.ts
const requiredEnvVars = [
  'N8N_WEBHOOK_URL',
  'N8N_API_KEY',
] as const

export function validateEnv() {
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required env var: ${envVar}`)
    }
  }
}
```
