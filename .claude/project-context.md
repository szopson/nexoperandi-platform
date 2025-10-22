# NexOperandi Platform - Project Context

## Overview
NexOperandi Platform is a comprehensive AI agent platform that combines:
- **Marketing Website**: Public-facing site showcasing our AI automation services
- **Agent Platform**: Live demos and interactive AI agents (voice, chat, workflow builders)
- **Admin Dashboard**: Internal tools for managing agents, workflows, and analytics
- **n8n Integration**: Deep integration with n8n for workflow automation

## Architecture

### Monorepo Structure
We use Turborepo + pnpm workspaces for optimal build performance and code sharing.

```
nexoperandi-platform/
├── apps/
│   ├── website/        # Next.js marketing site + agent demos
│   └── admin/          # Next.js admin dashboard
├── packages/
│   ├── agent-core/     # Shared agent logic & types
│   ├── n8n-client/     # n8n API wrapper & workflow tools
│   ├── voice-engine/   # Voice agent capabilities
│   └── ui/             # Shared React components (shadcn/ui)
└── integrations/
    ├── lead-capture/   # CRM & lead gen workflows
    └── analytics/      # Usage tracking workflows
```

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.x (strict mode)
- **Styling**: Tailwind CSS 4.x
- **Components**: shadcn/ui
- **Automation**: n8n (with MCP servers)
- **Package Manager**: pnpm
- **Build Tool**: Turborepo

## Brand Identity

### Company: NexOperandi.ai
**Tagline**: "AI automation for serious businesses"
**Positioning**: End-to-end AI automation - from MVP to scale

### Core Values
1. **Results-Driven**: We sell growth, not AI buzzwords
2. **Fast Execution**: MVP in weeks, not months
3. **Proven ROI**: 90-day guarantee
4. **End-to-End**: From design to deployment

### Visual Style
- **Colors**: Blue (#2563eb), Black, White (minimalist)
- **Typography**: Inter (modern, clean)
- **Design**: Minimalist, bold, confidence-inspiring

## n8n Integration Strategy

### MCP Servers Configured
1. **n8n-mcp-production**: Production workflow server
2. **context7 Docs**: Documentation access
3. **sequential-thinking**: AI reasoning
4. **n8n-workflows Docs**: Workflow examples
5. **n8n-mcp Docs**: n8n API documentation

### Workflow Organization
```
integrations/
├── lead-capture/
│   └── workflows/
│       ├── form-submission.json          # Contact form handler
│       ├── lead-qualification.json       # AI qualification
│       └── crm-sync.json                 # CRM integration
└── analytics/
    └── workflows/
        ├── usage-tracking.json
        └── conversion-analytics.json
```

## Development Workflow

### Commands
```bash
# Install dependencies
pnpm install

# Development (all apps)
pnpm dev

# Development (specific app)
pnpm --filter website dev
pnpm --filter admin dev

# Build everything
pnpm build

# Type checking
pnpm typecheck

# Linting
pnpm lint
```

### Package Dependencies
Packages can depend on each other:
- `website` depends on `@nexoperandi/agent-core`, `@nexoperandi/ui`, `@nexoperandi/n8n-client`
- `admin` depends on `@nexoperandi/agent-core`, `@nexoperandi/ui`, `@nexoperandi/n8n-client`
- `agent-core` is standalone
- `n8n-client` is standalone
- `voice-engine` may depend on `agent-core`

## Key Features

### Website (apps/website)
- **Marketing Pages**: Homepage, About, Services, Case Studies
- **Agent Demos**: Interactive live demos of AI agents
- **Contact Form**: Integrated with n8n lead qualification workflow
- **SEO Optimized**: Fast loading, semantic HTML, meta tags

### Admin Dashboard (apps/admin)
- **Agent Management**: Create, configure, and monitor agents
- **Workflow Dashboard**: Visualize and manage n8n workflows
- **Analytics**: Track usage, conversions, ROI
- **Team Collaboration**: Multi-user support

### Agent Platform (packages/agent-core)
- **Base Agent Class**: Foundation for all agents
- **Agent Types**: Voice, Chat, Workflow, Custom
- **State Management**: Conversation context & memory
- **Integration Hooks**: Connect to n8n, CRMs, databases

### n8n Client (packages/n8n-client)
- **API Wrapper**: Type-safe n8n API client
- **Workflow Templates**: Pre-built workflows for common tasks
- **Node Helpers**: Utilities for building workflows programmatically
- **Validation**: Workflow validation before deployment

### Voice Engine (packages/voice-engine)
- **Providers**: ElevenLabs, OpenAI Realtime API, Deepgram
- **Transcription**: Real-time speech-to-text
- **Synthesis**: Text-to-speech with emotion control
- **WebRTC**: Real-time voice streaming

## Migration from AAA-Website

### Preserved Content
- ✅ Brand guide → `docs/brand-guide.md`
- ✅ Design tokens → `docs/design-tokens.md`
- ✅ n8n integration guide → `docs/n8n-integration-guide.md`
- ✅ Homepage copy → Converted to Next.js components
- ✅ Logo and assets → `public/assets/`

### Modernization
- ✅ Static HTML → Next.js App Router
- ✅ Inline styles → Tailwind CSS
- ✅ Single file → Modular components
- ✅ No framework → TypeScript + React
- ✅ Manual deployment → CI/CD ready

## Next Steps

### Phase 1: Foundation (Current)
- [x] Monorepo structure
- [x] Configuration files
- [x] n8n expert instructions
- [ ] Next.js website migration
- [ ] Package scaffolding

### Phase 2: Core Packages
- [ ] `agent-core` implementation
- [ ] `n8n-client` implementation
- [ ] Shared `ui` components
- [ ] TypeScript configs

### Phase 3: Applications
- [ ] Website with agent demos
- [ ] Admin dashboard
- [ ] Authentication & authorization

### Phase 4: Advanced Features
- [ ] Voice engine
- [ ] Live agent demos
- [ ] Analytics integration
- [ ] Deployment pipelines

## Important Notes

### n8n Workflows
- Always use the n8n-MCP tools for workflow creation
- Follow the n8n expert instructions in `.claude/n8n-agent-expert.md`
- Template-first approach: Check 2,500+ templates before building
- Never trust defaults: Explicitly configure ALL parameters
- Multi-level validation: Quick → Comprehensive → Complete

### Code Style
- Use TypeScript strict mode
- Follow Next.js App Router patterns
- Prefer server components over client components
- Use shadcn/ui for UI components
- Keep packages small and focused

### Deployment
- **Website**: Vercel (recommended for Next.js)
- **Admin**: Vercel or separate deployment
- **n8n**: Self-hosted or n8n cloud
- **Database**: PostgreSQL (recommended)

---

For detailed n8n workflow guidance, see `.claude/n8n-agent-expert.md`
