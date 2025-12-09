# NexOperandi Design Tokens

> Visual design system for consistent UI across the platform

## Colors

### Base
```css
--background: #0a0a0a;
--foreground: #fafafa;
--card: #0a0a0a;
--card-foreground: #fafafa;
--popover: #0a0a0a;
--popover-foreground: #fafafa;
```

### Primary (Electric Blue)
```css
--primary: #3b82f6;
--primary-hover: #2563eb;
--primary-muted: #3b82f6/20;
--primary-foreground: #ffffff;
```

### Grays
```css
--gray-50: #fafafa;
--gray-100: #f4f4f5;
--gray-200: #e4e4e7;
--gray-300: #d4d4d8;
--gray-400: #a1a1aa;
--gray-500: #71717a;
--gray-600: #52525b;
--gray-700: #3f3f46;
--gray-800: #27272a;
--gray-900: #18181b;
--gray-950: #09090b;
```

### Semantic
```css
--success: #22c55e;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;
```

### Borders & Dividers
```css
--border: rgba(255, 255, 255, 0.1);
--border-hover: rgba(255, 255, 255, 0.2);
--border-accent: rgba(59, 130, 246, 0.5);
```

---

## Typography

### Font Family
```css
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Font Sizes
```css
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
--text-5xl: 3rem;       /* 48px */
--text-6xl: 3.75rem;    /* 60px */
```

### Font Weights
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Line Heights
```css
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
```

---

## Spacing

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
```

---

## Border Radius

```css
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-2xl: 1.5rem;   /* 24px */
--radius-full: 9999px;
```

---

## Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.5);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.5);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
--shadow-glow: 0 0 30px rgba(59, 130, 246, 0.3);
--shadow-glow-lg: 0 0 60px rgba(59, 130, 246, 0.4);
```

---

## Gradients

### Background Gradients
```css
/* Subtle radial glow */
--gradient-radial: radial-gradient(
  ellipse at center,
  rgba(59, 130, 246, 0.15) 0%,
  transparent 70%
);

/* Card gradient */
--gradient-card: linear-gradient(
  to bottom,
  rgba(255, 255, 255, 0.05),
  transparent
);

/* Hero gradient */
--gradient-hero: linear-gradient(
  to bottom,
  #0a0a0a 0%,
  #0a0a0a 50%,
  rgba(59, 130, 246, 0.1) 100%
);
```

### Text Gradients
```css
/* Heading gradient */
--gradient-text: linear-gradient(
  to right,
  #ffffff,
  #a1a1aa
);

/* Accent gradient */
--gradient-text-accent: linear-gradient(
  to right,
  #3b82f6,
  #8b5cf6
);
```

---

## Animations

### Durations
```css
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
```

### Easings
```css
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

---

## Breakpoints

```css
--screen-sm: 640px;
--screen-md: 768px;
--screen-lg: 1024px;
--screen-xl: 1280px;
--screen-2xl: 1536px;
```

---

## Z-Index Scale

```css
--z-dropdown: 50;
--z-sticky: 100;
--z-modal: 200;
--z-popover: 300;
--z-tooltip: 400;
```

---

## Component Tokens

### Buttons
```css
/* Primary */
--btn-primary-bg: var(--primary);
--btn-primary-text: white;
--btn-primary-hover: var(--primary-hover);

/* Secondary */
--btn-secondary-bg: transparent;
--btn-secondary-text: var(--foreground);
--btn-secondary-border: var(--border);

/* Sizes */
--btn-height-sm: 2rem;
--btn-height-md: 2.5rem;
--btn-height-lg: 3rem;
--btn-padding-sm: 0.75rem;
--btn-padding-md: 1rem;
--btn-padding-lg: 1.5rem;
```

### Cards
```css
--card-bg: rgba(255, 255, 255, 0.02);
--card-border: var(--border);
--card-border-hover: var(--border-accent);
--card-padding: var(--space-6);
--card-radius: var(--radius-xl);
```

### Inputs
```css
--input-bg: rgba(255, 255, 255, 0.05);
--input-border: var(--border);
--input-border-focus: var(--primary);
--input-text: var(--foreground);
--input-placeholder: var(--gray-500);
--input-height: 2.75rem;
--input-padding: var(--space-4);
--input-radius: var(--radius-lg);
```

---

## Tailwind Classes Quick Reference

### Common Patterns
```html
<!-- Card -->
class="bg-gray-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"

<!-- Button Primary -->
class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"

<!-- Button Secondary -->
class="border border-white/10 hover:border-white/20 px-6 py-3 rounded-xl font-medium transition-colors"

<!-- Heading -->
class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"

<!-- Subheading -->
class="text-gray-400 text-lg"

<!-- Glow effect -->
class="relative before:absolute before:inset-0 before:bg-blue-500/20 before:blur-3xl before:-z-10"

<!-- Section padding -->
class="py-20 md:py-32"

<!-- Container -->
class="container mx-auto px-4"
```
