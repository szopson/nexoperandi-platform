# Design Tokens - AI Automation Agency

## 1. Color Palette
- **Primary**: #1A73E8 (Blue - conveys trust and professionalism)
- **Secondary**: #34A853 (Green - represents growth and success)
- **Neutral Light**: #F9FAFB (Backgrounds, light sections)
- **Neutral Dark**: #202124 (Text, dark sections)
- **Accent**: #FBBC05 (Yellow - highlights urgency/scarcity)

## 2. Font Pairing
- **Heading Font**: [Poppins](https://fonts.google.com/specimen/Poppins) (Sans-serif, modern and clean)
- **Body Font**: [Roboto](https://fonts.google.com/specimen/Roboto) (Sans-serif, highly readable)
- **Code/Monospace**: [Source Code Pro](https://fonts.google.com/specimen/Source+Code+Pro) (For technical elements)

### Font Weights
- **Headings**: 600 (Semi-bold)
- **Body**: 400 (Regular)
- **CTA Buttons**: 500 (Medium)

## 3. Button/CTA Styles
### Normal State
```css
background-color: #1A73E8;
color: #FFFFFF;
border-radius: 8px;
padding: 12px 24px;
font-size: 16px;
font-weight: 500;
box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
transition: all 0.3s ease;
```

### Hover State
```css
background-color: #1666C1;
box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.15);
transform: translateY(-2px);
```

### Urgency/Scarcity Variant
```css
background-color: #FBBC05;
color: #202124;
font-weight: 600;
text-transform: uppercase;
border: 2px solid #F4B400;
animation: pulse 1.5s infinite;
```

**Pulse Animation**:
```css
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(251, 188, 5, 0.5);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(251, 188, 5, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(251, 188, 5, 0);
  }
}
```

## 4. Spacing Scale (8-pt System)
- **Base Unit**: 8px
- **Small**: 4px
- **Medium**: 16px
- **Large**: 32px
- **Extra Large**: 64px

## 5. Card Styles
### Service Cards
```css
background-color: #FFFFFF;
border: 1px solid #E0E0E0;
border-radius: 12px;
padding: 24px;
box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
transition: box-shadow 0.3s ease;
```

**Hover State**:
```css
box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
transform: translateY(-4px);
```

### Testimonial Cards
```css
background-color: #F9FAFB;
border-left: 4px solid #1A73E8;
border-radius: 8px;
padding: 16px 24px;
font-style: italic;
```

## 6. Navbar Design
### Desktop
- **Background**: #FFFFFF
- **Text Color**: #202124
- **Font**: Poppins, 500
- **Spacing**: 16px between links
- **CTA Button**: Styled as above, placed on the right

### Mobile (Hamburger Menu)
- **Background**: #FFFFFF
- **Text Color**: #202124
- **Font**: Poppins, 500
- **Menu Icon**: 3 horizontal lines, 24px size
- **Dropdown**: Full-screen overlay with links stacked vertically, 16px spacing

---

This guideline ensures a **modern, fast, and professional feel**, while emphasizing **urgency and scarcity** in CTAs to align with the brand's messaging principles.