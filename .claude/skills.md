# NexOperandi Skills Reference

> Technical patterns, code snippets, and best practices for development

## Next.js Patterns

### Server Component (Default)
```tsx
// app/services/page.tsx
import { ServiceCard } from '@/components/ServiceCard'

export default async function ServicesPage() {
  const services = await getServices() // Server-side fetch
  
  return (
    <main className="container py-20">
      <h1 className="text-4xl font-bold mb-12">Our Services</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {services.map(service => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>
    </main>
  )
}
```

### Client Component (When Needed)
```tsx
'use client'

import { useState } from 'react'
import { Button } from '@nexoperandi/ui'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    // ... form logic
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
```

### API Route with n8n Webhook
```tsx
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  // Trigger n8n workflow
  const response = await fetch(process.env.N8N_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  
  if (!response.ok) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
  
  return NextResponse.json({ success: true })
}
```

---

## Component Patterns

### Card Component (shadcn/ui style)
```tsx
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  className?: string
}

export function ServiceCard({ 
  title, 
  description, 
  icon,
  className 
}: ServiceCardProps) {
  return (
    <div className={cn(
      "p-6 rounded-xl border border-white/10",
      "bg-gradient-to-b from-white/5 to-transparent",
      "hover:border-blue-500/50 transition-colors",
      className
    )}>
      <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}
```

### Section Layout
```tsx
interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-32", className)}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  )
}
```

### Animated Element (Framer Motion)
```tsx
'use client'

import { motion } from 'framer-motion'

export function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
```

---

## Tailwind Patterns

### Dark Theme Card
```html
<div class="
  bg-gray-900/50 
  border border-white/10 
  rounded-2xl 
  p-8
  backdrop-blur-sm
  hover:border-blue-500/30 
  transition-all
">
```

### Gradient Text
```html
<h1 class="
  text-4xl md:text-6xl font-bold
  bg-gradient-to-r from-white to-gray-400
  bg-clip-text text-transparent
">
```

### Glow Effect
```html
<div class="
  relative
  before:absolute before:inset-0 
  before:bg-blue-500/20 before:blur-3xl 
  before:-z-10
">
```

### Responsive Grid
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

---

## n8n Integration Patterns

### Webhook Trigger
```typescript
// packages/n8n-client/src/client.ts
export class N8nClient {
  constructor(private config: { webhookBaseUrl: string }) {}
  
  async trigger(path: string, data: unknown) {
    const response = await fetch(`${this.config.webhookBaseUrl}/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    
    if (!response.ok) {
      throw new Error(`Webhook failed: ${response.status}`)
    }
    
    return response.json()
  }
}
```

### Lead Capture Flow
```
Website Form → API Route → n8n Webhook → 
  → Validate data
  → Enrich (Clearbit/similar)
  → Score lead
  → Add to CRM
  → Send notification
  → Return confirmation
```

---

## TypeScript Patterns

### Service Types
```typescript
// types/services.ts
export interface Service {
  id: string
  title: string
  description: string
  features: string[]
  priceRange: {
    min: number
    max: number
    currency: 'EUR' | 'USD'
  }
  timeline: string
  category: 'quick-wins' | 'integration' | 'ai-agents' | 'maintenance'
}

export interface ServiceCardProps extends Pick<Service, 'title' | 'description'> {
  icon: React.ReactNode
  href?: string
}
```

### API Response Types
```typescript
// types/api.ts
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
}

export interface ContactFormData {
  name: string
  email: string
  company?: string
  message: string
  service?: Service['category']
}
```

---

## Image Generation Prompts

### Hero Image Style
```
Abstract technology visualization, dark background #0a0a0a, 
electric blue #3b82f6 glowing lines and nodes, 
representing AI neural network, 
minimal and clean, subtle gradient, 
professional tech aesthetic, 
8k quality --ar 16:9 --v 6
```

### Service Icon Style
```
Minimal geometric icon representing [concept], 
single color electric blue on transparent, 
clean lines, tech style, 
simple and recognizable, 
flat design --ar 1:1 --v 6
```

### Team/About Visual
```
Abstract human silhouette made of flowing data particles, 
dark background, blue accent lighting, 
representing human-AI collaboration, 
professional and modern, 
subtle glow effects --ar 3:2 --v 6
```

---

## SEO Patterns

### Page Metadata
```tsx
// app/services/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Automation Services | NexOperandi',
  description: 'Transform your business with custom AI agents and n8n workflow automation. From quick wins to enterprise solutions.',
  openGraph: {
    title: 'AI Automation Services | NexOperandi',
    description: 'Transform your business with custom AI agents.',
    images: ['/og/services.png'],
  },
}
```

### Structured Data
```tsx
<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Automation Services",
  "provider": {
    "@type": "Organization",
    "name": "NexOperandi"
  },
  "description": "Custom AI agents and workflow automation"
})}
</script>
```
