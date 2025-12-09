# Claude Instructions for NexOperandi Platform

> Place this file at `.claude/CLAUDE.md` - Claude reads this automatically when working on the repo.

## Project Overview

**NexOperandi** is an AI automation agency platform with:
- Marketing website (Next.js)
- Admin dashboard
- Live agent demos
- n8n workflow integrations

**Mission:** AI automation for serious businesses — ideas into profits, faster.

**Tech Stack:**
- Next.js 15 (App Router)
- TypeScript 5.x (strict mode)
- Tailwind CSS 4.x
- shadcn/ui components
- Turborepo + pnpm workspaces
- n8n for workflow automation

## Quick Reference

| Need | File |
|------|------|
| Agents (@architect, @webdev, etc.) | `.claude/agents.md` |
| Subagents (voice-analyzer, etc.) | `.claude/subagents.md` |
| Commands (/page, /offer, etc.) | `.claude/commands.md` |
| Code patterns & snippets | `.claude/skills.md` |
| Implementation status | `.claude/STATUS.md` |
| Environment variables | `.claude/env-reference.md` |
| Brand voice & messaging | `docs/brand-guide.md` |
| Colors, typography, spacing | `docs/design-tokens.md` |
| n8n workflow guidelines | `.claude/n8n-agent-expert.md` |

## Repository Structure

```
apps/
  website/          # Marketing site + demos
  admin/            # Dashboard
packages/
  agent-core/       # Base agent logic
  n8n-client/       # n8n API wrapper
  voice-engine/     # Voice capabilities
  ui/               # Shared components
  tsconfig/         # Shared TS configs
docs/               # Brand, design, guides
.claude/            # Claude-specific instructions
```

## Development Commands

```bash
pnpm install              # Install dependencies
pnpm dev                  # Start all apps
pnpm --filter website dev # Start website only
pnpm --filter admin dev   # Start admin only
pnpm build                # Build everything
pnpm typecheck            # Type check
```

## Code Style Guidelines

### TypeScript
- Strict mode always
- Explicit return types for functions
- Use `interface` for object shapes, `type` for unions/intersections
- Prefer `const` over `let`
- No `any` — use `unknown` if type is truly unknown

### React/Next.js
- Functional components only
- Server Components by default, `'use client'` only when needed
- Colocate page-specific components with their pages
- Shared components go in `packages/ui`

### Tailwind
- Use design tokens from `docs/design-tokens.md`
- Dark theme is primary
- Mobile-first responsive design
- Use `cn()` utility for conditional classes

### File Naming
- Components: PascalCase (`AgentCard.tsx`)
- Utilities: camelCase (`formatDate.ts`)
- Pages/routes: lowercase with dashes (`agent-demos/`)
- Types: PascalCase with `.types.ts` suffix

## Working With Claude

### Before Starting Work
1. Check `.claude/STATUS.md` for current implementation state
2. Review relevant docs (brand, design, skills)
3. Follow existing patterns in codebase

### When Making Changes
1. Update types if changing data structures
2. Test locally before committing
3. Update `.claude/STATUS.md` if completing features
4. Update docs if adding new patterns

### When Designing Features
1. Start with user outcome
2. Check `packages/ui` for existing components
3. Maintain consistency with current design
4. Think mobile-first
5. Document new patterns

### When Debugging
1. Check TypeScript errors first
2. Verify environment variables (see `env-reference.md`)
3. Test in isolation
4. Check n8n webhook connectivity if relevant

## Agent Activation

Activate specialized modes with `@agent` or "act as [agent]":

- `@architect` — n8n workflows, system design
- `@webdev` — website/platform development
- `@content` — copy, marketing content
- `@visual` — design, image prompts
- `@product` — service offerings, pricing
- `@sales` — proposals, ROI, client comms
- `@qa` — debugging, testing, validation
- `@research` — market research, competitor analysis

See `.claude/agents.md` for full details.

## Subagents

Focused helpers for specific tasks:

- `voice-analyzer` — extract writing style from samples
- `competitor-scan` — quick competitive analysis
- `prompt-optimizer` — improve AI prompts
- `lead-scorer` — evaluate lead quality
- `client-profiler` — research client before engagement
- `offer-reviewer` — audit service offerings
- `storyboard-maker` — video scene planning
- `copy-improver` — enhance existing copy
- `code-reviewer` — review code quality

See `.claude/subagents.md` for full details.

## Quick Commands

```
/dev start|build|check     — Development tasks
/page new|update <n>       — Page operations
/component new <n>         — Create component
/copy hero|service|cta     — Generate copy
/design section|improve    — Design tasks
/offer list|add|update     — Service offerings
/n8n webhook|flow|validate — n8n integration
/status                    — Show implementation status
```

See `.claude/commands.md` for full details.

## Brand Summary

- **Voice:** Professional but not corporate, technical but accessible, outcome-focused
- **Visual:** Dark theme (#0a0a0a), electric blue (#3b82f6), minimal, tech-forward
- **Messaging:** "AI automation for serious businesses" / "Ideas into profits. Faster."

See `docs/brand-guide.md` for full guidelines.

## Key Patterns

### Dark Theme Card
```tsx
<div className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-blue-500/30 transition-all">
```

### Gradient Text
```tsx
<h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
```

### n8n Webhook Integration
```tsx
await fetch(process.env.N8N_WEBHOOK_URL!, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
})
```

See `.claude/skills.md` for more patterns.
