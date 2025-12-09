# NexOperandi Commands

> Quick actions for common development tasks

## Development

| Command | Action |
|---------|--------|
| `/dev start` | Start development server |
| `/dev build` | Build for production |
| `/dev check` | Run typecheck + lint |
| `/dev test` | Run tests |

## Pages & Components

| Command | Action |
|---------|--------|
| `/page new <name>` | Create new page with boilerplate |
| `/page update <name>` | Modify existing page |
| `/component new <name>` | Create new component |
| `/component list` | List shared components in packages/ui |

## Content & Copy

| Command | Action |
|---------|--------|
| `/copy hero` | Write hero section copy |
| `/copy service <name>` | Write service description |
| `/copy cta` | Generate CTA variations |
| `/copy review` | Review and improve existing copy |

## Design & Visual

| Command | Action |
|---------|--------|
| `/design section <name>` | Design new section layout |
| `/design improve <section>` | Suggest improvements |
| `/image prompt <concept>` | Generate AI image prompt |
| `/image hero` | Create hero image prompt |

## Services & Offers

| Command | Action |
|---------|--------|
| `/offer list` | Show current service offerings |
| `/offer add <service>` | Define new service |
| `/offer update <service>` | Modify existing service |
| `/offer pricing` | Review/update pricing |

## n8n Integration

| Command | Action |
|---------|--------|
| `/n8n webhook <name>` | Create webhook integration |
| `/n8n flow <description>` | Design workflow |
| `/n8n validate` | Check n8n connections |

## Research

| Command | Action |
|---------|--------|
| `/research competitor <name>` | Analyze competitor |
| `/research market <topic>` | Market research |
| `/research tech <topic>` | Technical research |

## Documentation

| Command | Action |
|---------|--------|
| `/docs update <file>` | Update documentation |
| `/docs api <endpoint>` | Document API endpoint |
| `/docs component <name>` | Document component |

---

## Command Details

### `/page new <name>`

Creates a new page with:
- Route file (`app/<name>/page.tsx`)
- Metadata configuration
- Basic layout structure
- TypeScript types if needed

Example:
```
/page new case-studies
```

### `/component new <name>`

Creates a component with:
- Component file with TypeScript props
- Proper exports
- Basic styling with Tailwind
- Placed in appropriate location (page-specific or packages/ui)

Example:
```
/component new TestimonialCard
```

### `/copy service <name>`

Generates service description including:
- Headline
- Value proposition (2-3 sentences)
- Key features (3-5 bullets)
- Ideal for (target audience)
- CTA

Example:
```
/copy service voice-agents
```

### `/offer add <service>`

Defines new service with:
- Name and category
- Description
- Deliverables
- Timeline estimate
- Price range
- Prerequisites

Example:
```
/offer add lead-qualification-bot
```

### `/image prompt <concept>`

Generates AI image prompt following brand guidelines:
- Dark theme base
- Electric blue accents
- Tech/abstract aesthetic
- Proper aspect ratio
- Quality tags

Example:
```
/image prompt workflow automation visualization
```

---

## Compound Commands

### `/launch new-service`
Combination that:
1. Defines service offering (`/offer add`)
2. Creates service page (`/page new`)
3. Writes copy (`/copy service`)
4. Generates visuals (`/image prompt`)
5. Adds to navigation

### `/improve section <name>`
Combination that:
1. Analyzes current implementation
2. Reviews copy for improvements
3. Suggests design enhancements
4. Checks mobile responsiveness
5. Proposes A/B test variants
