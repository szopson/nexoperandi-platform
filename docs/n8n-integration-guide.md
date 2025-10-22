# n8n Contact Form Integration Guide

## Overview
The contact form has been perfectly aligned with your n8n workflow requirements. Here's how to complete the integration:

## Form Fields Mapping
The HTML form fields match exactly with your n8n workflow:

```javascript
// HTML Form Fields → n8n Workflow Fields
"What is your name?" → "What is your name?"
"What is your email?" → "What is your email?"
"What is your company website?" → "What is your company website?"
"What can we help you with?" → "What can we help you with?"
```

## Integration Steps

### 1. Get Your n8n Webhook URL
1. Go to your n8n workflow "Lead Qualification Agent (Form Submissions)"
2. Click on the "On form submission" node
3. Copy the webhook URL (it should look like: `https://your-n8n-instance.com/webhook/1f3efdb5-7236-4252-9ffc-90b7f832e9c9`)

### 2. Update the JavaScript
In `index.html`, find this line (around line 341):
```javascript
const webhookUrl = 'YOUR_N8N_WEBHOOK_URL_HERE';
```

Replace with your actual webhook URL:
```javascript
const webhookUrl = 'https://your-n8n-instance.com/webhook/1f3efdb5-7236-4252-9ffc-90b7f832e9c9';
```

### 3. Enable Real Form Submission
Replace the simulation code (lines 344-345) with actual submission:

```javascript
// Replace this simulation:
await new Promise(resolve => setTimeout(resolve, 1500));

// With actual submission:
const response = await fetch(webhookUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data)
});

if (!response.ok) {
  throw new Error('Form submission failed');
}
```

## Form Behavior
- **Validation**: Real-time field validation with visual feedback
- **Loading States**: Shows "Sending..." during submission
- **Success/Error Messages**: Clear feedback to users
- **Form Reset**: Clears form after successful submission
- **Accessibility**: Proper labels and ARIA attributes

## Contact Options Provided
1. **Primary**: Contact form (connects to AI workflow)
2. **Secondary**: Phone number `+1 (555) 123-4567` (update with real number)

## Testing
1. Fill out the form with test data
2. Check browser console for form data logging
3. Verify the data structure matches your n8n workflow expectations
4. Test both success and error scenarios

## Data Structure Sent to n8n
```json
{
  "What is your name?": "John Doe",
  "What is your email?": "john@example.com",
  "What is your company website?": "https://example.com",
  "What can we help you with?": "I need help with AI automation"
}
```

This matches exactly with your n8n workflow's expected input format.