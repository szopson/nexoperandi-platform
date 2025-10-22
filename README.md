# NexOperandi Platform

> **AI automation for serious businesses** - From MVP to scale, powered by n8n workflows

A comprehensive AI agent platform combining a marketing website, live agent demos, and admin dashboard in a high-performance monorepo.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development servers (all apps)
pnpm dev

# Start specific app
pnpm --filter website dev
pnpm --filter admin dev

# Build everything
pnpm build

# Type check
pnpm typecheck
```

## 📁 Project Structure

```
nexoperandi-platform/
├── apps/
│   ├── website/                 # Next.js marketing site + agent demos
│   │   ├── app/
│   │   │   ├── (marketing)/    # Marketing pages
│   │   │   ├── demos/          # Live agent demos
│   │   │   └── api/            # API routes & webhooks
│   │   └── components/
│   └── admin/                   # Admin dashboard
│       ├── app/
│       │   ├── dashboard/
│       │   ├── agents/         # Agent management
│       │   ├── workflows/      # n8n workflow UI
│       │   └── analytics/
│       └── components/
├── packages/
│   ├── agent-core/             # Core agent logic & types
│   ├── n8n-client/             # n8n API wrapper & tools
│   ├── voice-engine/           # Voice agent capabilities
│   ├── ui/                     # Shared React components
│   └── tsconfig/               # Shared TypeScript configs
├── integrations/
│   ├── lead-capture/           # CRM & lead gen workflows
│   └── analytics/              # Usage tracking workflows
└── docs/                       # Documentation
```

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.x (strict mode)
- **Styling**: Tailwind CSS 4.x
- **Components**: shadcn/ui
- **Automation**: n8n with MCP servers
- **Monorepo**: Turborepo + pnpm workspaces
- **Voice**: ElevenLabs, OpenAI Realtime API

## 🤖 AI Agent Platform

### Agent Types
- **Voice Agents**: Customer support, sales calls, phone automation
- **Chat Agents**: Website widgets, Slack bots, support chat
- **Workflow Agents**: Custom automation pipelines

### n8n Integration
Deep integration with n8n for workflow automation:
- 5 MCP servers configured (n8n-mcp-production, context7, sequential-thinking, etc.)
- Pre-built workflow templates
- Type-safe n8n API client
- Workflow validation and testing tools

See `.claude/n8n-agent-expert.md` for detailed n8n workflow guidelines.

## 📦 Packages

### `@nexoperandi/agent-core`
Base agent classes, types, and utilities for building AI agents.

```typescript
import { BaseAgent } from '@nexoperandi/agent-core';

class CustomAgent extends BaseAgent {
  async process(input: string): Promise<string> {
    // Your agent logic
  }
}
```

### `@nexoperandi/n8n-client`
Type-safe wrapper for n8n API with workflow helpers.

```typescript
import { N8nClient } from '@nexoperandi/n8n-client';

const client = new N8nClient({ apiKey: process.env.N8N_API_KEY });
await client.triggerWorkflow('lead-qualification', { email, name });
```

### `@nexoperandi/voice-engine`
Voice capabilities with multiple provider support.

```typescript
import { VoiceEngine } from '@nexoperandi/voice-engine';

const engine = new VoiceEngine({ provider: 'elevenlabs' });
await engine.synthesize('Hello, how can I help you?');
```

### `@nexoperandi/ui`
Shared React components built with shadcn/ui.

```typescript
import { Button, Card, Input } from '@nexoperandi/ui';
```

## 🌐 Applications

### Website (`apps/website`)
- Marketing pages (homepage, about, services)
- Live agent demos (voice, chat, workflow builder)
- Contact form with n8n integration
- SEO optimized, fast loading

**Dev**: `pnpm --filter website dev`
**Build**: `pnpm --filter website build`

### Admin Dashboard (`apps/admin`)
- Agent management interface
- n8n workflow visualization
- Analytics and usage tracking
- Team collaboration tools

**Dev**: `pnpm --filter admin dev`
**Build**: `pnpm --filter admin build`

## 🔧 Development

### Prerequisites
- Node.js >=18.0.0
- pnpm >=8.0.0

### Environment Variables
Create `.env.local` in each app:

```env
# apps/website/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/...

# apps/admin/.env.local
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3001
DATABASE_URL=postgresql://...
N8N_API_KEY=your-api-key
```

### Adding a New Package

```bash
# Create package structure
mkdir -p packages/my-package/src
cd packages/my-package

# Create package.json
pnpm init

# Add to workspace
# (automatically picked up by pnpm-workspace.yaml)
```

### Adding Dependencies

```bash
# Add to specific package
pnpm --filter website add axios

# Add to workspace root (dev dependencies)
pnpm add -D -w eslint

# Add shared package to app
pnpm --filter website add @nexoperandi/agent-core
```

## 🚢 Deployment

### Vercel (Recommended for Next.js apps)
1. Connect GitHub repository to Vercel
2. Configure build settings:
   - **Framework**: Next.js
   - **Root Directory**: `apps/website` or `apps/admin`
   - **Build Command**: `cd ../.. && pnpm run build --filter=website`
   - **Install Command**: `cd ../.. && pnpm install`

### Environment Variables
Set in Vercel dashboard or deployment platform:
- `N8N_API_KEY`
- `N8N_WEBHOOK_URL`
- `DATABASE_URL`
- `NEXTAUTH_SECRET`

## 📚 Documentation

- [Brand Guide](./docs/brand-guide.md) - Brand identity and messaging
- [Design Tokens](./docs/design-tokens.md) - Colors, typography, spacing
- [n8n Integration Guide](./docs/n8n-integration-guide.md) - Workflow integration
- [Project Context](./.claude/project-context.md) - Architecture and development guide
- [n8n Expert Instructions](./.claude/n8n-agent-expert.md) - Workflow creation guidelines

## 🎯 Roadmap

### Phase 1: Foundation ✅
- [x] Monorepo structure
- [x] Configuration files
- [x] Documentation setup

### Phase 2: Core Packages (In Progress)
- [ ] `agent-core` implementation
- [ ] `n8n-client` implementation
- [ ] `ui` component library
- [ ] TypeScript configs

### Phase 3: Website
- [ ] Next.js migration from HTML
- [ ] Agent demo pages
- [ ] Contact form with n8n
- [ ] SEO optimization

### Phase 4: Admin Dashboard
- [ ] Authentication
- [ ] Agent management UI
- [ ] Workflow dashboard
- [ ] Analytics integration

### Phase 5: Advanced Features
- [ ] Voice engine implementation
- [ ] Real-time agent demos
- [ ] Advanced analytics
- [ ] CI/CD pipelines

## 🤝 Contributing

This is a private project. For questions or issues, contact the team.

## 📄 License

ISC

---

**NexOperandi.ai** - Ideas into profits. Faster.
