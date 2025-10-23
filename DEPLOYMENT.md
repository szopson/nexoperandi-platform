# NexOperandi Website - Deployment Guide

## Status: Ready to Deploy! ✅

Your NexOperandi marketing website is fully configured and ready to go live.

## What's Been Completed

### ✅ Project Setup
- Dependencies installed with pnpm
- Next.js 15 with App Router
- Tailwind CSS 4 configured correctly
- TypeScript compilation successful
- Production build tested and passing

### ✅ Website Features
- **Homepage** with all sections:
  - Hero section with animated blob
  - Bold statement
  - 3-step journey (MVP, Content, Optimization)
  - Results metrics
  - Testimonials
  - CTA banner
  - Contact form
- **Interactive Navigation** with mobile menu
- **Contact Form** with n8n webhook integration
- **Responsive Design** for all devices

### ✅ Technical Implementation
- Contact form API route (`/api/contact`)
- Environment variable configuration
- Logo assets copied
- All TypeScript errors fixed
- Production build optimization

## Deployment Options

### Option 1: Vercel (Recommended) 🚀

Vercel is the fastest and easiest way to deploy Next.js applications.

#### Steps:

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Website ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Next.js
     - **Root Directory**: `apps/website`
     - **Build Command**: `cd ../.. && pnpm install && pnpm --filter website build`
     - **Install Command**: `cd ../.. && pnpm install`

3. **Set Environment Variables** in Vercel:
   ```
   N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/contact-form
   ```

4. **Deploy**: Click "Deploy" and you're live in minutes!

### Option 2: Netlify

1. Connect your GitHub repository
2. Configure build settings:
   - **Base directory**: `apps/website`
   - **Build command**: `cd ../.. && pnpm install && pnpm --filter website build`
   - **Publish directory**: `apps/website/.next`

3. Set environment variables in Netlify dashboard

### Option 3: Self-Hosted (VPS/Cloud)

Requirements:
- Node.js 18+
- pnpm 8+

```bash
# On your server
git clone https://github.com/szopson/nexoperandi-platform.git
cd nexoperandi-platform
pnpm install
cd apps/website
cp .env.example .env.local
# Edit .env.local with your N8N_WEBHOOK_URL
cd ../..
pnpm --filter website build
pnpm --filter website start
```

The site will run on http://localhost:3000

For production, use a process manager like PM2:
```bash
pm2 start "pnpm --filter website start" --name nexoperandi-website
```

## Environment Variables

You need to set ONE environment variable:

### `N8N_WEBHOOK_URL` (Required for contact form)

This is the webhook URL from your n8n instance for the contact form.

**How to get it:**
1. In your n8n instance (http://piotr108.mikrus.xyz:40233)
2. Create or open the contact form workflow
3. Add a "Webhook" trigger node
4. Copy the webhook URL
5. Set it as `N8N_WEBHOOK_URL` in your deployment

**Example:**
```
N8N_WEBHOOK_URL=https://piotr108.mikrus.xyz:40233/webhook/contact-form
```

**Note:** If you don't set this immediately, the contact form will still work (it just won't send data anywhere). You can add it later without redeploying the site.

## Testing Before Going Live

### Local Testing

```bash
# Start development server
pnpm --filter website dev

# Open http://localhost:3000
```

### Production Build Testing

```bash
# Build for production
pnpm --filter website build

# Start production server
pnpm --filter website start
```

## Custom Domain Setup

### Vercel
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain (e.g., nexoperandi.ai)
4. Follow DNS configuration instructions

### Netlify
1. Go to "Domain settings"
2. Add custom domain
3. Configure DNS records

## Monitoring & Analytics

Consider adding:
- Google Analytics
- Vercel Analytics
- Error tracking (Sentry)

## Post-Deployment Checklist

After deploying, verify:
- [ ] Homepage loads correctly
- [ ] All sections render properly
- [ ] Mobile menu works
- [ ] Contact form submits successfully
- [ ] n8n webhook receives form data
- [ ] Images load correctly
- [ ] Smooth scrolling works
- [ ] Page is responsive on mobile/tablet/desktop

## Support

If you encounter issues:
1. Check Vercel/Netlify build logs
2. Verify environment variables are set
3. Test n8n webhook URL manually
4. Check browser console for errors

## Quick Deploy Commands

```bash
# Development
pnpm --filter website dev

# Build
pnpm --filter website build

# Production
pnpm --filter website start

# Type check
pnpm --filter website typecheck

# Lint
pnpm --filter website lint
```

---

**Your website is ready to go live! 🎉**

Just choose your deployment platform and click deploy!
